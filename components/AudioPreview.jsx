"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

function fmt(sec) {
  if (!Number.isFinite(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

const EQ_BARS = [0, 1, 2, 3, 4];

function Eq({ className = "" }) {
  return (
    <span className={`eq${className ? ` ${className}` : ""}`} aria-hidden="true">
      {EQ_BARS.map((i) => (
        <span className="eq__bar" style={{ animationDelay: `${i * 0.12}s` }} key={i} />
      ))}
    </span>
  );
}

const AudioPreview = forwardRef(function AudioPreview(
  { src, title, label = "Preview", onPlayingChange },
  ref
) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return undefined;
    const onTime = () => setCurrent(a.currentTime);
    const onMeta = () => setDuration(a.duration || 0);
    const onEnd = () => setPlaying(false);
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", onMeta);
    a.addEventListener("ended", onEnd);
    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("loadedmetadata", onMeta);
      a.removeEventListener("ended", onEnd);
    };
  }, []);

  const setPlayingState = (next) => {
    setPlaying(next);
    if (onPlayingChange) onPlayingChange(next);
  };

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlayingState(false);
    } else {
      a.play();
      setPlayingState(true);
    }
  };

  useImperativeHandle(ref, () => ({ toggle, playing: () => playing }));

  const seek = (e) => {
    const a = audioRef.current;
    if (!a || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    a.currentTime = ratio * duration;
    setCurrent(a.currentTime);
  };

  const pct = duration ? (current / duration) * 100 : 0;

  return (
    <div className={`audio-preview${playing ? " is-playing" : ""}`}>
      <audio ref={audioRef} src={src} preload="none" />
      <button
        className="audio-preview__play"
        onClick={toggle}
        aria-label={playing ? `Pausar ${title}` : `Reproducir ${title}`}
      >
        {playing ? (
          <Eq className="eq--in-button" />
        ) : (
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
            <path d="M8 5.14v14l11-7-11-7Z" />
          </svg>
        )}
      </button>
      <div className="audio-preview__body">
        <span className="audio-preview__title">{title}</span>
        <span className="audio-preview__label">{label}</span>
        <div
          className="audio-preview__bar"
          role="slider"
          aria-label="Progreso"
          aria-valuemin={0}
          aria-valuemax={duration || 0}
          aria-valuenow={Math.round(current)}
          onClick={seek}
        >
          <span className="audio-preview__fill" style={{ width: `${pct}%` }} />
        </div>
        <span className="audio-preview__time">
          {fmt(current)} / {fmt(duration)}
        </span>
      </div>
    </div>
  );
});

export { Eq };
export default AudioPreview;
