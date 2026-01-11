/**
 * Shared email utility functions
 * All email configuration comes from .env file
 */

import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';

/**
 * Get the receiver email address from environment variables
 * This is the ONLY place where receiver email is defined
 * Change NOTIFY_EMAIL in .env to change receiver email everywhere
 */
export function getReceiverEmail(): string {
  const email = process.env.NOTIFY_EMAIL;
  
  if (!email) {
    throw new Error(
      'NOTIFY_EMAIL environment variable is not set. ' +
      'Please set NOTIFY_EMAIL in your .env file to receive emails.'
    );
  }
  
  return email;
}

/**
 * Get the sender email address from environment variables
 * This is the email account used to SEND emails
 * Change EMAIL_USER in .env to change sender email
 */
export function getSenderEmail(): string {
  const email = process.env.EMAIL_USER || process.env.SMTP_USER;
  
  if (!email) {
    throw new Error(
      'EMAIL_USER environment variable is not set. ' +
      'Please set EMAIL_USER in your .env file (e.g., EMAIL_USER=harshaltapre23@gmail.com).'
    );
  }
  
  return email;
}

/**
 * Get SMTP configuration from environment variables
 */
export function getSmtpConfig() {
  const smtpHost = process.env.EMAIL_HOST || process.env.SMTP_HOST;
  const smtpUser = process.env.EMAIL_USER || process.env.SMTP_USER;
  const smtpPass = process.env.EMAIL_PASS || process.env.SMTP_PASS;
  const smtpPort = parseInt(process.env.EMAIL_PORT || process.env.SMTP_PORT || '587');
  const smtpSecure = (process.env.EMAIL_SECURE || process.env.SMTP_SECURE) === 'true';

  return {
    host: smtpHost,
    user: smtpUser,
    pass: smtpPass,
    port: smtpPort,
    secure: smtpSecure,
  };
}

/**
 * Create and configure nodemailer transporter
 * Uses credentials from .env file
 */
export function createEmailTransporter(): Transporter {
  const config = getSmtpConfig();

  if (!config.user || !config.pass) {
    throw new Error(
      'Email credentials not configured. ' +
      'Please set EMAIL_USER and EMAIL_PASS in your .env file.'
    );
  }

  // Common connection options for cloud environments
  const connectionOptions = {
    connectionTimeout: 60000, // 60 seconds
    greetingTimeout: 30000, // 30 seconds
    socketTimeout: 60000, // 60 seconds
    // Increase socket timeout for cloud platforms
    pool: true,
    maxConnections: 1,
    maxMessages: 3,
  };

  // Gmail configuration
  if (config.host && (config.host.includes('gmail.com') || config.host.includes('googlemail.com'))) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.user,
        pass: config.pass,
      },
      ...connectionOptions,
    });
  }

  // Custom SMTP configuration
  if (config.host && config.host !== 'HOST') {
    return nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: {
        user: config.user,
        pass: config.pass,
      },
      ...connectionOptions,
    });
  }

  // Default to Gmail if no host specified
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.user,
      pass: config.pass,
    },
    ...connectionOptions,
  });
}

/**
 * Verify SMTP connection and send email
 */
export async function sendEmail(options: {
  to: string;
  from: string;
  replyTo?: string;
  subject: string;
  text: string;
  html?: string;
}): Promise<void> {
  const transporter = createEmailTransporter();
  
  // Verify connection first
  await transporter.verify();
  console.log(' SMTP server verified and ready');

  // Send the email
  const info = await transporter.sendMail({
    from: options.from,
    replyTo: options.replyTo,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html,
  });

  console.log(' Email sent successfully:', {
    messageId: info.messageId,
    to: options.to,
    from: options.from,
  });

  // Log preview URL for test accounts (Ethereal)
  if (nodemailer.getTestMessageUrl && info) {
    const preview = nodemailer.getTestMessageUrl(info);
    if (preview) {
      console.log('Email preview URL (test account):', preview);
    }
  }
}
