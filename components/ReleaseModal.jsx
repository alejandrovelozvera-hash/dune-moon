"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion, useReducedMotion } from "motion/react";
import { X } from "lucide-react";
import ReleaseCard from "./ReleaseCard";
import { useLang } from "@/lib/i18n";

export default function ReleaseModal({ title, items, isOpen, onClose, onPlay, type }) {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const modalRef = useRef(null);

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
        onClick={(e) => e.stopPropagation()}
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
              <ReleaseCard
                key={item.id}
                item={item}
                index={i}
                isFeatured={false}
                onPlay={onPlay}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
}