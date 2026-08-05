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
    "hero.readStory": "Leer la historia",
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

    "manifest.back": "Volver al inicio",
    "manifest.eyebrow": "La historia",
    "manifest.title": "En Mi Mente",
    "manifest.subtitle": "Origen, significado y sonido de una canción nacida en pandemia.",
    "manifest.byline": "Alejandro Veloz · Dune Moon",
    "manifest.song": "En Mi Mente (2026 Remaster)",
    "manifest.videoTitle": "En Mi Mente · Caletazo Sessions (2020)",
    "manifest.videoDesc":
      "La versión original, interpretada durante Caletazo Sessions en 2020, permanece disponible como testimonio de aquel momento y del origen de esta historia.",
    "manifest.listen": "Escuchar en Spotify",
    "manifest.share": "Compartir",
    "manifest.shared": "Enlace copiado",
    "manifest.shareText":
      "La historia de En Mi Mente, la nueva versión 2026 de Dune Moon.",
    "manifest.p1":
      "En Mi Mente es una canción que nació en 2020, en medio de la pandemia de COVID-19, durante el confinamiento que vivimos en Ecuador. Fueron días de incertidumbre, silencio y miedo. En Riobamba, como en el resto del país, aprendimos a convivir con la idea de que la pérdida de un ser querido podía llegar en cualquier momento. Todos conocimos a un familiar, un amigo o un conocido que partió durante esa época, y esa realidad cambió para siempre nuestra forma de ver la vida.",
    "manifest.p2":
      "Los gobiernos nos obligaron a permanecer encerrados con el objetivo de evitar más contagios. En medio de ese aislamiento, entre emociones pasadas y presentes, nació esta canción: una composición con una letra sencilla y directa que habla de aquello que permanece cuando alguien ya no está.",
    "manifest.p3":
      "Pero En Mi Mente también habla del amor. De ese amor que permanece incluso cuando una relación termina o cuando la distancia parece imposible de vencer. Habla de los recuerdos que se niegan a desaparecer, de las conversaciones que continúan en silencio y de la forma en que una sola persona puede habitar nuestra mente durante años. Porque el amor no siempre termina con una despedida; a veces continúa viviendo en la memoria, transformándose en nostalgia, en aprendizaje y, finalmente, en música.",
    "manifest.p4":
      "Es una canción de amor, pero también un homenaje a quienes ya no están. Habla de todas esas palabras que nunca pudimos decir, de las despedidas que quedaron pendientes y de los silencios que, con el paso del tiempo, siguen resonando dentro de nosotros.",
    "manifest.p5":
      "La canción comienza con un lead que guía toda la composición y simboliza la desesperación y la ansiedad. Por momentos parece desaparecer, pero siempre regresa sin previo aviso, como lo hacen los pensamientos que se resisten a marcharse. Lo acompaña un subgrave que evoca el ritmo constante de las palpitaciones y un bajo intenso y agresivo, fiel al sonido que caracteriza a Dune Moon.",
    "manifest.p6":
      "En Mi Mente fue publicada por primera vez en 2020 como parte de la programación de Caletazo Sessions, una iniciativa de Fase Matiz que reunió a varios artistas durante la pandemia. Como ocurrió con muchos proyectos musicales de ese período, la producción audiovisual fue realizada con los recursos y las limitaciones que imponía el confinamiento. El resultado fue un registro sencillo, pero honesto, que capturó el espíritu de aquellos días y permitió que la canción viera la luz por primera vez.",
    "manifest.p7":
      "Seis años después, esta nueva versión busca convertirse en la versión definitiva de En Mi Mente. No pretende reemplazar su historia, sino completarla. Es el resultado de un proceso de maduración artística y técnica que permitió llevar la canción al sonido, la mezcla y la producción que siempre imaginamos, respetando la esencia con la que fue escrita.",
    "manifest.p8":
      "Esta canción no busca responder preguntas ni ofrecer consuelo. Es el retrato de una época que nos marcó a todos, pero también de un sentimiento que trasciende el tiempo. Porque, al final, el amor y la ausencia suelen habitar el mismo lugar: la memoria. Y mientras exista un recuerdo capaz de regresar sin previo aviso, En Mi Mente seguirá encontrando un lugar donde sonar.",
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
    "hero.readStory": "Read the story",
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

    "manifest.back": "Back to home",
    "manifest.eyebrow": "The story",
    "manifest.title": "En Mi Mente",
    "manifest.subtitle": "Origin, meaning and sound of a song born during the pandemic.",
    "manifest.byline": "Alejandro Veloz · Dune Moon",
    "manifest.song": "En Mi Mente (2026 Remaster)",
    "manifest.videoTitle": "En Mi Mente · Caletazo Sessions (2020)",
    "manifest.videoDesc":
      "The original version, performed during Caletazo Sessions in 2020, remains available as a testimony of that moment and of the origin of this story.",
    "manifest.listen": "Listen on Spotify",
    "manifest.share": "Share",
    "manifest.shared": "Link copied",
    "manifest.shareText":
      "The story of En Mi Mente, the new 2026 version by Dune Moon.",
    "manifest.p1":
      "En Mi Mente is a song born in 2020, in the middle of the COVID-19 pandemic, during the lockdown we lived through in Ecuador. Those were days of uncertainty, silence and fear. In Riobamba, as in the rest of the country, we learned to live with the idea that losing a loved one could happen at any moment. Everyone knew a relative, a friend or an acquaintance who passed away during that time, and that reality changed forever the way we see life.",
    "manifest.p2":
      "Governments forced us to stay locked down to prevent more infections. In the middle of that isolation, between past and present emotions, this song was born: a composition with simple, direct lyrics that speaks of what remains when someone is no longer here.",
    "manifest.p3":
      "But En Mi Mente also speaks of love. Of that love that remains even when a relationship ends or when distance seems impossible to overcome. It speaks of memories that refuse to disappear, of conversations that continue in silence and of how a single person can inhabit our minds for years. Because love does not always end with a farewell; sometimes it keeps living in memory, transforming into nostalgia, into learning and, finally, into music.",
    "manifest.p4":
      "It is a love song, but also a tribute to those who are no longer here. It speaks of all those words we never managed to say, of the farewells that were left pending and of the silences that, over time, keep echoing inside us.",
    "manifest.p5":
      "The song begins with a lead that guides the whole composition and symbolizes desperation and anxiety. At times it seems to disappear, but it always returns without warning, like the thoughts that refuse to go away. It is accompanied by a sub-bass that evokes the constant rhythm of a heartbeat and an intense, aggressive bass, faithful to the sound that defines Dune Moon.",
    "manifest.p6":
      "En Mi Mente was first published in 2020 as part of the Caletazo Sessions programming, a Fase Matiz initiative that brought together several artists during the pandemic. As with many musical projects of that period, the audiovisual production was made with the resources and limitations imposed by lockdown. The result was a simple but honest record that captured the spirit of those days and let the song see the light for the first time.",
    "manifest.p7":
      "Six years later, this new version seeks to become the definitive version of En Mi Mente. It does not intend to replace its story, but to complete it. It is the result of a process of artistic and technical maturation that allowed the song to reach the sound, the mix and the production we always imagined, respecting the essence with which it was written.",
    "manifest.p8":
      "This song does not seek to answer questions or offer comfort. It is the portrait of an era that marked us all, but also of a feeling that transcends time. Because, in the end, love and absence usually inhabit the same place: memory. And as long as a memory capable of returning without warning exists, En Mi Mente will keep finding a place to sound.",
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
