import { Request, Response, NextFunction } from 'express';
import { ContactPayload } from '../types/contact.types';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates that the contact form body contains all required fields
 * and that the email address has a valid format.
 * Responds with 400 if validation fails; calls next() if it passes.
 */
export function validateContact(req: Request, res: Response, next: NextFunction): void {
  const { name, email, subject, message } = req.body as Partial<ContactPayload>;

  const required = { name, email, subject, message };

  for (const [field, value] of Object.entries(required)) {
    if (!value || !value.trim()) {
      res.status(400).json({ success: false, message: `Campo requerido: ${field}` });
      return;
    }
  }

  if (!EMAIL_REGEX.test(email!)) {
    res.status(400).json({ success: false, message: 'Email inválido' });
    return;
  }

  next();
}
