import "./globals.css";
import "./components.css";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  metadataBase: new URL("https://www.dunemoonmusic.com"),
  title: {
    default: "Dune Moon · Synthpop / Synthwave desde Riobamba, Ecuador",
    template: "%s · Dune Moon",
  },
  description:
    "Dune Moon es el proyecto de Synthpop / Synthwave de Luis Alejandro Veloz Vera desde Riobamba, Ecuador. Música ochentera con un toque actual: álbum Tiempo, sencillos y EPs en Spotify. Escucha, mira los videos y sigue el estreno del nuevo single.",
  keywords: [
    "Dune Moon",
    "Synthpop",
    "Synthwave",
    "música electrónica",
    "Ecuador",
    "Riobamba",
    "Luis Alejandro Veloz Vera",
    "Alejandro Veloz",
    "wave",
    "80s",
    "retrowave",
    "música ochentera",
    "álbum Tiempo",
    "En Mi Mente",
  ],
  authors: [{ name: "Luis Alejandro Veloz Vera", url: "https://www.dunemoonmusic.com" }],
  creator: "Dune Moon",
  publisher: "Dune Moon",
  category: "Música",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Dune Moon · Synthpop / Synthwave desde Riobamba, Ecuador",
    description:
      "Proyecto de Synthpop / Synthwave de Luis Alejandro Veloz Vera desde Riobamba, Ecuador. Música ochentera con un toque actual. Escucha en Spotify y mira los videos en YouTube.",
    type: "website",
    siteName: "Dune Moon",
    locale: "es_EC",
    url: "https://www.dunemoonmusic.com",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dune Moon · Synthpop / Synthwave desde Riobamba, Ecuador",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dune Moon · Synthpop / Synthwave desde Riobamba, Ecuador",
    description:
      "Proyecto de Synthpop / Synthwave de Luis Alejandro Veloz Vera desde Riobamba, Ecuador.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-64.png", sizes: "64x64", type: "image/png" },
      { url: "/favicon-128.png", sizes: "128x128", type: "image/png" },
      { url: "/favicon-256.png", sizes: "256x256", type: "image/png" },
      { url: "/dune-moon-logo.png", sizes: "any", type: "image/png" },
    ],
    apple: { url: "/favicon-180.png", sizes: "180x180", type: "image/png" },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport = {
  themeColor: "#060a14",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  name: "Dune Moon",
  alternateName: "DUNE MOON",
  genre: ["Synthpop", "Synthwave"],
  foundingLocation: {
    "@type": "Place",
    name: "Riobamba, Ecuador",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Riobamba",
      addressRegion: "Chimborazo",
      addressCountry: "EC",
    },
  },
  foundingDate: "2015",
  member: {
    "@type": "Person",
    name: "Luis Alejandro Veloz Vera",
    givenName: "Alejandro",
    familyName: "Veloz Vera",
    jobTitle: "Compositor, productor y director artístico",
  },
  url: "https://www.dunemoonmusic.com",
  sameAs: [
    "https://open.spotify.com/artist/1FTaP61WmZlwN4mGyuYGmG",
    "https://www.youtube.com/@dunemoonmusic",
    "https://www.instagram.com/dunemoonmusic/",
    "https://www.facebook.com/DUNEMUSIC",
    "https://soundcloud.com/dune-13",
    "https://music.apple.com/us/artist/dune-moon/1359677479",
    "https://www.deezer.com/us/artist/14344935",
  ],
  album: [
    {
      "@type": "MusicAlbum",
      name: "Tiempo",
      datePublished: "2019",
      numberOfTracks: 12,
    },
  ],
  track: [
    {
      "@type": "MusicRecording",
      name: "En Mi Mente",
      byArtist: { "@type": "MusicGroup", name: "Dune Moon" },
      datePublished: "2026-08-15",
      genre: ["Synthpop", "Synthwave"],
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <a href="#musica" className="skip-link">
          Saltar al contenido
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
