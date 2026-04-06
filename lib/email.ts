import { Resend } from 'resend';

// The RESEND_API_KEY should be set in your .env.local file
// DO NOT use NEXT_PUBLIC_ here, as this key must remain secret on the server.
const resend = new Resend(process.env.RESEND_API_KEY);

export type SendEmailParams = {
  to: string;
  subject: string;
  text: string;
  html?: string;
};

/**
 * Utility to send an email using Resend.
 * This should ONLY be called from the server (e.g., inside a Server Action or API Route).
 */
export async function sendEmail({ to, subject, text, html }: SendEmailParams) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY is not set. Email will not be sent.');
    return { success: false, error: 'Email configuration missing' };
  }

  try {
    const data = await resend.emails.send({
      from: 'Sellis Beauty Spa <onboarding@resend.dev>', // Update this when you have a verified domain
      to,
      subject,
      text,
      html: html || `<p>${text}</p>`,
    });

    return { success: true, data };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
}
