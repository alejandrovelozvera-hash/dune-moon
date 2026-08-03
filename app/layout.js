import "./globals.css";
import "./components.css";

export const metadata = {
  title: "Dune Moon · Synthwave / Synthpop",
  description:
    "DUNE MOON es un proyecto electrónico de género WAVE / SYNTHWAVE desde Riobamba, Ecuador. Música ochentera con un toque actual. Escucha en Spotify y mira los videos en YouTube.",
  keywords: [
    "Dune Moon",
    "synthwave",
    "synthpop",
    "wave",
    "música electrónica",
    "Ecuador",
    "Riobamba",
    "80s",
  ],
  openGraph: {
    title: "Dune Moon · Synthwave / Synthpop",
    description:
      "Proyecto electrónico de género WAVE / SYNTHWAVE desde Riobamba, Ecuador.",
    type: "website",
    siteName: "Dune Moon",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dune Moon · Synthwave / Synthpop",
    description:
      "Proyecto electrónico de género WAVE / SYNTHWAVE desde Riobamba, Ecuador.",
  },
  metadataBase: new URL("https://dune-moon.vercel.app"),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-64.png", sizes: "64x64", type: "image/png" },
      { url: "/favicon-128.png", sizes: "128x128", type: "image/png" },
      { url: "/favicon-256.png", sizes: "256x256", type: "image/png" },
    ],
    apple: { url: "/favicon-256.png", sizes: "180x180", type: "image/png" },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
