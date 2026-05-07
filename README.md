# Ensalada

## Descripción
Sitio web estático de un proyecto de comida rápida saludable, construido con HTML, CSS y JavaScript vanilla.

## Stack implementado
- HTML para la estructura del contenido (`index.html`).
- CSS artesanal en `styles.css` para el diseño visual.
- JavaScript puro en `funciones.js` para interacciones mínimas:
  - efecto parallax en la sección de frase.
  - simulación de envío de formulario con feedback.
- Fuentes web importadas desde Google Fonts:
  - `Poppins`
  - `Righteous`

## Herramientas de desarrollo
- El proyecto ya no usa Tailwind ni PostCSS en el frontend.
- `package.json` quedó vacío porque no hay dependencias ni herramientas de build activas.
- Se eliminaron `node_modules/` y `package-lock.json` para mantener el proyecto limpio y enfocado en el sitio estático.
- No se encontraron archivos de configuración de build en el repositorio (por ejemplo, `postcss.config.js`, `tailwind.config.js` o scripts de npm).
- No hay clases de Tailwind utilizadas en el HTML, por lo que la implementación era innecesaria.

## Estructura principal
- `index.html`: punto de entrada del sitio.
- `styles.css`: estilos globales y específicos de componentes.
- `funciones.js`: lógica del frontend.
- `assets/`: imágenes, íconos, video y favicon.

## Observaciones
- El proyecto es autosoportado como un sitio estático; no hay backend ni API integrada.
- La migración se describe como "De Wordpress a full code", lo que sugiere una conversión de contenido a código estático.
- Para activar un proceso de compilación CSS sería necesario agregar configuración de PostCSS/Tailwind y scripts de npm.
