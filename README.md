# Ensalada

## Descripción
Sitio web de un proyecto de comida rápida saludable, construido con HTML, CSS y JavaScript vanilla, con backend en Node.js para manejo de formularios y envío de emails.

## Stack implementado
- **Frontend:**
  - HTML para la estructura del contenido (`index.html`).
  - CSS artesanal en `styles.css` para el diseño visual.
  - JavaScript puro en `funciones.js` para interacciones:
    - Efecto parallax en la sección de frase.
    - Manejo dinámico del formulario de contacto con envío asíncrono.
  - Fuentes web importadas desde Google Fonts: `Poppins` y `Righteous`.

- **Backend:**
  - Node.js con Express para servidor HTTP.
  - Multer para manejo de archivos subidos (CV).
  - Nodemailer para envío de emails con adjuntos.

## Configuración y ejecución
1. Copia `.env.example` a `.env` y configura tus credenciales de email.
2. Instala dependencias: `npm install`
3. Ejecuta el servidor: `npm start`
4. El sitio estará disponible en `http://localhost:3000`

## Deployment en producción
Para desplegar en DonWeb (Panel Ferozo), consulta:
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Guía completa de deployment
- **[DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)** - Checklist paso a paso

## Estructura principal
- `public/`: Archivos estáticos (HTML, CSS, JS, imágenes)
  - `index.html`: Punto de entrada
  - `styles.css`: Estilos
  - `funciones.js`: Lógica frontend
  - `assets/`: Imágenes, video y favicon
- `uploads/`: Carpeta para CVs subidos (se crea automáticamente)
- `server.js`: Backend con Express
- `package.json`: Dependencias y scripts
- `.env`: Variables de entorno (NO subir al repo)
- `.env.example`: Plantilla de variables de entorno

## Observaciones
- El proyecto incluye backend para procesar formularios y enviar CV por email.
- La migración se describe como "De Wordpress a full code".
- No usa Tailwind ni PostCSS; se eliminaron inicialmente pero se agregó backend posteriormente.
