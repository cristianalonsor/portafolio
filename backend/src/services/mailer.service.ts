import { Resend } from 'resend';
import { ContactPayload } from '../types/contact.types';

/**
 * Sends a contact email to the portfolio owner using the Resend API.
 * The email includes the sender's name, email, subject, and message.
 * Throws an error if the email fails to send.
 *
 * Resend se instancia dentro de la función (lazy initialization) en lugar
 * de al importar el módulo. Esto evita que el servidor crashee al arrancar
 * si la variable RESEND_API_KEY aún no está disponible en process.env
 * (puede ocurrir en Railway cuando los vars se inyectan después del import).
 */
export async function sendContactEmail(payload: ContactPayload): Promise<void> {
  // Instancia creada en cada llamada para garantizar que lee process.env actualizado
  const resend = new Resend(process.env.RESEND_API_KEY);
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
