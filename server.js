// Servidor estático mínimo para Railway / Vercel / Render.
// Sirve la carpeta `out` generada por `next build` (output: 'export').
import http from "node:http";
import { readFile } from "node:fs/promises";
import { join, extname, normalize } from "node:path";

const root = new URL("./out/", import.meta.url).pathname;
const port = process.env.PORT || 3000;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".mjs": "text/javascript",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".txt": "text/plain",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
};

const server = http.createServer(async (req, res) => {
  try {
    let urlPath = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
    if (urlPath === "/") urlPath = "/index.html";

    let filePath = normalize(join(root, urlPath));

    // Evitar path traversal
    if (!filePath.startsWith(root)) {
      res.writeHead(403);
      res.end("Forbidden");
      return;
    }

    let data;
    try {
      data = await readFile(filePath);
    } catch {
      // Soporte para rutas con trailing slash: /ruta -> /ruta/index.html
      const fallback = join(filePath, "index.html");
      try {
        data = await readFile(fallback);
      } catch {
        res.writeHead(404);
        res.end("Not Found");
        return;
      }
    }

    res.writeHead(200, {
      "Content-Type": MIME[extname(filePath)] || "application/octet-stream",
      "Cache-Control": "public, max-age=31536000, immutable",
    });
    res.end(data);
  } catch (err) {
    res.writeHead(500);
    res.end("Internal Server Error");
  }
});

server.listen(port, () => {
  console.log(`Dune Moon sirviendo en http://localhost:${port}`);
});
