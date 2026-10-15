"use client";

import { useState, useCallback, useMemo } from "react";
import Reveal from "./Reveal";
import LazyEmbed from "./LazyEmbed";
import ReleaseCard from "./ReleaseCard";
import MusicPlayer from "./MusicPlayer";
import { ARTIST_ID, DISCOGRAPHY, FEATURED_ID, FEATURED_UNTIL, SOCIALS } from "@/lib/data";
import { useLang } from "@/lib/i18n";

const artistUrl = `https://open.spotify.com/embed/artist/${ARTIST_ID}?utm_source=generator&theme=0`;
const embedUrl = (id) => `https://open.spotify.com/embed/album/${id}?utm_source=generator&theme=0`;

export default function Music() {
  const { t } = useLang();
  const [showFeatured, setShowFeatured] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [playerOpen, setPlayerOpen] = useState(false);

  const spotify = SOCIALS.find((s) => s.name === "Spotify");
  const album = DISCOGRAPHY.album;
  const singles = DISCOGRAPHY.singles;
  const eps = DISCOGRAPHY.eps;

  const allTracks = useMemo(() => [
    { ...album, type: "album" },
    ...singles.map(s => ({ ...s, type: "single", tracks: 1 })),
    ...eps.map(e => ({ ...e, type: "ep" })),
  ], [album, singles, eps]);

  const featuredTrack = useMemo(() => allTracks.find(t => t.id === FEATURED_ID), [allTracks]);

  const handlePlay = useCallback((track) => {
    setCurrentTrack(track);
    setPlayerOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setPlayerOpen(false);
    setTimeout(() => setCurrentTrack(null), 400);
  }, []);

  const handleNext = useCallback(() => {
    if (!currentTrack) return;
    const idx = allTracks.findIndex(t => t.id === currentTrack.id);
    const nextIdx = (idx + 1) % allTracks.length;
    setCurrentTrack(allTracks[nextIdx]);
  }, [currentTrack, allTracks]);

  const handlePrev = useCallback(() => {
    if (!currentTrack) return;
    const idx = allTracks.findIndex(t => t.id === currentTrack.id);
    const prevIdx = (idx - 1 + allTracks.length) % allTracks.length;
    setCurrentTrack(allTracks[prevIdx]);
  }, [currentTrack, allTracks]);

  return (
    <section id="musica" className="section music-section">
      <Reveal className="music__toptracks">
        <div
          className="music__toptracks-bg"
          aria-hidden="true"
          style={{ backgroundImage: `url(/covers/${album.id}.jpg)` }}
        />
        <div className="container music__toptracks-inner">
          <div className="music__toptracks-info">
            <p className="eyebrow">
              <span className="section-index">01</span>
              {t("music.toptracksEyebrow")}
            </p>
            <h2 className="music__toptracks-title">
              <span className="gradient-text">{t("music.title")}</span>
            </h2>
            <p className="music__toptracks-sub">{t("music.sub")}</p>
          </div>
          <div className="music__artist panel">
            <LazyEmbed
              src={artistUrl}
              title={t("music.artistEmbed")}
              height={420}
              cover={`/covers/${album.id}.jpg`}
            />
          </div>
        </div>
      </Reveal>

      <div className="container">
        {showFeatured && featuredTrack && (
          <div className="music__group music__group--featured">
            <Reveal className="music__group-head">
              <h3 className="music__group-title">
                {featuredTrack.name} <span className="release__badge release__badge--lg">{t("hero.releaseBadge")}</span>
              </h3>
              <span className="music__group-count">{featuredTrack.year}</span>
            </Reveal>
            <Reveal delay={1} className="music__album panel music__album--featured">
              <LazyEmbed
                src={embedUrl(featuredTrack.id)}
                title={`${featuredTrack.name} en Spotify`}
                height={352}
                cover={`/covers/${featuredTrack.id}.jpg`}
              />
            </Reveal>
            <Reveal className="music__featured-cta">
              <button
                type="button"
                className="btn btn--primary"
                onClick={() => handlePlay(featuredTrack)}
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                  <path d="M8 5.14v14l11-7-11-7Z" />
                </svg>
                {t("hero.listenSpotify")}
              </button>
              <a
                href={`https://open.spotify.com/album/${featuredTrack.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--ghost"
              >
                {t("music.openInSpotify")}
              </a>
            </Reveal>
          </div>
        )}

        <div className="music__group">
          <Reveal className="music__group-head">
            <h3 className="music__group-title">{album.name}</h3>
            <span className="music__group-count">{album.year}</span>
          </Reveal>
          <Reveal delay={1} className="music__album panel">
            <LazyEmbed
              src={embedUrl(album.id)}
              title={`${album.name} en Spotify`}
              height={352}
              cover={`/covers/${album.id}.jpg`}
            />
          </Reveal>
        </div>

        <div className="music__group">
          <Reveal className="music__group-head">
            <h3 className="music__group-title">{t("music.singles")}</h3>
            <span className="music__group-count">
              {String(singles.length).padStart(2, "0")}
            </span>
          </Reveal>
          <div className="music__grid music__grid--releases" role="list" aria-label={t("music.singles")}>
            {singles.map((item, i) => (
              <ReleaseCard
                key={item.id}
                item={{ ...item, tracks: 1 }}
                index={i}
                isFeatured={item.id === FEATURED_ID}
                onPlay={handlePlay}
              />
            ))}
          </div>
        </div>

        <div className="music__group">
          <Reveal className="music__group-head">
            <h3 className="music__group-title">{t("music.eps")}</h3>
            <span className="music__group-count">
              {String(eps.length).padStart(2, "0")}
            </span>
          </Reveal>
          <div className="music__grid music__grid--releases" role="list" aria-label={t("music.eps")}>
            {eps.map((item, i) => (
              <ReleaseCard
                key={item.id}
                item={item}
                index={i}
                isFeatured={false}
                onPlay={handlePlay}
              />
            ))}
          </div>
        </div>

        <Reveal className="music__cta">
          <a
            href={spotify.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--ghost"
          >
            {t("music.openProfile")}
          </a>
        </Reveal>
      </div>

      <MusicPlayer
        currentTrack={currentTrack}
        isOpen={playerOpen}
        onClose={handleClose}
        onNext={handleNext}
        onPrev={handlePrev}
        tracks={allTracks}
      />
    </section>
  );
}