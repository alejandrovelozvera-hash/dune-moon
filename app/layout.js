import { Orbitron, Space_Grotesk } from "next/font/google";
import "./globals.css";
import "./components.css";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  display: "swap",
});

const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

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
  metadataBase: new URL("https://dunemoon.com"),
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${orbitron.variable} ${grotesk.variable}`}>
      <body>{children}</body>
    </html>
  );
}
