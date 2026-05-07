# Guía de Deployment - DonWeb (Panel Ferozo)

## Información del proyecto
- **Tipo**: Node.js + Express
- **Stack**: HTML, CSS, JavaScript (frontend) + Node.js/Express (backend)
- **Base de datos**: No (archivos estáticos + email)

## Requisitos previos
1. Cuenta activa en DonWeb con Panel Ferozo
2. Node.js habilitado en el hosting
3. Acceso SSH o SFTP al servidor

## Estructura de carpetas (producción)

```
ensalada/
├── public/              (archivos estáticos)
│   ├── index.html
│   ├── styles.css
│   ├── funciones.js
│   ├── assets/
│   └── pdf-page*.png
├── uploads/             (carpeta para CVs subidos - se crea automáticamente)
├── .env                 (NO subir al repo - crear en servidor)
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

## Pasos de deployment

### 1. Preparación local
```bash
# Asegúrate de tener todo commitado
git status
git add .
git commit -m "Preparar para production"
```

### 2. En DonWeb Panel Ferozo
1. Ve a **Administración > Node.js**
2. Crea una nueva aplicación Node.js
3. Selecciona la versión de Node.js (16+ recomendado)
4. Especifica el archivo de entrada: `server.js`
5. Nota el **puerto dinámico** asignado (ej: 12345)

### 3. Clonar/subir el proyecto
```bash
# Opción A: Clonar desde Git (recomendado)
cd /home/usuario/aplicaciones/ensalada
git clone <tu_repo> .

# Opción B: SFTP
# Sube todos los archivos excepto node_modules/ y .git/
```

### 4. Instalar dependencias
```bash
cd /home/usuario/aplicaciones/ensalada
npm install --production
```

### 5. Configurar variables de entorno
```bash
# Crear archivo .env con tus credenciales
# NO subir .env al repositorio
nano .env
```

Contenido de `.env`:
```
EMAIL_USER=tu_email@gmail.com
EMAIL_PASS=tu_app_password
NODE_ENV=production
```

### 6. Iniciar la aplicación
- En Ferozo: Botón **Iniciar** en la aplicación Node.js
- O por SSH: `npm start`

### 7. Configurar dominio
1. Ve a **Dominios** en DonWeb
2. Apunta tu dominio a la aplicación Node.js
3. Espera propagación DNS (5-48 horas)

### 8. Verificar funcionamiento
- Accede a `https://tudominio.com`
- Prueba el formulario de contacto
- Verifica que los emails se envíen correctamente

## Cambios necesarios en el código

✅ **Ya realizados en este deployment guide:**
- `server.js` lee `process.env.PORT` (Ferozo lo asigna automáticamente)
- Archivos estáticos en carpeta `public/`
- `.env.example` para configuración
- `package.json` con scripts correctos

## Monitoreo y logs
```bash
# Ver logs en tiempo real (si tienes SSH)
tail -f ~/.pm2/logs/ensalada-error.log
tail -f ~/.pm2/logs/ensalada-out.log

# O en el panel Ferozo: Logs > Aplicación
```

## Troubleshooting

**Problema**: "Puerto no disponible"
- **Solución**: Ferozo asigna automáticamente. Asegúrate que `process.env.PORT` esté configurado.

**Problema**: "Módulos no encontrados"
- **Solución**: Ejecuta `npm install --production`

**Problema**: "Emails no se envían"
- **Solución**: Verifica credenciales en `.env`. Para Gmail, usa app password, no la contraseña normal.

**Problema**: "Archivos no se sirven (404)"
- **Solución**: Asegúrate que archivos estén en carpeta `public/`

## Variables de entorno en Ferozo

En el panel Ferozo puedes configurar variables directamente:
1. **Aplicaciones > Tu App > Configuración**
2. **Variables de entorno**
3. Agrega:
   - `EMAIL_USER`
   - `EMAIL_PASS`
   - `NODE_ENV=production`

## Seguridad

- ✅ No subir `.env` al repositorio
- ✅ Usar variables de entorno para credenciales
- ✅ Para Gmail: usar App Passwords, no contraseña de cuenta
- ✅ Mantener `node_modules/` en `.gitignore`
- ✅ HTTPS automático en DonWeb

## Actualizaciones futuras

```bash
# Para actualizar el código:
git pull origin main
npm install --production
# Reiniciar en panel Ferozo (botón Reiniciar)
```
