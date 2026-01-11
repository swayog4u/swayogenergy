// Vercel serverless function for inquiries API
import 'dotenv/config';
import { api } from '../shared/routes';
import { storage } from '../server/storage';
import { z } from 'zod';
import { getReceiverEmail, getSenderEmail, getSmtpConfig, sendEmail } from '../server/email';

export default async function handler(req: any, res: any) {
  // Set Content-Type header early to ensure JSON responses
  res.setHeader('Content-Type', 'application/json');
  
  // Handle CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).json({});
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

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
      return res.status(500).json({
        success: false,
        message: 'Email service is not configured. Please contact the administrator.',
      });
    }

    // Prepare message content
    const messageText = `New Inquiry Details:\nName: ${inquiry.name}\nEmail: ${inquiry.email}\nPhone: ${inquiry.phone}\nConsumer ID: ${inquiry.customerNo || 'N/A'}\nProject Type: ${inquiry.projectType}\nMessage: ${inquiry.message}`;

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
          This inquiry was sent from the Swayog Urja website.<br>
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
    } catch (emailErr: any) {
      const errorDetails = {
        error: emailErr.message,
        code: emailErr.code,
        response: emailErr.response,
        command: emailErr.command,
        responseCode: emailErr.responseCode,
        stack: emailErr.stack,
      };
      console.error('❌ Failed to send email notification:', errorDetails);
      console.error('Full error object:', JSON.stringify(errorDetails, null, 2));
      
      // Continue processing - don't fail the inquiry creation if email fails
      console.warn('⚠️ Inquiry saved but email notification failed - check SMTP configuration in .env file');
      
      // Log helpful troubleshooting tips
      if (emailErr.code === 'EAUTH') {
        console.error('❌ AUTHENTICATION ERROR: Check EMAIL_USER and EMAIL_PASS in .env file');
      } else if (emailErr.code === 'ETIMEDOUT' || emailErr.code === 'ECONNECTION') {
        console.error('❌ CONNECTION ERROR: Check EMAIL_HOST and EMAIL_PORT in .env file');
      }
    }

    return res.status(201).json({ 
      ...inquiry,
      emailSent: true, // Indicate email was attempted
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({
        message: err.errors[0].message,
        field: err.errors[0].path.join('.'),
      });
    }
    console.error('Error creating inquiry:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
