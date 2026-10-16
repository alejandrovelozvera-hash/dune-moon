"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  ExternalLink,
  X,
  Loader2,
} from "lucide-react";
import { useLang } from "@/lib/i18n";

const STORAGE_KEY = "dune-moon-player-state";

export default function MusicPlayer({ currentTrack, isOpen, onClose, onNext, onPrev, tracks }) {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const playerRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Persist current track
  useEffect(() => {
    if (isOpen && currentTrack) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          trackId: currentTrack.id,
          trackName: currentTrack.name,
        }));
      } catch { /* ignore */ }
    }
  }, [isOpen, currentTrack]);

  // Restore last track on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Could restore track here if needed
      }
    } catch { /* ignore */ }
  }, []);

  const handleOpenSpotify = useCallback(() => {
    if (currentTrack) {
      window.open(`https://open.spotify.com/album/${currentTrack.id}`, "_blank", "noopener,noreferrer");
    }
  }, [currentTrack]);

  const handlePlayPause = useCallback(() => {
    // Play button = open in Spotify for real playback
    handleOpenSpotify();
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 1000); // Visual feedback
  }, [handleOpenSpotify]);

  const handleNext = useCallback(() => {
    onNext();
  }, [onNext]);

  const handlePrev = useCallback(() => {
    onPrev();
  }, [onPrev]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === "Escape") onClose();
    if (e.key === " ") { e.preventDefault(); handlePlayPause(); }
    if (e.key === "ArrowRight") handleNext();
    if (e.key === "ArrowLeft") handlePrev();
  }, [onClose, handlePlayPause, handleNext, handlePrev]);

  const formatTime = (sec) => {
    if (!sec || isNaN(sec)) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  if (!isOpen || !currentTrack) return null;

  return (
    <motion.div
      ref={playerRef}
      className="music-player"
      role="region"
      aria-label={t("music.playerLabel")}
      initial={reduce ? false : { y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={reduce ? false : { y: 100, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      onKeyDown={handleKeyDown}
    >
      <div className="music-player__inner">
        <div className="music-player__track">
          <img
            src={`/covers/${currentTrack.id}.jpg`}
            alt=""
            width="56"
            height="56"
            className="music-player__cover"
            loading="lazy"
          />
          <div className="music-player__meta">
            <p className="music-player__title">{currentTrack.name}</p>
            <p className="music-player__artist">Dune Moon</p>
          </div>
        </div>

        <div className="music-player__controls">
          <button
            className="music-player__btn music-player__btn--prev"
            onClick={handlePrev}
            aria-label={t("music.prevTrack")}
            disabled={!tracks || tracks.length <= 1}
          >
            <SkipBack size={20} aria-hidden="true" />
          </button>

          <button
            className="music-player__btn music-player__btn--play"
            onClick={handlePlayPause}
            aria-label={t("music.playInSpotify")}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="music-player__spinner" size={24} aria-hidden="true" />
            ) : (
              <Play size={24} aria-hidden="true" />
            )}
          </button>

          <button
            className="music-player__btn music-player__btn--next"
            onClick={handleNext}
            aria-label={t("music.nextTrack")}
            disabled={!tracks || tracks.length <= 1}
          >
            <SkipForward size={20} aria-hidden="true" />
          </button>
        </div>

        <div className="music-player__progress" role="slider" aria-label={t("music.seek")} aria-valuemin={0} aria-valuemax={100} aria-valuenow={0} tabIndex={0} aria-disabled={true}>
          <div className="music-player__progress-bar" style={{ width: "0%" }} aria-hidden="true" />
        </div>

        <div className="music-player__time">
          <span>0:00</span>
          <span>--:--</span>
        </div>

        <button
          className="music-player__spotify-btn"
          onClick={handleOpenSpotify}
          aria-label={t("music.openInSpotify")}
        >
          <ExternalLink size={16} aria-hidden="true" />
          <span>{t("music.openInSpotify")}</span>
        </button>

        <button
          className="music-player__close"
          onClick={onClose}
          aria-label={t("music.closePlayer")}
        >
          <X size={20} aria-hidden="true" />
        </button>
      </div>
    </motion.div>
  );
}