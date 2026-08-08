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
}

const HeroVideo = ({ name, overlayClassName }: HeroVideoProps) => (
  <div className="absolute inset-0 z-0" aria-hidden="true">
    {/* Poster layer (behind the video): instant paint + reduced-motion fallback */}
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url(/media/${name}-poster.jpg)` }}
    />
    <video
      className="hero-video absolute inset-0 h-full w-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={`/media/${name}-poster.jpg`}
    >
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
