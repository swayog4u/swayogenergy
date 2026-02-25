import "dotenv/config";
import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { getReceiverEmail, getSenderEmail, getSmtpConfig, sendEmail } from "./email";

// Try to load the optional Gemini SDK at runtime. We avoid a static import
// so the server build won't fail when the package isn't installed.
let GoogleGenerativeAI: any = null;
try {
  const req: any = Function('return require')();
  const mod = req("@google/generative-ai");
  GoogleGenerativeAI = mod?.GoogleGenerativeAI ?? mod?.default ?? mod;
} catch (e) {
  GoogleGenerativeAI = null;
  console.warn('Gemini SDK not available — chatbot will use fallback responses');
}

// ─── Gemini AI Setup ───
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";
let genAI: any = null;
if (GEMINI_API_KEY && GoogleGenerativeAI) {
  try {
    genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    console.log("Gemini AI initialized for Suryamitra chatbot");
  } catch (e) {
    console.error('Failed to initialize Gemini SDK:', (e as Error)?.message || e);
    genAI = null;
  }
} else if (GEMINI_API_KEY && !GoogleGenerativeAI) {
  console.warn('⚠ GEMINI_API_KEY set but Gemini SDK not installed — chatbot will use fallback responses');
} else {
  console.warn("⚠ GEMINI_API_KEY not set — chatbot will use fallback responses");
}

const SOLAR_MITRA_SYSTEM_PROMPT = `You are "Suryamitra", a professional, knowledgeable solar energy assistant chatbot for Swayog Energy Private Limited.

PERSONALITY & TONE:
- Professional, warm, and confident about solar energy
- Speak concisely — give SHORT, clear answers (2-4 sentences max unless listing plans)
- NEVER use emojis. Keep the tone clean and premium.
- Be helpful yet professional
- If someone greets you, greet them back warmly

COMPANY INFO (Swayog Energy):
- Location: 205, Gauri Ganesh Apartment, Utkarsh Nagar, KT Nagar Garden, behind Cake Link, Katol Road, Nagpur, Maharashtra 440013
- Phone: +91 8484030070
- WhatsApp: +91 9272099152
- Email: info@swayogurja.com / support@swayogurja.com
- Hours: Mon-Sat, 10:00 AM - 6:30 PM
- Services: Residential, Commercial, and Industrial solar installation across India

SOLAR PLANS (use these when recommending):
1. Basic Home (3 kW) — Rs 1,90,000*
   - Tier-1 Polycrystalline Panels, String Inverter, Galvanized Structure
   - 5 Year System Warranty, Net Metering Assistance
   - Saves approx Rs 3,500/month | Best for: Monthly bill up to Rs 3,000

2. Premium Home (5 kW) — Rs 3,10,000* (MOST POPULAR)
   - Tier-1 Mono-PERC High Efficiency Panels, Smart WiFi Inverter
   - Aluminium Rust-Free Structure, 5 Year Warranty, Priority Support
   - Saves approx Rs 6,000/month | Best for: Monthly bill Rs 3,000 to Rs 6,000

3. Large Villa (10 kW) — Rs 5,20,000*
   - Bifacial Solar Panels, Advanced Monitoring App
   - Elevated Structure Design, 5 Year Warranty, Quarterly Cleaning (1 Year)
   - Saves approx Rs 12,000/month | Best for: Monthly bill above Rs 6,000

* Prices are indicative. Government subsidy is extra.

SUBSIDY INFO (PM Surya Ghar Muft Bijli Yojana):
- Rs 30,000 for 1-2 kW systems
- Rs 60,000 for 2-3 kW systems
- Rs 78,000 for 3+ kW systems

KEY SOLAR FACTS:
- 1 kW generates approx 4-5 units/day (120-150 units/month)
- Payback period: 4-6 years with subsidy
- Panel lifespan: 25+ years
- Works on cloudy days at 10-25% capacity
- On-grid = connected to grid, net metering, no batteries
- Off-grid = independent with batteries
- Hybrid = grid + battery backup
- Installation: 2-3 days, full process 4-8 weeks
- Best orientation: South-facing, 15-30 degree tilt

BEHAVIOR RULES:
1. When user mentions their electricity bill amount, ALWAYS recommend the best plan from above and briefly explain why.
2. After recommending a plan, ALWAYS suggest contacting Swayog Energy (give phone/WhatsApp).
3. For questions outside solar/energy, politely redirect: "I specialize in solar energy. Ask me anything about solar panels, savings, or our plans."
4. Keep responses SHORT and actionable.
5. Never make up information about Swayog Energy that isn't provided above.
6. If asked about custom/commercial/industrial (above 10kW), suggest contacting the team for a custom quote.
7. NEVER use emojis in your responses. Keep the language clean and professional.`;


export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // ─── Suryamitra Chatbot API ───
  app.post('/api/chatbot', async (req, res) => {
    try {
      const { message, history } = req.body;

      if (!message || typeof message !== 'string') {
        return res.status(400).json({ success: false, reply: 'Please send a valid message.' });
      }

      // If Gemini is available, use AI
      if (genAI) {
        // Build conversation history for context
        const chatHistory = (history || []).map((msg: { sender: string; text: string }) => ({
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }],
        }));

        const chatConfig = {
          history: [
            {
              role: 'user' as const,
              parts: [{ text: 'System instruction: ' + SOLAR_MITRA_SYSTEM_PROMPT }],
            },
            {
              role: 'model' as const,
              parts: [{ text: 'Understood. I am Suryamitra, ready to help with solar energy questions for Swayog Energy. I will keep my answers short, professional, and always recommend the right plan based on the customer\'s bill.' }],
            },
            ...chatHistory,
          ],
        };

        // Try with retry logic for rate limits
        const models = ["gemini-2.0-flash", "gemini-1.5-flash"];
        for (const modelName of models) {
          for (let attempt = 0; attempt < 3; attempt++) {
            try {
              const model = genAI.getGenerativeModel({ model: modelName });
              const chat = model.startChat(chatConfig);
              const result = await chat.sendMessage(message);
              const reply = result.response.text();
              return res.json({ success: true, reply });
            } catch (aiError: any) {
              const status = aiError?.status || aiError?.httpStatusCode;
              if (status === 429 && attempt < 2) {
                // Rate limited — wait and retry
                const waitMs = (attempt + 1) * 2000;
                console.log(`Rate limited on ${modelName}, retrying in ${waitMs}ms (attempt ${attempt + 1})...`);
                await new Promise(resolve => setTimeout(resolve, waitMs));
                continue;
              }
              console.error(`Gemini ${modelName} error (attempt ${attempt + 1}):`, aiError.message);
              break; // Move to next model
            }
          }
        }
      }

      // Fallback response when AI is unavailable
      return res.json({
        success: true,
        reply: "I'm currently unable to process your request. Please contact Swayog Energy directly:\n\nPhone: +91 8484030070\nWhatsApp: +91 9272099152\nEmail: info@swayogurja.com",
      });
    } catch (err) {
      console.error('Chatbot error:', err);
      return res.status(500).json({ success: false, reply: 'Something went wrong. Please try again.' });
    }
  });

  // Contact form route handler (for development - same logic as api/contact.ts)
  app.post('/api/contact', async (req, res) => {
    try {
      const contactSchema = z.object({
        firstName: z.string().min(1, 'First name is required'),
        lastName: z.string().min(1, 'Last name is required'),
        email: z.string().email('Invalid email address'),
        subject: z.string().min(1, 'Subject is required'),
        message: z.string().min(1, 'Message is required'),
      });

      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Access-Control-Allow-Origin', '*');

      const input = contactSchema.parse(req.body);
      const { firstName, lastName, email, subject, message } = input;

      // Get receiver email from .env file (REQUIRED)
      let targetEmail: string;
      try {
        targetEmail = getReceiverEmail();
      } catch (error) {
        console.error('NOTIFY_EMAIL not configured:', error);
        return res.status(500).json({
          success: false,
          message: 'Email service is not configured.',
        });
      }

      const messageText = `New Contact Form Message Received

Name: ${firstName} ${lastName}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
This message was sent from the Swayog Energy website contact form.`;

      // Get SMTP configuration from .env
      const smtpConfig = getSmtpConfig();

      // Prepare email HTML
      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #ea580c;">New Contact Form Message</h2>
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <h3 style="margin-top: 0;">Message:</h3>
            <p style="white-space: pre-wrap;">${message.replace(/\n/g, '<br>')}</p>
          </div>
        </div>
      `;

      try {
        // Get sender email from .env (EMAIL_USER)
        const senderEmail = getSenderEmail();
        
        // Send email using shared utility
        await sendEmail({
          to: targetEmail, // Receiver: NOTIFY_EMAIL from .env
          from: senderEmail, // Sender: EMAIL_USER from .env (e.g., harshaltapre23@gmail.com)
          replyTo: email, // User's email for reply
          subject: `Contact Form: ${subject}`,
          text: messageText,
          html: emailHtml,
        });

        console.log('✓ Contact form email sent successfully to:', targetEmail);
        return res.status(200).json({ 
          success: true, 
          message: 'Message sent successfully' 
        });
      } catch (emailErr: any) {
        console.error(' Failed to send contact form email:', emailErr.message);
        return res.status(500).json({ 
          success: false,
          message: `Failed to send email: ${emailErr.message}`,
        });
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: err.errors[0].message,
        });
      }
      console.error('Error processing contact form:', err);
      return res.status(500).json({ 
        success: false,
        message: 'Internal server error' 
      });
    }
  });

  app.post(api.inquiries.create.path, async (req, res) => {
  console.log(" API HIT:", api.inquiries.create.path);
  console.log("BODY:", req.body);

    try {
      const input = api.inquiries.create.input.parse(req.body);
      const inquiry = await storage.createInquiry(input);

      // Get receiver email from .env file (REQUIRED)
      // This is the ONLY source of truth for receiver email
      let targetEmail: string;
      try {
        targetEmail = getReceiverEmail();
      } catch (error) {
        console.error('NOTIFY_EMAIL not configured:', error);
        console.warn(' Skipping email notification - NOTIFY_EMAIL not configured in .env file');
        // Continue without email - inquiry is still saved
        return res.status(201).json(inquiry);
      }

      // Prepare message content
      const messageText = `New Inquiry Details:\nName: ${inquiry.name}\nEmail: ${inquiry.email}\nPhone: ${inquiry.phone}\nConsumer ID: ${inquiry.customerNo || "N/A"}\nProject Type: ${inquiry.projectType}\nMessage: ${inquiry.message}`;

      // Get SMTP configuration from .env
      const smtpConfig = getSmtpConfig();

      // Log configuration status (without exposing passwords)
      console.log('Email configuration check:', {
        hasHost: !!smtpConfig.host && smtpConfig.host !== 'HOST',
        hasUser: !!smtpConfig.user,
        hasPass: !!smtpConfig.pass,
        port: smtpConfig.port,
        secure: smtpConfig.secure,
        targetEmail: targetEmail,
      });

      // Prepare email HTML
      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #ea580c;">New Solar Inquiry</h2>
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${inquiry.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${inquiry.email}">${inquiry.email}</a></p>
            <p><strong>Phone:</strong> ${inquiry.phone}</p>
            <p><strong>Consumer ID:</strong> ${inquiry.customerNo || 'N/A'}</p>
            <p><strong>Project Type:</strong> ${inquiry.projectType}</p>
          </div>
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <h3 style="margin-top: 0;">Message:</h3>
            <p style="white-space: pre-wrap;">${inquiry.message.replace(/\n/g, '<br>')}</p>
          </div>
          <p style="color: #6b7280; font-size: 12px; margin-top: 20px;">
            This inquiry was sent from the Swayog Energy website.<br>
            You can reply directly to this email to respond to ${inquiry.name}.
          </p>
        </div>
      `;

      try {
        // Get sender email from .env (EMAIL_USER)
        const senderEmail = getSenderEmail();
        
        // Send email using shared utility
        await sendEmail({
          to: targetEmail, // Receiver: NOTIFY_EMAIL from .env
          from: senderEmail, // Sender: EMAIL_USER from .env (e.g., harshaltapre23@gmail.com)
          replyTo: inquiry.email, // User's email for reply
          subject: `New Solar Inquiry from ${inquiry.name}`,
          text: messageText,
          html: emailHtml,
        });

        console.log(' Inquiry email sent successfully to:', targetEmail);
      } catch (emailErr: any) {
        console.error(' Failed to send inquiry email:', {
          error: emailErr.message,
          code: emailErr.code,
        });
        console.warn(' Inquiry saved but email notification failed');
        
        // Log helpful troubleshooting tips
        if (emailErr.code === 'EAUTH') {
          console.error(' AUTHENTICATION ERROR: Check EMAIL_USER and EMAIL_PASS in .env file');
        } else if (emailErr.code === 'ETIMEDOUT' || emailErr.code === 'ECONNECTION') {
          console.error(' CONNECTION ERROR: Check EMAIL_HOST and EMAIL_PORT in .env file');
        }
      }

      res.status(201).json(inquiry);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  return httpServer;
}
