import { useRef, useState } from 'react';
import type { DockAppData, DockAppKind } from '../types';
import instagramImg from '../assets/dock/instagram.webp';
import mailImg from '../assets/dock/mail.webp';
import notesImg from '../assets/dock/notes.png';
import photosImg from '../assets/dock/photos.png';
import trashImg from '../assets/dock/trash.png';
import filesImg from '../assets/dock/files.png';
import { WarningTriangle } from './WarningTriangle';
import './Dock.css';

const MAX_SCALE = 1.45;
const FALLOFF = 34; // px — smaller = sharper drop-off between neighbors

const MONOGRAM_STYLE: Partial<Record<DockAppKind, { background: string; label: string }>> = {
  ps: { background: 'linear-gradient(160deg,#5bc8ff 0%,#001c37 100%)', label: 'Ps' },
};

const APP_IMAGES: Partial<Record<DockAppKind, string>> = {
  instagram: instagramImg,
  mail: mailImg,
  notes: notesImg,
  photos: photosImg,
  trash: trashImg,
  files: filesImg,
};

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
          const isError = app.kind === 'error';
          const monogram = MONOGRAM_STYLE[app.kind];
          const image = APP_IMAGES[app.kind];
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
                <span
                  className={`dock-tile${image ? ' dock-tile-image' : ''}${isTrash ? ' dock-tile-frameless' : ''}${isError ? ' dock-tile-error' : ''}`}
                  style={monogram ? { background: monogram.background } : undefined}
                >
                  {monogram ? (
                    monogram.label
                  ) : isError ? (
                    <WarningTriangle className="dock-tile-warning" />
                  ) : image ? (
                    <img
                      src={image}
                      alt={app.label}
                      className="dock-tile-img-contain"
                    />
                  ) : null}
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
