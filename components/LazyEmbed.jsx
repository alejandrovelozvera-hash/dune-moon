"use client";

import { useEffect, useRef, useState } from "react";

export default function LazyEmbed({ src, title, height = 352, cover }) {
  const ref = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setLoaded(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setLoaded(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: "400px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="lazy-embed" ref={ref} style={{ height }}>
      {loaded ? (
        <iframe
          title={title}
          src={src}
          width="100%"
          height={height}
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          referrerPolicy="no-referrer"
          sandbox="allow-scripts allow-same-origin allow-presentation"
          style={{ borderRadius: 12 }}
        />
      ) : (
        <div className="lazy-embed__placeholder" aria-hidden="true">
          {cover && <img src={cover} alt="" loading="lazy" />}
          <span>Cargando reproductor…</span>
        </div>
      )}
    </div>
  );
}
