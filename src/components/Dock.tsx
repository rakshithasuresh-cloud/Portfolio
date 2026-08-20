import { useRef, useState } from 'react';
import type { DockAppData, DockAppKind } from '../types';
import instagramImg from '../assets/dock/instagram.webp';
import mailImg from '../assets/dock/mail.webp';
import notesImg from '../assets/dock/notes.png';
import photosImg from '../assets/dock/photos.png';
import trashImg from '../assets/dock/trash.png';
import filesImg from '../assets/dock/files.png';
import linkedinImg from '../assets/dock/linkedin.webp';
import { WarningTriangle } from './WarningTriangle';
import './Dock.css';

const MAX_SCALE = 1.45;
const FALLOFF = 34; // px — smaller = sharper drop-off between neighbors

const APP_IMAGES: Partial<Record<DockAppKind, string>> = {
  instagram: instagramImg,
  mail: mailImg,
  notes: notesImg,
  photos: photosImg,
  trash: trashImg,
  files: filesImg,
  linkedin: linkedinImg,
};

// these three ship as art with real padding baked into their own canvas
// (a bin silhouette, a folder, a hand-drawn triangle) rather than full-bleed
// squares, so they get no tile background/clipping and a bit more room to
// render at the same visual size as the other icons.
const FRAMELESS: Partial<Record<DockAppKind, true>> = { trash: true, error: true, files: true };

const COMPACT: Partial<Record<DockAppKind, true>> = {
  notes: true,
  linkedin: true,
  photos: true,
  instagram: true,
  mail: true,
};

const DIVIDER_BEFORE: Partial<Record<DockAppKind, true>> = {
  linkedin: true,
  mail: true,
  trash: true,
};

interface DockProps {
  apps: DockAppData[];
  onLaunch: (app: DockAppData) => void;
}

export function Dock({ apps, onLaunch }: DockProps) {
  const [bouncing, setBouncing] = useState<string | null>(null);
  const dockRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLElement | null>>({});

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
    if (!app.href) onLaunch(app);
    // href apps navigate natively via the <a> element below — a real
    // anchor click is a more reliable "open in a new tab" than a JS
    // window.open() call, which some sandboxes/popup blockers refuse.
  };

  return (
    <div className="dock-wrap">
      <div className="dock" ref={dockRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
        {apps.map((app) => {
          const isTrash = app.kind === 'trash';
          const isError = app.kind === 'error';
          const isFrameless = FRAMELESS[app.kind];
          const isCompact = COMPACT[app.kind];
          const image = APP_IMAGES[app.kind];

          const inner = (
            <>
              <span className="dock-tooltip">{app.label}</span>
              <span
                className={`dock-tile${image ? ' dock-tile-image' : ''}${isFrameless ? ' dock-tile-frameless' : ''}${isCompact ? ' dock-tile-compact' : ''}`}
              >
                {isError ? (
                  <WarningTriangle className="dock-tile-warning" />
                ) : image ? (
                  <img
                    src={image}
                    alt={app.label}
                    className={
                      isFrameless
                        ? `dock-tile-img-frameless${app.kind === 'files' ? ' dock-tile-img-frameless-files' : ''}${isTrash ? ' dock-tile-img-frameless-trash' : ''}`
                        : 'dock-tile-img-contain'
                    }
                  />
                ) : null}
              </span>
              <span className="dock-dot" />
            </>
          );

          return (
            <div key={app.id} style={{ display: 'contents' }}>
              {DIVIDER_BEFORE[app.kind] && <div className="dock-divider" />}
              {app.href ? (
                <a
                  ref={(el) => {
                    itemRefs.current[app.id] = el;
                  }}
                  href={app.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`dock-item${bouncing === app.id ? ' is-bouncing' : ''}${isTrash ? ' dock-item-anchor-bottom' : ''}`}
                  onClick={() => handleClick(app)}
                  aria-label={app.label}
                >
                  {inner}
                </a>
              ) : (
                <button
                  type="button"
                  ref={(el) => {
                    itemRefs.current[app.id] = el;
                  }}
                  className={`dock-item${bouncing === app.id ? ' is-bouncing' : ''}${isTrash ? ' dock-item-anchor-bottom' : ''}`}
                  onClick={() => handleClick(app)}
                  aria-label={app.label}
                >
                  {inner}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
