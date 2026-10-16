"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";

export default function LazyEmbed({ src, title, height = 352, cover }) {
  const { t } = useLang();
  const ref = useRef(null);
  const hasIntersectionObserver = typeof IntersectionObserver !== "undefined";
  const [loaded, setLoaded] = useState(!hasIntersectionObserver);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!hasIntersectionObserver) return;

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
  }, [hasIntersectionObserver]);

  return (
    <div className={`lazy-embed${ready ? " is-ready" : ""}`} ref={ref} style={{ height }}>
      <iframe
        title={title}
        src={loaded ? src : ""}
        width="100%"
        height={height}
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        sandbox="allow-scripts allow-same-origin allow-presentation allow-forms allow-popups allow-popups-to-escape-sandbox"
        style={{ borderRadius: 12 }}
        onLoad={() => setReady(true)}
      />
      {!ready && (
        <div className="lazy-embed__placeholder" aria-hidden="true">
          {cover && <img src={cover} alt="" loading="lazy" />}
          <span>{t("music.loading")}</span>
        </div>
      )}
    </div>
  );
}
