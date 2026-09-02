/**
 * NodeField — the signature hero overlay for the Direction A redesign.
 *
 * A deterministic line-and-node SVG field drawn over the right two-thirds of
 * the hero, on top of the darkened video backplate. Three accent nodes are
 * labelled SELL / SUPPORT / MONITOR in JetBrains Mono and pulse in sequence.
 *
 * Determinism matters: node positions are hard-coded (no Math.random) so the
 * prerendered HTML and the hydration render agree. The pulse is pure CSS and
 * is disabled under prefers-reduced-motion via the `motion-reduce:` variant.
 */

const NODES: Array<{ x: number; y: number; r: number; accent?: boolean }> = [
  { x: 60, y: 120, r: 3 },
  { x: 220, y: 70, r: 2 },
  { x: 300, y: 210, r: 4, accent: true }, // SELL
  { x: 430, y: 130, r: 2 },
  { x: 540, y: 60, r: 3 },
  { x: 620, y: 250, r: 4, accent: true }, // SUPPORT
  { x: 720, y: 90, r: 2 },
  { x: 850, y: 180, r: 3 },
  { x: 960, y: 300, r: 4, accent: true }, // MONITOR
  { x: 1050, y: 120, r: 2 },
  { x: 1120, y: 240, r: 3 },
  { x: 250, y: 340, r: 2 },
  { x: 640, y: 380, r: 2 },
  { x: 900, y: 430, r: 3 },
];

// Connectors between node indices (thin hairline strokes).
const LINKS: Array<[number, number]> = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 6],
  [6, 7],
  [7, 8],
  [8, 9],
  [9, 10],
  [0, 3],
  [3, 6],
  [6, 9],
  [2, 11],
  [11, 4],
  [11, 12],
  [5, 12],
  [12, 13],
  [13, 8],
];

const ACCENT_LABELS: Record<number, string> = {
  2: 'SELL',
  5: 'SUPPORT',
  8: 'MONITOR',
};

export default function NodeField({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 500"
      fill="none"
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
    >
      {/* connectors */}
      {LINKS.map(([a, b], i) => (
        <line
          key={i}
          x1={NODES[a].x}
          y1={NODES[a].y}
          x2={NODES[b].x}
          y2={NODES[b].y}
          stroke="#243f70"
          strokeWidth="1"
          opacity="0.5"
        />
      ))}

      {/* regular nodes */}
      {NODES.map((n, i) =>
        n.accent ? null : (
          <circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={n.r}
            fill="#5a84c2"
            opacity="0.55"
          />
        )
      )}

      {/* accent nodes + labels */}
      {NODES.map((n, i) => {
        if (!n.accent) return null;
        const label = ACCENT_LABELS[i];
        return (
          <g key={i}>
            <circle
              cx={n.x}
              cy={n.y}
              r={n.r + 7}
              fill="none"
              stroke="#ff7a1a"
              strokeWidth="1"
              opacity="0.35"
              className="animate-node-pulse motion-reduce:animate-none"
              style={{ animationDelay: `${(i % 3) * 0.85}s` }}
            />
            <circle cx={n.x} cy={n.y} r={n.r} fill="#ff7a1a" />
            <text
              x={n.x}
              y={n.y - 16}
              textAnchor="middle"
              fill="#ff7a1a"
              fontFamily="'JetBrains Mono', monospace"
              fontSize="12"
              letterSpacing="0.08em"
            >
              {label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
