// server/mailer.js
const nodemailer = require('nodemailer');

module.exports = async (req, res) => {

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail', // o tu proveedor (Mailgun, SendGrid, etc.)
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.MAIL_USER,
      subject: 'Nuevo Mensaje desde tu Portafolio!',
      html: `<p><strong>Nombre:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Mensaje:</strong></p>
             <p>${message}</p>`,
    });

    res.status(200).json({ success: true, message: 'Correo enviado correctamente' });
  } catch (err) {
    console.log('Error al enviar correo:', err);
    res.status(500).json({ error: 'Error al enviar correo' });
  }
};
