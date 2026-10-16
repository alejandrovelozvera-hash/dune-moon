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
  ChevronLeft,
  ChevronRight,
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
        savedState.current = null;
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
              aria-label={isPlaying ? t("music.pause") : t("music.play")}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="music-player__spinner" size={24} aria-hidden="true" />
              ) : isPlaying ? (
                <Pause size={24} aria-hidden="true" />
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

          <div className="music-player__progress" onClick={handleProgressClick} role="slider" aria-label={t("music.seek")} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress * 100)} tabIndex={0}>
            <div
              className="music-player__progress-bar"
              style={{ width: `${progress * 100}%` }}
              aria-hidden="true"
            />
            <div className="music-player__progress-handle" style={{ left: `${progress * 100}%` }} aria-hidden="true" />
          </div>

          <div className="music-player__time">
            <span>{formatTime(progress * duration)}</span>
            <span>{formatTime(duration)}</span>
          </div>

          <div className="music-player__volume">
            <button
              className="music-player__volume-btn"
              onClick={handleMuteToggle}
              aria-label={isMuted ? t("music.unmute") : t("music.mute")}
            >
              {isMuted ? <VolumeX size={18} aria-hidden="true" /> : <Volume2 size={18} aria-hidden="true" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              aria-label={t("music.volume")}
              className="music-player__volume-slider"
              disabled={isMuted}
            />
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
    </>
  );
}