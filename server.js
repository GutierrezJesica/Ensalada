const express = require('express');
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar multer para subir archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 1024 }, // 1GB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /pdf|doc|docx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Solo archivos PDF o DOC/DOCX permitidos'));
    }
  }
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname)));

// Configurar nodemailer (usar Gmail como ejemplo, cambiar por credenciales reales)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'tuemail@gmail.com', // Cambiar por email real
    pass: process.env.EMAIL_PASS || 'tucontraseña' // Cambiar por contraseña o app password
  }
});

// Ruta para manejar el formulario
app.post('/contact', upload.single('cv'), (req, res) => {
  const { name, profile, product, cell, email, message } = req.body;
  const cvFile = req.file;

  // Preparar email
  const mailOptions = {
    from: email,
    to: 'capdos23@gmail.com', // Email del negocio
    subject: `Nuevo contacto desde Ensalada: ${profile}`,
    html: `
      <h2>Nuevo mensaje de contacto</h2>
      <p><strong>Nombre:</strong> ${name}</p>
      <p><strong>Perfil:</strong> ${profile}</p>
      <p><strong>Producto:</strong> ${product || 'N/A'}</p>
      <p><strong>Celular:</strong> ${cell || 'N/A'}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Mensaje:</strong> ${message}</p>
    `,
    attachments: cvFile ? [{
      filename: cvFile.originalname,
      path: cvFile.path
    }] : []
  };

  // Enviar email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error enviando email:', error);
      return res.status(500).json({ message: 'Error enviando mensaje' });
    }
    console.log('Email enviado:', info.response);

    // Eliminar archivo después de enviar
    if (cvFile) {
      fs.unlinkSync(cvFile.path);
    }

    res.json({ message: 'Mensaje enviado exitosamente' });
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});