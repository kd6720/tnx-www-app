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
 *
 * DIMMING: darken with the OVERLAY only, never by fading the media layer.
 * Fading the media composites the video against the opaque poster behind it
 * (double exposure, reads as blur) and then the overlay dims what is left a
 * second time. That stacking is what made every hero look like a black box:
 * the video survived at ~10% of its native brightness with almost no visible
 * detail. DEFAULT_OVERLAY below is the single place to tune hero darkness.
 */

/**
 * Scrim over the video. Strong where the copy sits, weak where it doesn't, so
 * the footage stays visible without costing text contrast.
 *
 * Desktop: copy occupies the left ~half, so the scrim ramps left-to-right and
 * releases to 4% at the right edge.
 * Mobile: copy spans the full width, so the scrim is near-uniform with a
 * slightly darker top and bottom.
 *
 * Both were measured from rendered pixels, not eyeballed — the white H1 holds
 * at least 6.39:1 against its own backdrop on every hero at 1440 and 390
 * (AA wants 3:1 for large text, 4.5:1 for body).
 */
const DEFAULT_OVERLAY =
  'absolute inset-0 ' +
  'bg-[linear-gradient(180deg,rgba(10,20,40,0.72)_0%,rgba(10,20,40,0.50)_45%,rgba(10,20,40,0.74)_100%)] ' +
  'md:bg-[linear-gradient(90deg,rgba(10,20,40,0.92)_0%,rgba(10,20,40,0.80)_30%,rgba(10,20,40,0.36)_62%,rgba(10,20,40,0.04)_100%)]';

/**
 * Hero base names that actually have a /media/<name>.webm on disk. Everything
 * else is mp4-only. Keep this in sync when a new webm is encoded — asking for
 * a webm that isn't there does not fail fast: Chrome answers the 404 with
 * `stalled`, never `error`, so the element hangs at readyState 0 and the hero
 * never moves. (That is what froze every interior hero in production.)
 */
const WEBM_AVAILABLE = new Set(['hero-home']);

/**
 * Version stamped into every hero media filename. Public assets are copied
 * verbatim (Vite hashes /src imports only), and Cloudflare caches /public
 * bytes by filename for 604800s — so re-encoding a hero under the same name
 * leaves stale bytes at the edge. Bump this + `git mv` the files whenever a
 * hero asset is re-encoded; the new name forces a fresh fetch.
 */
const ASSET_VERSION = 'v2';

interface HeroVideoProps {
  /** Base name under /media, e.g. "hero-home" → /media/hero-home.v2.mp4 + poster. */
  name: string;
  /** Extra classes for the overlay gradient, if a page needs a different scrim. */
  overlayClassName?: string;
  /** Extra classes for the <video> itself. */
  videoClassName?: string;
  /**
   * Extra classes for the poster + video layer as a unit. Do NOT put an opacity
   * here to darken a hero — that fades the video against the poster behind it
   * and stacks with the overlay. Use overlayClassName instead.
   */
  mediaClassName?: string;
  /** Set when /media/<name>-720.{webm,mp4} exist; phones load those instead. */
  hasMobileVariant?: boolean;
  /** Override the WEBM_AVAILABLE lookup for this instance. Rarely needed. */
  hasWebm?: boolean;
}

const HeroVideo = ({
  name,
  overlayClassName,
  videoClassName,
  mediaClassName,
  hasMobileVariant = false,
  hasWebm,
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
      const base = `/media/${name}${small ? '-720' : ''}.${ASSET_VERSION}`;

      const play = (src: string) => {
        el.src = src;
        el.muted = true;
        el.load();
        el.play().catch(() => {
          /* autoplay blocked — poster stays visible */
        });
      };

      // Safety net only. The real guarantee is that we never request a file
      // that isn't there (see WEBM_AVAILABLE): a 404'd media source stalls
      // forever in Chrome instead of erroring, so this cannot be relied on.
      onError = () => {
        if (el.src.endsWith('.mp4')) return; // mp4 failed too: keep the poster
        play(`${base}.mp4`);
      };
      el.addEventListener('error', onError);

      const webmExists = hasWebm ?? WEBM_AVAILABLE.has(name);
      const useWebm = webmExists && el.canPlayType('video/webm; codecs="vp9"') !== '';
      play(useWebm ? `${base}.webm` : `${base}.mp4`);
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
  }, [name, hasMobileVariant, hasWebm]);

  return (
    <div className="absolute inset-0 z-0" aria-hidden="true">
      <div className={`absolute inset-0${mediaClassName ? ` ${mediaClassName}` : ''}`}>
        {/* Poster layer (behind the video): instant paint + reduced-motion fallback */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(/media/${name}-poster.${ASSET_VERSION}.jpg)` }}
          suppressHydrationWarning
        />
        <video
          ref={videoRef}
          className={`hero-video absolute inset-0 h-full w-full object-cover${videoClassName ? ` ${videoClassName}` : ''}`}
          defaultMuted
          loop
          playsInline
          preload="none"
          poster={`/media/${name}-poster.${ASSET_VERSION}.jpg`}
        />
      </div>
      <div className={overlayClassName ?? DEFAULT_OVERLAY} />
    </div>
  );
};

export default HeroVideo;
