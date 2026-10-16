"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { X, Play, Loader2 } from "lucide-react";
import { useLang } from "@/lib/i18n";

const embedUrl = (id) => `https://open.spotify.com/embed/album/${id}?utm_source=generator&theme=0`;

function ReleaseCardModal({ item, index, isExpanded, onToggleExpand, embedUrl, reduce, t }) {
  const [hovered, setHovered] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  return (
    <motion.article
      className={`release-card-modal${isExpanded ? " is-expanded" : ""}${hovered ? " is-hovered" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={reduce ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: (index % 8) * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="release-card-modal__cover-wrapper">
        <img
          src={`/covers/${item.id}.jpg`}
          alt={`${item.name} cover`}
          width="300"
          height="300"
          loading="lazy"
          className="release-card-modal__cover"
        />
        <div className="release-card-modal__overlay" aria-hidden="true">
          {!isExpanded && (
            <button
              className="release-card-modal__play-btn"
              onClick={onToggleExpand}
              aria-label={t("music.openPlayer", { name: item.name })}
            >
              <Play size={32} aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      <div className="release-card-modal__info">
        <h3 className="release-card-modal__name">{item.name}</h3>
        <span className="release-card-modal__year">{item.year}</span>
      </div>

      {isExpanded && (
        <div className="release-card-modal__expand">
          <div className="release-card-modal__embed-wrapper">
            <iframe
              src={embedUrl}
              title={`${item.name} en Spotify`}
              width="100%"
              height={352}
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              onLoad={() => setIframeLoaded(true)}
              className="release-card-modal__iframe"
            />
            {!iframeLoaded && (
              <div className="release-card-modal__loader">
                <Loader2 className="release-card-modal__spinner" size={32} aria-hidden="true" />
              </div>
            )}
          </div>
          <button
            className="release-card-modal__close-expand"
            onClick={onToggleExpand}
            aria-label={t("music.closePlayer")}
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>
      )}
    </motion.article>
  );
}

export default function ReleaseModal({ title, items, isOpen, onClose, onPlay, type }) {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const modalRef = useRef(null);
  const [expandedId, setExpandedId] = useState(null);

  // Focus trap
  useEffect(() => {
    if (!isOpen) return;
    const modal = modalRef.current;
    if (!modal) return;

    const focusable = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const handleTab = (e) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    modal.addEventListener("keydown", handleTab);
    first?.focus();
    return () => modal.removeEventListener("keydown", handleTab);
  }, [isOpen]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === "Escape") onClose();
  }, [onClose]);

  const handleCardClick = (item) => {
    if (expandedId === item.id) {
      setExpandedId(null);
    } else {
      setExpandedId(item.id);
      onPlay(item);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <motion.div
        className="release-modal__backdrop"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={reduce ? false : { opacity: 0 }}
        onClick={onClose}
        aria-hidden="true"
      />

      <motion.div
        ref={modalRef}
        className="release-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="release-modal-title"
        initial={reduce ? false : { y: 20, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={reduce ? false : { y: 20, opacity: 0, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onKeyDown={handleKeyDown}
      >
        <div className="release-modal__header">
          <h2 id="release-modal-title" className="release-modal__title">{title}</h2>
          <button
            className="release-modal__close"
            onClick={onClose}
            aria-label={t("music.closePlayer")}
          >
            <X size={24} aria-hidden="true" />
          </button>
        </div>

        <div className="release-modal__content">
          <div className="release-modal__grid" role="list" aria-label={title}>
            {items.map((item, i) => (
              <ReleaseCardModal
                key={item.id}
                item={item}
                index={i}
                isExpanded={expandedId === item.id}
                onToggleExpand={() => handleCardClick(item)}
                embedUrl={embedUrl(item.id)}
                reduce={reduce}
                t={t}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
}