import { useRef, useState } from 'react';
import type { DockAppData, DockAppKind } from '../types';
import './Dock.css';

const TILE_STYLE: Record<DockAppKind, { background: string; label: string }> = {
  ae: { background: 'linear-gradient(160deg,#b9a9ff 0%,#1a0b57 100%)', label: 'Ae' },
  ps: { background: 'linear-gradient(160deg,#5bc8ff 0%,#001c37 100%)', label: 'Ps' },
  ai: { background: 'linear-gradient(160deg,#ffb27a 0%,#4a1900 100%)', label: 'Ai' },
  notes: { background: 'linear-gradient(160deg,#fff6c9 0%,#d9ab2c 100%)', label: '' },
  photos: { background: 'conic-gradient(from 180deg,#ff5f57,#febc2e,#28c840,#34c8ff,#9999ff,#ff5f57)', label: '' },
  instagram: { background: 'linear-gradient(160deg,#f9ce34 0%,#ee2a7b 55%,#6228d7 100%)', label: '' },
  mail: { background: 'linear-gradient(160deg,#7fd4ff 0%,#0057b8 100%)', label: '' },
  trash: { background: 'linear-gradient(160deg,#e4e4e6 0%,#8b8b90 100%)', label: '' },
};

function TileGlyph({ kind }: { kind: DockAppKind }) {
  switch (kind) {
    case 'notes':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="#4a3400" strokeWidth="2">
          <path d="M5 4h14v16H5z" opacity="0" />
          <path d="M6 8h12M6 12h12M6 16h8" strokeLinecap="round" />
        </svg>
      );
    case 'photos':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
          <circle cx="12" cy="12" r="6" />
        </svg>
      );
    case 'instagram':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
          <rect x="4" y="4" width="16" height="16" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="16.2" cy="7.8" r="0.6" fill="#fff" />
        </svg>
      );
    case 'mail':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
          <rect x="3.5" y="6" width="17" height="12" rx="2" />
          <path d="M4.5 7.5l7.5 6 7.5-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'trash':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="#4a4a4d" strokeWidth="2">
          <path d="M5 7h14M9 7V5h6v2M7 7l1 13h8l1-13" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10 11v5M14 11v5" strokeLinecap="round" />
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
  const dockRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [bouncing, setBouncing] = useState<string | null>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const mouseX = e.clientX;
    for (const app of apps) {
      const el = itemRefs.current[app.id];
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      const center = rect.left + rect.width / 2;
      const distance = Math.abs(mouseX - center);
      const maxDistance = 110;
      const maxScale = 1.6;
      let scale = 1;
      if (distance < maxDistance) {
        scale = 1 + (maxScale - 1) * Math.cos((distance / maxDistance) * (Math.PI / 2));
      }
      el.style.setProperty('--scale', scale.toFixed(3));
    }
  };

  const handleMouseLeave = () => {
    for (const app of apps) {
      itemRefs.current[app.id]?.style.setProperty('--scale', '1');
    }
  };

  const handleClick = (app: DockAppData) => {
    setBouncing(app.id);
    window.setTimeout(() => setBouncing(null), 500);
    onLaunch(app);
  };

  return (
    <div className="dock-wrap">
      <div
        className="dock"
        ref={dockRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {apps.map((app) => {
          const isTrash = app.kind === 'trash';
          const style = TILE_STYLE[app.kind];
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
                <span className="dock-tile" style={{ background: style.background }}>
                  {style.label || <TileGlyph kind={app.kind} />}
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
