"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useLang } from "@/lib/i18n";

const STORAGE_KEY = "dune-moon-player-state";

export default function MusicPlayer({ currentTrack, isOpen, onClose, onNext, onPrev, tracks }) {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const playerRef = useRef(null);
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const savedState = useRef(null);
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) savedState.current = JSON.parse(saved);
    } catch { /* ignore */ }
  }, []);

  // Initialize player state when track changes
  const prevTrackRef = useRef(currentTrack);
  useEffect(() => {
    if (currentTrack && currentTrack !== prevTrackRef.current) {
      prevTrackRef.current = currentTrack;
      setIsLoading(true);
      setIsPlaying(true);
      setProgress(0);
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
      }
      const timer = setTimeout(() => setIsLoading(false), 800);
      return () => clearTimeout(timer);
    }
  }, [currentTrack]);

  useEffect(() => {
    if (isOpen && currentTrack) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          trackId: currentTrack.id,
          trackName: currentTrack.name,
          progress: progress,
          volume: volume,
        }));
      } catch { /* ignore */ }
    }
  }, [isOpen, currentTrack, progress, volume]);

  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime / audioRef.current.duration || 0);
    }
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  }, []);

  const handleProgressClick = useCallback((e) => {
    if (!audioRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = percent * audioRef.current.duration;
    setProgress(percent);
  }, []);

  const handleVolumeChange = useCallback((e) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (audioRef.current) audioRef.current.volume = vol;
  }, []);

  const handlePlayPause = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const handleNext = useCallback(() => {
    onNext();
  }, [onNext]);

  const handlePrev = useCallback(() => {
    onPrev();
  }, [onPrev]);

  const handleOpenSpotify = useCallback(() => {
    if (currentTrack) {
      window.open(`https://open.spotify.com/album/${currentTrack.id}`, "_blank", "noopener,noreferrer");
    }
  }, [currentTrack]);

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
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
              <path d="M6 6h2v12H6zm3.5-6l8.5 6-8.5 6V0z" />
            </svg>
          </button>

          <button
            className="music-player__btn music-player__btn--play"
            onClick={handlePlayPause}
            aria-label={isPlaying ? t("music.pause") : t("music.play")}
            disabled={isLoading}
          >
            {isLoading ? (
              <svg className="music-player__spinner" viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="31.4 31.4" />
              </svg>
            ) : isPlaying ? (
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
                <path d="M8 5.14v14l11-7-11-7z" />
              </svg>
            )}
          </button>

          <button
            className="music-player__btn music-player__btn--next"
            onClick={handleNext}
            aria-label={t("music.nextTrack")}
            disabled={!tracks || tracks.length <= 1}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
            </svg>
          </button>
        </div>

        <div className="music-player__progress" onClick={handleProgressClick} role="slider" aria-label={t("music.seek")} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress * 100)} tabIndex={0}>
          <div
            className="music-player__progress-bar"
            style={{ width: `${progress * 100}%` }}
            aria-hidden="true"
          />
        </div>

        <div className="music-player__time">
          <span>{formatTime(progress * duration)}</span>
          <span>{formatTime(duration)}</span>
        </div>

        <div className="music-player__volume">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
          </svg>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            aria-label={t("music.volume")}
            className="music-player__volume-slider"
          />
        </div>

        <button
          className="music-player__spotify-btn"
          onClick={handleOpenSpotify}
          aria-label={t("music.openInSpotify")}
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
          </svg>
          <span>{t("music.openInSpotify")}</span>
        </button>

        <button
          className="music-player__close"
          onClick={onClose}
          aria-label={t("music.closePlayer")}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}