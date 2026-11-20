# Publicar NEXORA en Vercel

## 1. Probar en tu equipo
1. Instala Node.js 20 o superior.
2. En la carpeta del proyecto: `npm install`, luego `npm run build` (debe terminar sin errores) y `npm run dev`.

## 2. Subir el código a GitHub
1. Crea un repositorio nuevo en github.com (vacío, sin README).
2. En la carpeta: `git init`, `git add .`, `git commit -m "NEXORA"`, y sigue los comandos que GitHub muestra para `git remote add` y `git push`.

## 3. Desplegar en Vercel
1. Entra en vercel.com con tu cuenta de GitHub, pulsa **Add New → Project** e importa el repositorio.
2. Vercel detecta Next.js solo. En **Environment Variables** añade `NEXT_PUBLIC_SITE_URL` (la URL final, por ejemplo `https://tudominio.com`), `NEXT_PUBLIC_CONTACT_EMAIL` y `NEXT_PUBLIC_OWNER_NAME`.
3. Pulsa **Deploy**. Cada `git push` publica una nueva versión.

## 4. Conectar tu dominio
1. En el proyecto: **Settings → Domains → Add** y escribe tu dominio.
2. Vercel te muestra los registros DNS exactos que debes crear (normalmente un registro A para el dominio raíz y un CNAME para `www`). Créalos en el panel de tu registrador de dominio.
3. Espera a que Vercel marque el dominio como válido (minutos u horas). El certificado HTTPS es automático.
4. Verifica que `NEXT_PUBLIC_SITE_URL` coincide con el dominio final y vuelve a desplegar.

## 5. Aparecer en Google
1. Entra en Google Search Console, añade tu dominio y verifícalo con el registro DNS que te indiquen.
2. En **Sitemaps** envía `https://tudominio.com/sitemap.xml`.
3. La indexación puede tardar días o semanas.

## 6. Activar Google AdSense (cuando tengas la cuenta aprobada)
1. Solicita AdSense con tu dominio ya publicado. Revisarán que tenga contenido propio y páginas legales; ya están incluidas.
2. Con la aprobación, crea un bloque de anuncios y copia tu ID de editor (`ca-pub-…`) y el ID del bloque.
3. En Vercel añade `NEXT_PUBLIC_ADSENSE_CLIENT` y `NEXT_PUBLIC_ADSENSE_SLOT_HOME` y vuelve a desplegar. Hasta entonces el sitio no muestra anuncios.
4. Crea `public/ads.txt` con la línea que AdSense te indica.
5. Si tienes visitantes del Espacio Económico Europeo o del Reino Unido, Google exige un mensaje de consentimiento antes de personalizar anuncios. Configúralo en AdSense (Privacidad y mensajes) antes de activar los anuncios. NEXORA aún no incluye ese banner.
6. Nunca hagas clic en tus propios anuncios ni pidas a otros que lo hagan.

## 7. Antes de lanzar
- Revisa las páginas legales con un profesional si tu país lo requiere; son textos base.
- Prueba cada herramienta en tu teléfono.

## 8. Instalar NEXORA como aplicación (PWA)
- **Android (Chrome):** abre la web → menú ⋮ → **Instalar aplicación** (o «Añadir a pantalla de inicio»).
- **iPhone (Safari):** botón Compartir → **Añadir a pantalla de inicio**.
- Se abre a pantalla completa, con su icono, y las herramientas visitadas funcionan sin internet.
- Para publicarla en Google Play o App Store hace falta empaquetarla (por ejemplo con PWABuilder o Capacitor). Google Play cobra una cuota única de 25 USD y Apple 99 USD al año. Dentro de una app de tienda los anuncios se gestionan con AdMob, no con AdSense.
