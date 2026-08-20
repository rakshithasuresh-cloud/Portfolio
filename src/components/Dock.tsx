import { useRef, useState } from 'react';
import type { DockAppData, DockAppKind } from '../types';
import './Dock.css';

const MAX_SCALE = 1.45;
const FALLOFF = 34; // px — smaller = sharper drop-off between neighbors

const MONOGRAM_STYLE: Partial<Record<DockAppKind, { background: string; label: string }>> = {
  ae: { background: 'linear-gradient(160deg,#b9a9ff 0%,#1a0b57 100%)', label: 'Ae' },
  ps: { background: 'linear-gradient(160deg,#5bc8ff 0%,#001c37 100%)', label: 'Ps' },
  ai: { background: 'linear-gradient(160deg,#ffb27a 0%,#4a1900 100%)', label: 'Ai' },
};

const PHOTOS_PETALS = ['#ff5b4d', '#ff9500', '#ffcc00', '#8fd14f', '#28c78f', '#2eb1e0', '#7a6ff0', '#e0559f'];

function TileGlyph({ kind }: { kind: DockAppKind }) {
  switch (kind) {
    case 'notes':
      return (
        <svg viewBox="0 0 48 48">
          <rect width="48" height="48" fill="#fdfaf1" />
          <rect width="48" height="14" fill="#f4c531" />
          <line x1="0" y1="14" x2="48" y2="14" stroke="#d9ab2c" strokeWidth="1" strokeDasharray="1.8 2.4" />
          <line x1="9" y1="26" x2="39" y2="26" stroke="#cdc8bd" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="9" y1="33" x2="29" y2="33" stroke="#cdc8bd" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );
    case 'photos':
      return (
        <svg viewBox="0 0 48 48">
          <rect width="48" height="48" fill="#ffffff" />
          <g transform="translate(24,24)">
            {PHOTOS_PETALS.map((c, i) => (
              <ellipse
                key={c}
                cx="0"
                cy="-8.6"
                rx="5.6"
                ry="8.8"
                fill={c}
                opacity="0.92"
                transform={`rotate(${(360 / PHOTOS_PETALS.length) * i})`}
              />
            ))}
          </g>
          <circle cx="24" cy="24" r="3.2" fill="#fff" />
        </svg>
      );
    case 'instagram':
      return (
        <svg viewBox="0 0 48 48">
          <defs>
            <radialGradient id="ig-grad" cx="30%" cy="107%" r="150%">
              <stop offset="0%" stopColor="#fdf497" />
              <stop offset="15%" stopColor="#fdf497" />
              <stop offset="45%" stopColor="#fd5949" />
              <stop offset="60%" stopColor="#d6249f" />
              <stop offset="90%" stopColor="#285aeb" />
            </radialGradient>
          </defs>
          <rect width="48" height="48" fill="url(#ig-grad)" />
          <rect x="13" y="13" width="22" height="22" rx="7" fill="none" stroke="#fff" strokeWidth="2.4" />
          <circle cx="24" cy="24" r="6.2" fill="none" stroke="#fff" strokeWidth="2.4" />
          <circle cx="32.3" cy="15.7" r="1.6" fill="#fff" />
        </svg>
      );
    case 'mail':
      return (
        <svg viewBox="0 0 48 48">
          <defs>
            <linearGradient id="mail-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8fd8ff" />
              <stop offset="100%" stopColor="#0a6fd6" />
            </linearGradient>
          </defs>
          <rect width="48" height="48" fill="url(#mail-grad)" />
          <rect x="8" y="15" width="32" height="21" rx="3.5" fill="#fff" opacity="0.97" />
          <path d="M8 17L24 28L40 17" fill="none" stroke="#2a7fd1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'trash':
      return (
        <svg viewBox="0 0 48 48">
          <rect width="48" height="48" fill="#f3f3f1" />
          <rect x="17" y="10" width="7" height="9" rx="1" fill="#ffb4a8" transform="rotate(-12 20.5 14.5)" />
          <rect x="24" y="9" width="7" height="9" rx="1" fill="#8fd1ff" transform="rotate(10 27.5 13.5)" />
          <path
            d="M14 20h20l-2.2 19a3 3 0 01-3 2.6H19.2a3 3 0 01-3-2.6L14 20z"
            fill="#e4e4e1"
            stroke="#b9b9b6"
            strokeWidth="1"
          />
          <rect x="12.5" y="17" width="23" height="3.4" rx="1.5" fill="#d8d8d5" stroke="#b9b9b6" strokeWidth="0.6" />
          <line x1="20" y1="24" x2="21.2" y2="37" stroke="#b9b9b6" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="24" y1="24" x2="24" y2="37" stroke="#b9b9b6" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="28" y1="24" x2="26.8" y2="37" stroke="#b9b9b6" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}

interface DockProps {
  apps: DockAppData[];
  onLaunch: (app: DockAppData) => void;
}

export function Dock({ apps, onLaunch }: DockProps) {
  const [bouncing, setBouncing] = useState<string | null>(null);
  const dockRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const handleMouseMove = (e: React.MouseEvent) => {
    const dockRect = dockRef.current?.getBoundingClientRect();
    if (!dockRect) return;
    const mouseX = e.clientX - dockRect.left;
    for (const app of apps) {
      const el = itemRefs.current[app.id];
      if (!el) continue;
      // offsetLeft/offsetWidth are layout values, unaffected by the transform
      // this loop itself applies — so the falloff never feeds back on itself.
      const center = el.offsetLeft + el.offsetWidth / 2;
      const distance = Math.abs(mouseX - center);
      const scale = 1 + (MAX_SCALE - 1) * Math.exp(-(distance * distance) / (2 * FALLOFF * FALLOFF));
      el.style.setProperty('--scale', scale.toFixed(3));
      el.style.zIndex = String(Math.round(scale * 100));
    }
  };

  const handleMouseLeave = () => {
    for (const app of apps) {
      const el = itemRefs.current[app.id];
      el?.style.setProperty('--scale', '1');
      if (el) el.style.zIndex = '1';
    }
  };

  const handleClick = (app: DockAppData) => {
    setBouncing(app.id);
    window.setTimeout(() => setBouncing(null), 500);
    if (app.href) {
      window.open(app.href, '_blank', 'noopener,noreferrer');
      return;
    }
    onLaunch(app);
  };

  return (
    <div className="dock-wrap">
      <div className="dock" ref={dockRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
        {apps.map((app) => {
          const isTrash = app.kind === 'trash';
          const monogram = MONOGRAM_STYLE[app.kind];
          return (
            <div key={app.id} style={{ display: 'contents' }}>
              {isTrash && <div className="dock-divider" />}
              <button
                type="button"
                ref={(el) => {
                  itemRefs.current[app.id] = el;
                }}
                className={`dock-item${bouncing === app.id ? ' is-bouncing' : ''}`}
                onClick={() => handleClick(app)}
                aria-label={app.label}
              >
                <span className="dock-tooltip">{app.label}</span>
                <span className="dock-tile" style={monogram ? { background: monogram.background } : undefined}>
                  {monogram ? monogram.label : <TileGlyph kind={app.kind} />}
                </span>
                <span className="dock-dot" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
