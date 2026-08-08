import { useEffect, useRef, useState } from 'react';

/**
 * Count-up stat: animates the leading number in values like "25+", "12M+",
 * "50%", "24/7" the first time it scrolls into view. Static everywhere
 * animation isn't appropriate (no JS, react-snap, reduced motion).
 */
interface StatValueProps {
  value: string;
  className?: string;
}

const StatValue = ({ value, className }: StatValueProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const match = value.match(/^(\d+)(.*)$/);
    if (
      !match ||
      typeof window === 'undefined' ||
      !('IntersectionObserver' in window) ||
      navigator.userAgent.includes('ReactSnap') ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !ref.current
    )
      return;

    const target = parseInt(match[1], 10);
    const suffix = match[2];
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        const duration = 1200;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          // ease-out cubic
          const eased = 1 - Math.pow(1 - t, 3);
          setDisplay(`${Math.round(target * eased)}${suffix}`);
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
};

export default StatValue;
