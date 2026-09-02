/**
 * Full-bleed looping background video for hero sections.
 *
 * - Autoplay/muted/playsInline/loop so mobile browsers allow playback.
 * - Poster layer paints immediately (LCP) and remains the fallback when
 *   the video can't play or the user prefers reduced motion
 *   (see .hero-video rules in index.css).
 * - All copy stays in HTML on top of this component — never in the video.
 */
interface HeroVideoProps {
  /** Base name under /media, e.g. "hero-home" → /media/hero-home.mp4 + poster. */
  name: string;
  /** Extra classes for the overlay gradient, if a page needs a different scrim. */
  overlayClassName?: string;
  /** Extra classes for the <video> itself (e.g. opacity to darken the backplate). */
  videoClassName?: string;
}

const HeroVideo = ({ name, overlayClassName, videoClassName }: HeroVideoProps) => (
  <div className="absolute inset-0 z-0" aria-hidden="true">
    {/* Poster layer (behind the video): instant paint + reduced-motion fallback */}
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url(/media/${name}-poster.jpg)` }}
    />
    <video
      className={`hero-video absolute inset-0 h-full w-full object-cover ${videoClassName ?? ''}`}
      autoPlay
      defaultMuted
      loop
      playsInline
      preload="none"
      poster={`/media/${name}-poster.jpg`}
      // `defaultMuted` writes the muted attribute so the prerendered HTML and
      // hydration agree (the controlled `muted` prop is set as a property and
      // isn't serialized). Keep the imperative set too so autoplay stays legal
      // in the pre-hydration window.
      ref={(el) => {
        if (el) el.muted = true;
      }}
    >
      <source src={`/media/${name}.webm`} type="video/webm" />
      <source src={`/media/${name}.mp4`} type="video/mp4" />
    </video>
    <div
      className={
        overlayClassName ??
        'absolute inset-0 bg-gradient-to-br from-navy-950/90 via-navy-900/75 to-brand-900/50'
      }
    />
  </div>
);

export default HeroVideo;
