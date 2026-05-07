# Checklist para deployment en DonWeb

## Pre-deployment
- [ ] Código testeado localmente
- [ ] Variables sensibles en `.env` (NO en el código)
- [ ] `.env` agregado a `.gitignore`
- [ ] `node_modules/` agregado a `.gitignore`
- [ ] README.md actualizado
- [ ] Package.json con versión correcta

## En DonWeb Panel Ferozo

### Crear aplicación Node.js
- [ ] Ir a **Administración > Node.js**
- [ ] Crear nueva aplicación
- [ ] Nombre: `ensalada` (o tu preferencia)
- [ ] Versión Node: 18+ (recomendado)
- [ ] Archivo de entrada: `server.js`
- [ ] Directorio: `/home/usuario/aplicaciones/ensalada`
- [ ] Anotar el puerto asignado

### Clonar/Subir código
- [ ] Clonar repo: `git clone <url> .`
- [ ] O subir por SFTP todos los archivos excepto `node_modules/`

### Configurar dependencias
- [ ] SSH al servidor
- [ ] `cd /home/usuario/aplicaciones/ensalada`
- [ ] `npm install --production`

### Configurar variables de entorno
- [ ] Opción A (recomendado): En panel Ferozo > Variables de entorno
  - `EMAIL_USER`: tu email
  - `EMAIL_PASS`: app password (para Gmail)
  - `NODE_ENV`: production
- [ ] Opción B: Crear `.env` por SSH (NO subir al repo)

### Pruebas
- [ ] Iniciar aplicación en panel
- [ ] Acceder a `http://localhost:puerto_asignado` (local) o dominio
- [ ] Verificar que se carga el sitio
- [ ] Probar formulario (enviar mensaje y CV)
- [ ] Verificar que email llegó a `capdos23@gmail.com`

### Mapear dominio
- [ ] En DonWeb: **Dominios > Mis dominios**
- [ ] Apuntar a la aplicación Node.js creada
- [ ] Esperar propagación DNS

## Post-deployment

- [ ] Verificar HTTPS funciona
- [ ] Hacer prueba con formulario completo
- [ ] Revisar logs en caso de errores
- [ ] Configurar backups automáticos
- [ ] Documentar credenciales en lugar seguro

## Monitoreo continuo

- [ ] Revisar logs regularmente
- [ ] Monitorear uso de CPU/memoria
- [ ] Revisar emails de error automáticos
- [ ] Plan de actualización de dependencias

## Troubleshooting rápido

| Problema | Solución |
|----------|----------|
| Sitio devuelve 503 | Reinicia app en panel Ferozo |
| 404 en archivos estáticos | Verifica que estén en `public/` |
| Formulario no envía | Revisa `.env` y credenciales email |
| Módulos no encontrados | Ejecuta `npm install --production` |
| Puerto en uso | Ferozo lo asigna automáticamente |

## Actualizar código en producción

```bash
# En el servidor por SSH
cd /home/usuario/aplicaciones/ensalada
git pull origin main
npm install --production
# Reiniciar en el panel Ferozo (botón Reiniciar)
```
