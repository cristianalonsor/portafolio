import { Resend } from 'resend';
import { ContactPayload } from '../types/contact.types';

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Sends a contact email to the portfolio owner using the Resend API.
 * The email includes the sender's name, email, subject, and message.
 * Throws an error if the email fails to send.
 */
export async function sendContactEmail(payload: ContactPayload): Promise<void> {
  const { name, email, subject, message } = payload;

  const { error } = await resend.emails.send({
    from: process.env.FROM_EMAIL as string,
    to: process.env.TO_EMAIL as string,
    subject: `[Portafolio] ${subject}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #264653;">Nuevo mensaje de contacto</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px; font-weight: bold; color: #555;">Nombre:</td>
            <td style="padding: 8px;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; color: #555;">Email:</td>
            <td style="padding: 8px;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; color: #555;">Asunto:</td>
            <td style="padding: 8px;">${subject}</td>
          </tr>
        </table>
        <div style="margin-top: 16px; padding: 16px; background: #f5f5f5; border-radius: 6px;">
          <p style="margin: 0; white-space: pre-line;">${message}</p>
        </div>
      </div>
    `,
  });

  if (error) {
    throw new Error(error.message);
  }
}
