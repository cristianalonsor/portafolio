// dotenv/config debe ser el PRIMER import del proyecto.
// Los imports de TypeScript se compilan a require() de CommonJS y se ejecutan
// en orden — si dotenv llega después de contactRouter, process.env aún está vacío
// cuando mailer.service.ts instancia `new Resend(process.env.RESEND_API_KEY)`.
import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import contactRouter from './routes/contact.route';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }));
app.use(express.json());

app.use('/api/contact', contactRouter);

/** Health check — used by Railway to verify the service is running */
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Backend corriendo en http://localhost:${PORT}`);
});
