import { useEffect, useRef } from 'react';

/**
 * Full-bleed looping background video for hero sections.
 *
 * - Poster layer paints immediately (it is the LCP element) and remains the
 *   fallback when the video can't play or the user prefers reduced motion
 *   (see .hero-video rules in index.css).
 * - The video source is attached imperatively AFTER window `load`, so the
 *   1–2 MB file never competes with the poster, fonts, or JS for bandwidth.
 *   (`autoplay` would otherwise start the download at parse time regardless
 *   of `preload`.) Setting `src` as a DOM attribute — not React children —
 *   keeps the prerendered HTML and hydration in agreement.
 * - Phones (< 768px) get the `-720` variant when one exists; larger screens
 *   get the full 1080p file.
 * - All copy stays in HTML on top of this component — never in the video.
 */
interface HeroVideoProps {
  /** Base name under /media, e.g. "hero-home" → /media/hero-home.mp4 + poster. */
  name: string;
  /** Extra classes for the overlay gradient, if a page needs a different scrim. */
  overlayClassName?: string;
  /** Extra classes for the <video> itself. */
  videoClassName?: string;
  /**
   * Extra classes for the poster + video layer as a unit (e.g. an opacity to
   * darken the backplate). Darken HERE, never on the video alone: a translucent
   * moving video composited over the opaque static poster double-exposes and
   * reads as blur.
   */
  mediaClassName?: string;
  /** Set when /media/<name>-720.{webm,mp4} exist; phones load those instead. */
  hasMobileVariant?: boolean;
}

const HeroVideo = ({
  name,
  overlayClassName,
  videoClassName,
  mediaClassName,
  hasMobileVariant = false,
}: HeroVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let cancelled = false;
    let onError: (() => void) | null = null;
    const start = () => {
      if (cancelled || !el.isConnected) return;
      const small = hasMobileVariant && window.innerWidth < 768;
      const base = `/media/${name}${small ? '-720' : ''}`;

      const play = (src: string) => {
        el.src = src;
        el.muted = true;
        el.load();
        el.play().catch(() => {
          /* autoplay blocked — poster stays visible */
        });
      };

      // Only hero-home ships a .webm; every other hero is mp4-only. Asking for
      // a missing .webm makes the element fire `error` (and the SPA rewrite
      // hands back index.html rather than a 404), which froze every interior
      // hero on its poster. Retry the mp4 on error — the same fallback the
      // original <source> list gave us for free.
      onError = () => {
        if (el.src.endsWith('.mp4')) return; // mp4 failed too: keep the poster
        play(`${base}.mp4`);
      };
      el.addEventListener('error', onError);

      play(el.canPlayType('video/webm; codecs="vp9"') ? `${base}.webm` : `${base}.mp4`);
    };

    if (document.readyState === 'complete') {
      // Yield one frame so the poster/LCP paint commits first.
      requestAnimationFrame(start);
    } else {
      window.addEventListener('load', start, { once: true });
    }
    return () => {
      cancelled = true;
      window.removeEventListener('load', start);
      if (onError) el.removeEventListener('error', onError);
    };
  }, [name, hasMobileVariant]);

  return (
    <div className="absolute inset-0 z-0" aria-hidden="true">
      <div className={`absolute inset-0${mediaClassName ? ` ${mediaClassName}` : ''}`}>
        {/* Poster layer (behind the video): instant paint + reduced-motion fallback */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(/media/${name}-poster.jpg)` }}
          suppressHydrationWarning
        />
        <video
          ref={videoRef}
          className={`hero-video absolute inset-0 h-full w-full object-cover${videoClassName ? ` ${videoClassName}` : ''}`}
          defaultMuted
          loop
          playsInline
          preload="none"
        />
      </div>
      <div
        className={
          overlayClassName ??
          'absolute inset-0 bg-gradient-to-br from-navy-950/90 via-navy-900/75 to-brand-900/50'
        }
      />
    </div>
  );
};

export default HeroVideo;
