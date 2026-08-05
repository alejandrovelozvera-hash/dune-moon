"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

const dict = {
  es: {
    "nav.open": "Abrir menú",
    "nav.close": "Cerrar menú",
    "nav.music": "Música",
    "nav.videos": "Videos",
    "nav.bio": "Bio",
    "nav.contact": "Contacto",
    "nav.backToTop": "Volver arriba",
    "nav.spotify": "Spotify",

    "hero.releaseEyebrow": "Nuevo lanzamiento · 2026",
    "hero.releaseBadge": "Nuevo single",
    "hero.releaseSub": "(2026 Remaster)",
    "hero.releaseDate": "Se estrena el 15 de agosto",
    "hero.released": "Ya disponible",
    "hero.previewLabel": "Preview · Se estrena el 15 de agosto",
    "hero.releaseDesc":
      "Nació en 2020, en el confinamiento de la pandemia en Ecuador. Es una canción sobre el amor y la ausencia: los recuerdos que no desaparecen y las palabras que quedaron pendientes. Seis años después, esta versión definitiva completa su historia con el sonido que siempre imaginamos.",
    "hero.countdown.days": "Días",
    "hero.countdown.hours": "Horas",
    "hero.countdown.min": "Min",
    "hero.countdown.sec": "Seg",
    "hero.watchVideos": "Ver videos",
    "hero.mainEyebrow": "Proyecto electrónico · Riobamba, Ecuador",
    "hero.tag": "SYNTHPOP · SYNTHWAVE",
    "hero.desc":
      "Música ochentera revivida con un toque actual. Un viaje sonoro entre sintetizadores, nostalgia y estrellas.",
    "hero.listenSpotify": "Escuchar en Spotify",
    "hero.dotRelease": "Nuevo lanzamiento",
    "hero.dotMain": "Sobre Dune Moon",
    "hero.scroll": "Desplazarse a música",
    "hero.audioPlay": "Reproducir {title}",
    "hero.audioPause": "Pausar {title}",

    "music.eyebrow": "Reproduce ahora",
    "music.title": "Música",
    "music.sub":
      "Top tracks, álbum, sencillos y EPs de Dune Moon. Toca una tarjeta para abrir su reproductor desde Spotify sin salir de esta página.",
    "music.toptracksEyebrow": "Lo más escuchado",
    "music.toptracksTitle": "Top Tracks",
    "music.toptracksSub": "Los temas más reproducidos de Dune Moon en Spotify.",
    "music.artistEmbed": "Dune Moon en Spotify",
    "music.singles": "Sencillos",
    "music.eps": "EPs",
    "music.openProfile": "Abrir perfil completo en Spotify",
    "music.openPlayer": "Abrir reproductor de {name}",
    "music.closePlayer": "Cerrar reproductor de {name}",
    "music.playerOpen": "Reproductor de {name} abierto",
    "music.loading": "Cargando reproductor…",

    "videos.eyebrow": "En vivo en pantalla",
    "videos.title": "Videos",
    "videos.sub":
      "Videoclips y lyric videos oficiales. Elige una miniatura o toca reproducir en la pantalla grande.",
    "videos.play": "Reproducir: {title}",
    "videos.playOnYT": "Reproducir en YouTube",
    "videos.prev": "Video anterior",
    "videos.next": "Video siguiente",
    "videos.all": "Ver todo en YouTube",

    "bio.eyebrow": "La historia",
    "bio.title": "Bio",
    "bio.p1":
      "es un proyecto electrónico de género Synthpop / Synthwave establecido en la ciudad de Riobamba, Ecuador.",
    "bio.p2":
      "La propuesta se enfoca en revivir la música de los 80s con un toque actual: sintetizadores analógicos, líneas melódicas nostálgicas y una estética futurista que dialoga con el pasado.",
    "bio.p3":
      "Con {singles} sencillos, {eps} EPs y el álbum Tiempo (2019) ya publicados, el proyecto sigue expandiendo su universo sonoro con producciones propias.",
    "bio.p4":
      "Composición, producción y dirección artística a cargo de Alejandro Veloz.",
    "bio.statActive": "Activos desde",
    "bio.statAlbum": "Álbum · Tiempo",
    "bio.statSingles": "Sencillos",
    "bio.statEps": "EPs",
    "bio.statTracks": "Tracks",
    "bio.followIG": "Seguir en Instagram",

    "contact.eyebrow": "Conéctate",
    "contact.title": "Sígueme",
    "contact.sub": "Todas las plataformas en un solo lugar. Dale play y comparte el viaje.",
    "contact.contact": "Contacto",

    "footer.desc":
      "Proyecto electrónico de género Synthpop / Synthwave desde Riobamba, Ecuador.",
    "footer.made": "Hecho con sintetizadores y nostalgia",
  },
  en: {
    "nav.open": "Open menu",
    "nav.close": "Close menu",
    "nav.music": "Music",
    "nav.videos": "Videos",
    "nav.bio": "Bio",
    "nav.contact": "Contact",
    "nav.backToTop": "Back to top",
    "nav.spotify": "Spotify",

    "hero.releaseEyebrow": "New release · 2026",
    "hero.releaseBadge": "New single",
    "hero.releaseSub": "(2026 Remaster)",
    "hero.releaseDate": "Releasing August 15",
    "hero.released": "Now available",
    "hero.previewLabel": "Preview · Releasing August 15",
    "hero.releaseDesc":
      "Born in 2020, during the pandemic lockdown in Ecuador. It's a song about love and absence: the memories that never fade and the words left unspoken. Six years later, this definitive version completes its story with the sound we always imagined.",
    "hero.countdown.days": "Days",
    "hero.countdown.hours": "Hrs",
    "hero.countdown.min": "Min",
    "hero.countdown.sec": "Sec",
    "hero.watchVideos": "Watch videos",
    "hero.mainEyebrow": "Electronic project · Riobamba, Ecuador",
    "hero.tag": "SYNTHPOP · SYNTHWAVE",
    "hero.desc":
      "80s music revived with a modern touch. A sonic journey through synthesizers, nostalgia and the stars.",
    "hero.listenSpotify": "Listen on Spotify",
    "hero.dotRelease": "New release",
    "hero.dotMain": "About Dune Moon",
    "hero.scroll": "Scroll to music",
    "hero.audioPlay": "Play {title}",
    "hero.audioPause": "Pause {title}",

    "music.eyebrow": "Play now",
    "music.title": "Music",
    "music.sub":
      "Top tracks, album, singles and EPs from Dune Moon. Tap a card to open its Spotify player without leaving this page.",
    "music.toptracksEyebrow": "Most played",
    "music.toptracksTitle": "Top Tracks",
    "music.toptracksSub": "Dune Moon's most played tracks on Spotify.",
    "music.artistEmbed": "Dune Moon on Spotify",
    "music.singles": "Singles",
    "music.eps": "EPs",
    "music.openProfile": "Open full profile on Spotify",
    "music.openPlayer": "Open {name} player",
    "music.closePlayer": "Close {name} player",
    "music.playerOpen": "{name} player open",
    "music.loading": "Loading player…",

    "videos.eyebrow": "Live on screen",
    "videos.title": "Videos",
    "videos.sub":
      "Official music videos and lyric videos. Pick a thumbnail or press play on the big screen.",
    "videos.play": "Play: {title}",
    "videos.playOnYT": "Play on YouTube",
    "videos.prev": "Previous video",
    "videos.next": "Next video",
    "videos.all": "Watch all on YouTube",

    "bio.eyebrow": "The story",
    "bio.title": "Bio",
    "bio.p1":
      "is an electronic project of the Synthpop / Synthwave genre based in Riobamba, Ecuador.",
    "bio.p2":
      "The proposal focuses on reviving 80s music with a modern touch: analog synthesizers, nostalgic melodic lines and a futuristic aesthetic in dialogue with the past.",
    "bio.p3":
      "With {singles} singles, {eps} EPs and the album Tiempo (2019) already released, the project keeps expanding its sonic universe with original productions.",
    "bio.p4":
      "Composition, production and art direction by Alejandro Veloz.",
    "bio.statActive": "Active since",
    "bio.statAlbum": "Album · Tiempo",
    "bio.statSingles": "Singles",
    "bio.statEps": "EPs",
    "bio.statTracks": "Tracks",
    "bio.followIG": "Follow on Instagram",

    "contact.eyebrow": "Get connected",
    "contact.title": "Follow me",
    "contact.sub": "All platforms in one place. Press play and share the journey.",
    "contact.contact": "Contact",

    "footer.desc":
      "Electronic project of the Synthpop / Synthwave genre from Riobamba, Ecuador.",
    "footer.made": "Made with synthesizers and nostalgia",
  },
};

const LangContext = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLang] = useState("es");

  useEffect(() => {
    let saved = "es";
    try {
      const stored = window.localStorage.getItem("dune-lang");
      if (stored === "es" || stored === "en") saved = stored;
    } catch {
      /* ignore */
    }
    setLang(saved);
    document.documentElement.lang = saved;
  }, []);

  const setLanguage = useCallback((next) => {
    setLang(next);
    document.documentElement.lang = next;
    try {
      window.localStorage.setItem("dune-lang", next);
    } catch {
      /* ignore */
    }
  }, []);

  const t = useCallback(
    (key, vars) => {
      let str = (dict[lang] && dict[lang][key]) || dict.es[key] || key;
      if (vars) {
        for (const [k, v] of Object.entries(vars)) {
          str = str.replaceAll(`{${k}}`, v);
        }
      }
      return str;
    },
    [lang]
  );

  return (
    <LangContext.Provider value={{ lang, setLanguage, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}
