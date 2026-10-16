"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useLang } from "@/lib/i18n";

const STORAGE_KEY = "dune-moon-player-state";

export default function MusicPlayer({ currentTrack, isOpen, onClose, onNext, onPrev, tracks }) {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const modalRef = useRef(null);
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

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

  // Restore volume from localStorage
  useEffect(() => {
    if (savedState.current?.volume !== undefined) {
      setVolume(savedState.current.volume);
      if (audioRef.current) audioRef.current.volume = savedState.current.volume;
    }
  }, []);

  // Persist state
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

  // Audio event handlers
  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current && audioRef.current.duration) {
      setProgress(audioRef.current.currentTime / audioRef.current.duration);
    }
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      // Restore progress if saved
      if (savedState.current?.progress && savedState.current.trackId === currentTrack?.id) {
        audioRef.current.currentTime = savedState.current.progress * audioRef.current.duration;
        savedState.current = null; // Only restore once
      }
    }
  }, [currentTrack]);

  const handleEnded = useCallback(() => {
    onNext();
  }, [onNext]);

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
    setIsMuted(vol === 0);
    if (audioRef.current) audioRef.current.volume = vol;
  }, []);

  const handleMuteToggle = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  }, [isMuted]);

  const handlePlayPause = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {
        setIsPlaying(false);
      });
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
    <>
      {/* Audio element - hidden but functional */}
      <audio
        ref={audioRef}
        src={`https://open.spotify.com/embed/album/${currentTrack.id}?utm_source=generator&theme=0`}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={() => { setIsLoading(false); setIsPlaying(false); }}
        preload="metadata"
        volume={volume}
      />

      {/* Modal backdrop */}
      <motion.div
        className="music-modal__backdrop"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={reduce ? false : { opacity: 0 }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal panel */}
      <motion.div
        ref={modalRef}
        className="music-modal"
        role="dialog"
        aria-modal="true"
        aria-label={t("music.playerLabel")}
        initial={reduce ? false : { y: 40, opacity: 0, scale: 0.96 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={reduce ? false : { y: 40, opacity: 0, scale: 0.96 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onKeyDown={handleKeyDown}
      >
        <div className="music-modal__header">
          <button
            className="music-modal__close"
            onClick={onClose}
            aria-label={t("music.closePlayer")}
          >
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="music-modal__content">
          <div className="music-modal__track">
            <img
              src={`/covers/${currentTrack.id}.jpg`}
              alt=""
              width="80"
              height="80"
              className="music-modal__cover"
              loading="lazy"
            />
            <div className="music-modal__meta">
              <p className="music-modal__title">{currentTrack.name}</p>
              <p className="music-modal__artist">Dune Moon · {currentTrack.year}</p>
              {currentTrack.type && (
                <span className="music-modal__type">{currentTrack.type === 'album' ? 'Álbum' : currentTrack.type === 'ep' ? 'EP' : 'Single'}</span>
              )}
            </div>
          </div>

          <div className="music-modal__progress" onClick={handleProgressClick} role="slider" aria-label={t("music.seek")} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress * 100)} tabIndex={0}>
            <div
              className="music-modal__progress-bar"
              style={{ width: `${progress * 100}%` }}
              aria-hidden="true"
            />
            <div className="music-modal__progress-handle" style={{ left: `${progress * 100}%` }} aria-hidden="true" />
          </div>

          <div className="music-modal__time">
            <span>{formatTime(progress * duration)}</span>
            <span>{formatTime(duration)}</span>
          </div>

          <div className="music-modal__controls">
            <button
              className="music-modal__btn music-modal__btn--prev"
              onClick={handlePrev}
              aria-label={t("music.prevTrack")}
              disabled={!tracks || tracks.length <= 1}
            >
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
                <path d="M19 18H5V6h14v12zm-7-12l-6 6 6 6V6z" />
              </svg>
            </button>

            <button
              className="music-modal__btn music-modal__btn--play"
              onClick={handlePlayPause}
              aria-label={isPlaying ? t("music.pause") : t("music.play")}
              disabled={isLoading}
            >
              {isLoading ? (
                <svg className="music-modal__spinner" viewBox="0 0 24 24" width="32" height="32" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="31.4 31.4" />
                </svg>
              ) : isPlaying ? (
                <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor" aria-hidden="true">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor" aria-hidden="true">
                  <path d="M8 5.14v14l11-7-11-7z" />
                </svg>
              )}
            </button>

            <button
              className="music-modal__btn music-modal__btn--next"
              onClick={handleNext}
              aria-label={t("music.nextTrack")}
              disabled={!tracks || tracks.length <= 1}
            >
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
                <path d="M5 6v12h14V6H5zm7-4l6 6-6 6V2z" />
              </svg>
            </button>
          </div>

          <div className="music-modal__volume">
            <button
              className="music-modal__volume-btn"
              onClick={handleMuteToggle}
              aria-label={isMuted ? t("music.unmute") : t("music.mute")}
            >
              {isMuted ? (
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                  <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
                </svg>
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              aria-label={t("music.volume")}
              className="music-modal__volume-slider"
              disabled={isMuted}
            />
          </div>
        </div>

        <div className="music-modal__actions">
          <button
            className="music-modal__spotify-btn"
            onClick={handleOpenSpotify}
            aria-label={t("music.openInSpotify")}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
            </svg>
            <span>{t("music.openInSpotify")}</span>
          </button>
        </div>
      </motion.div>
    </>
  );
}