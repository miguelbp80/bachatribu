# Página de clases y eventos de baile

Página de una sola pantalla, sin instalación ni base de datos.

| Archivo | Para qué sirve | ¿Se edita? |
|---|---|---|
| `contenido.js` | Textos, clases, eventos, contacto y enlaces del calendario | **Sí, solo este** |
| `assets/flyers/` | Flyers de los eventos | Sí: agregar o reemplazar imágenes |
| `assets/logo.png` | Logo | Reemplazar por otro con el mismo nombre |
| `index.html` | Estructura y metadatos SEO | Solo la primera vez (ver "Publicar") |
| `styles.css`, `app.js`, `calendar-links.js` | Diseño y lógica | No |

## Editar el contenido

1. Abrir `contenido.js` con cualquier editor de texto. Las instrucciones están al inicio del archivo.
2. Cambiar los textos entre comillas.
3. Guardar y subir los cambios (ver "Publicar").

Para probar localmente, hacer doble clic en `index.html`.

## Agregar un evento con flyer

1. Guardar el flyer en `assets/flyers/` (vertical 4:5, ideal 1080×1350, en JPG, PNG o WebP; menos de 300 KB si es posible).
2. En `contenido.js`, copiar un bloque de `eventos`, pegarlo y cambiar los datos.
3. Elegir `categoria`: `antioquia`, `nacional` o `internacional`. Los botones de filtro de la página se ajustan solos.
4. Para viajes o eventos de varios días, usar `fecha` y `fechaFin`. Para un evento de un día, `fecha`, `hora` y `duracionMinutos`.
5. Escribir un `imagenAlt` que describa el flyer: ayuda al SEO y a las personas con lectores de pantalla.

Los eventos ya terminados desaparecen solos. Los flyers de ejemplo son demostrativos; basta con reemplazar los archivos o cambiar la ruta en `imagen`.

## Calendario de Google

- **Clases:** el botón *Agendar en Google Calendar* crea un evento semanal recurrente.
- **Eventos:** el botón *Agregar al calendario* crea el evento (de un día o de varios días).
- **Calendario completo (opcional):** hacer público el calendario en Google Calendar y pegar en `contenido.js` los enlaces `urlIncrustada`, `urlPublica` y `urlReservas`. Lo que quede vacío no se muestra.

## Publicar en GitHub Pages

1. **Reemplazar la dirección de ejemplo.** Los metadatos SEO necesitan la URL final del sitio. Si el repositorio se llama `baile` y tu usuario es `miusuario`, la URL es `https://miusuario.github.io/baile/`. Ejecutar una sola vez en la carpeta del proyecto:

   ```bash
   sed -i '' 's#https://USUARIO.github.io/REPO/#https://miusuario.github.io/baile/#g' index.html robots.txt sitemap.xml
   ```

   (En Linux, quitar el `''` después de `-i`.) Si más adelante se usa dominio propio, repetir con la nueva URL.
2. Crear un repositorio en GitHub y subir el proyecto a la rama `main`.
3. En el repositorio: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. Cada vez que se suban cambios a `main`, el flujo `.github/workflows/pages.yml` publica el sitio automáticamente.

## SEO: qué está hecho y qué falta

Hecho:
- Título, descripción, URL canónica, Open Graph y Twitter Card (`assets/og-image.png` es la imagen que se ve al compartir por WhatsApp, Facebook, etc.).
- Datos estructurados de la escuela (`DanceSchool`) y de cada evento (`Event`), que habilitan resultados enriquecidos de eventos en Google.
- `robots.txt`, `sitemap.xml`, `lang="es-CO"`, un solo `h1`, textos alternativos y carga diferida de imágenes con dimensiones fijas.

Recomendado después de publicar:
- Registrar el sitio en Google Search Console y enviar `sitemap.xml`.
- Crear la ficha de Google Business Profile del estudio.
- Pegar el enlace de la página en Instagram y en los flyers.
- Nota técnica: los eventos y las clases se dibujan con JavaScript. Google lo procesa sin problema, pero otros buscadores y vistas previas pueden no verlos. Si el SEO pasa a ser prioritario, el siguiente paso es generar el HTML de antemano con un pequeño script de compilación.
