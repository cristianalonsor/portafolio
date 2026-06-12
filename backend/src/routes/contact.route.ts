import { Router, Request, Response } from 'express';
import { validateContact } from '../middlewares/validate.middleware';
import { sendContactEmail } from '../services/mailer.service';
import { ContactPayload } from '../types/contact.types';

const router = Router();

/**
 * POST /api/contact
 * Receives the contact form submission, validates fields,
 * and sends an email to the portfolio owner via Resend.
 */
router.post('/', validateContact, async (req: Request, res: Response): Promise<void> => {
  try {
    await sendContactEmail(req.body as ContactPayload);
    res.status(200).json({ success: true, message: 'Correo enviado correctamente' });
  } catch (err) {
    console.error('[contact] Error sending email:', err);
    res.status(500).json({ success: false, message: 'Error al enviar el correo. Inténtalo más tarde.' });
  }
});

export default router;
