import { useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * Scroll-reveal wrapper: fades content up the first time it enters the
 * viewport. Renders fully visible when JavaScript is unavailable, during
 * react-snap pre-rendering, and for prefers-reduced-motion users — the
 * animation is purely progressive enhancement.
 */
interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger delay in ms */
  delay?: number;
}

const canAnimate = () =>
  typeof window !== 'undefined' &&
  'IntersectionObserver' in window &&
  !navigator.userAgent.includes('ReactSnap') &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const Reveal = ({ children, className = '', delay = 0 }: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<'static' | 'pending' | 'in'>('static');

  useEffect(() => {
    if (!canAnimate() || !ref.current) return;
    const el = ref.current;
    // Only hide elements that are still below the fold at mount.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) return;
    setState('pending');
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          window.setTimeout(() => setState('in'), delay);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  const motion =
    state === 'pending'
      ? 'opacity-0 translate-y-6'
      : state === 'in'
        ? 'opacity-100 translate-y-0 transition-all duration-700 ease-out'
        : '';

  return (
    <div ref={ref} className={`${motion} ${className}`.trim()}>
      {children}
    </div>
  );
};

export default Reveal;
