"use client";

import { useEffect, useRef } from "react";

export default function Starfield() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let raf = 0;
    let stars = [];
    let shooting = [];

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const init = () => {
      const count = Math.min(220, Math.floor((width * height) / 9000));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.4 + 0.2,
        base: Math.random() * 0.6 + 0.4,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.35 + 0.05,
        hue: Math.random() > 0.82 ? 1 : 0, // occasional tinted star
      }));
    };

    const spawnShooting = () => {
      shooting.push({
        x: Math.random() * width,
        y: Math.random() * height * 0.4,
        vx: -(Math.random() * 4 + 5),
        vy: Math.random() * 2.4 + 2,
        life: 1,
        decay: Math.random() * 0.012 + 0.008,
      });
    };

    let lastShoot = 0;

    const draw = (t) => {
      ctx.clearRect(0, 0, width, height);

      for (const s of stars) {
        const twinkle = 0.55 + 0.45 * Math.sin(t * 0.001 * s.speed * 40 + s.phase);
        const alpha = s.base * twinkle;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle =
          s.hue === 1
            ? `rgba(170, 190, 230, ${alpha})`
            : `rgba(210, 220, 238, ${alpha})`;
        ctx.fill();
      }

      // shooting stars
      shooting = shooting.filter((m) => m.life > 0);
      for (const m of shooting) {
        m.x += m.vx;
        m.y += m.vy;
        m.life -= m.decay;
        const grad = ctx.createLinearGradient(m.x, m.y, m.x - m.vx * 9, m.y - m.vy * 9);
        grad.addColorStop(0, `rgba(140, 168, 224, ${m.life})`);
        grad.addColorStop(1, "rgba(140, 168, 224, 0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x - m.vx * 9, m.y - m.vy * 9);
        ctx.stroke();
      }

      if (t - lastShoot > 2200 + Math.random() * 2600) {
        spawnShooting();
        lastShoot = t;
      }

      raf = requestAnimationFrame(draw);
    };

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      init();
    };

    init();
    if (prefersReduced) {
      // static render, no loop
      draw(1000);
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(draw);
    }

    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}
