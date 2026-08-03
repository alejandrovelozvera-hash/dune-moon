"use client";

import { useEffect, useRef, useState } from "react";

export default function Reveal({ children, className = "", delay = 0, as: Tag = "div" }) {
  const ref = useRef(null);
  const [short, setShort] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    setShort(mq.matches);
    const onChange = (e) => setShort(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // En móvil (grilla de 1 columna) el escalonado se siente desigual:
  // se reduce a delay 1 como máximo.
  const effectiveDelay = short ? Math.min(delay, 1) : delay;
  const delayClass = effectiveDelay > 0 ? `reveal--delay-${effectiveDelay}` : "";

  return (
    <Tag ref={ref} className={`reveal ${delayClass} ${className}`}>
      {children}
    </Tag>
  );
}
