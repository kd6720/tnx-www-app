import { useEffect, useRef } from 'react';

/**
 * Inline, silent, looping product motion piece (e.g. the TNX CRM pipeline
 * animation) shown inside a product frame on a light section.
 *
 * Mirrors HeroVideo's loading discipline so it never competes with the LCP:
 * - the poster paints immediately and stays as the reduced-motion fallback;
 * - the mp4 is attached imperatively, only once the element scrolls near the
 *   viewport, and never before window `load`;
 * - the source is set as a DOM attribute (not React children) so prerendered
 *   HTML and hydration agree.
 *
 * Files live under /media as <name>.<ASSET_VERSION>.mp4 + <name>-poster.<ASSET_VERSION>.jpg.
 * Keep ASSET_VERSION in step with HeroVideo.tsx — same Cloudflare cache rules apply.
 */
const ASSET_VERSION = 'v2';

interface ProductVideoProps {
  /** Base name under /media, e.g. "crm-value". */
  name: string;
  /** Accessible description of what the motion piece shows. */
  label: string;
  className?: string;
}

const ProductVideo = ({ name, label, className }: ProductVideoProps) => {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let cancelled = false;
    let observer: IntersectionObserver | null = null;

    const attach = () => {
      if (cancelled || !el.isConnected || el.src) return;
      el.src = `/media/${name}.${ASSET_VERSION}.mp4`;
      el.muted = true;
      el.load();
      el.play().catch(() => {
        /* autoplay blocked — poster stays visible */
      });
    };

    const arm = () => {
      if (cancelled) return;
      if (!('IntersectionObserver' in window)) {
        attach();
        return;
      }
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            attach();
            observer?.disconnect();
          }
        },
        { rootMargin: '400px 0px' },
      );
      observer.observe(el);
    };

    if (document.readyState === 'complete') {
      requestAnimationFrame(arm);
    } else {
      window.addEventListener('load', arm, { once: true });
    }
    return () => {
      cancelled = true;
      window.removeEventListener('load', arm);
      observer?.disconnect();
    };
  }, [name]);

  return (
    <video
      ref={ref}
      className={`aspect-video w-full bg-canvas object-cover${className ? ` ${className}` : ''}`}
      poster={`/media/${name}-poster.${ASSET_VERSION}.jpg`}
      aria-label={label}
      defaultMuted
      loop
      playsInline
      preload="none"
      width="1920"
      height="1080"
    />
  );
};

export default ProductVideo;
