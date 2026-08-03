# Dune Moon · Sitio web

Sitio web futurista y minimalista para **DUNE MOON**, proyecto electrónico de género
WAVE / SYNTHWAVE desde Riobamba, Ecuador.

- **Stack:** Next.js 16 (App Router) + React 19 + CSS
- **Datos:** Embeds oficiales de **Spotify** (artista + álbum) y **YouTube** (videos, carga bajo demanda)
- **Deploy:** Estático (`output: "export"`) → corre en cualquier hosting estático

## Comandos

```bash
npm install        # instala dependencias
npm run dev        # entorno de desarrollo (http://localhost:3000)
npm run build      # genera el sitio estático en ./out
npm run lint       # eslint
npm start          # sirve ./out con el servidor estático (para Railway)
```

## Estructura

```
app/          layout, page y estilos globales
components/   Nav, Hero, Starfield, Marquee, Music, Videos, Bio, Contact, Footer
lib/data.js   artistas/videos/redes centralizados (edita aquí para actualizar contenido)
public/       favicon
server.js     servidor estático mínimo (deploy en Railway)
railway.json  configuración de despliegue en Railway
```

## Actualizar contenido

Todo el contenido editable está en **`lib/data.js`**:

- `VIDEOS` → agrega/quita videos por su ID de YouTube.
- `SOCIALS` → plataformas y enlaces.
- `ARTIST_ID` / `ALBUM_ID` → IDs de Spotify para los embeds.

## Deploy

### Opción A · Hostinger (recomendada, permanente y gratis)

1. `npm run build`
2. Sube el contenido de la carpeta `out/` a `public_html` vía **cPanel → Administrador de archivos** o **FTP** (FileZilla).
3. Listo. Tu dominio ya sirve el sitio.

### Opción B · Railway

El proyecto incluye `railway.json` y `server.js`. Railway ejecutará `npm run build`
y luego `node server.js`. Despliega desde la consola de Railway conectando el repo
de GitHub, o con la CLI:

```bash
railway up
```

> Nota: Railway no tiene plan gratuito permanente (solo prueba de 30 días con $5 de
> crédito). El servidor estático consume muy poco, pero para no pagar nada a largo
> plazo se recomienda usar **Hostinger**.

## GitHub

Repositorio: `https://github.com/alejandrovelozvera-hash/dune-moon`
