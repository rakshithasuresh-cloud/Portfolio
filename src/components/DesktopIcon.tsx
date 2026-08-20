import { useRef, useState, type RefObject } from 'react';
import type { CSSProperties } from 'react';
import { useDrag } from '../hooks/useDrag';
import type { DesktopIconData } from '../types';
import './DesktopIcon.css';

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

const TILE_SIZE: Record<DesktopIconData['shape'], { w: number; h: number }> = {
  square: { w: 74, h: 74 },
  portrait: { w: 62, h: 86 },
  landscape: { w: 94, h: 62 },
  // sized like a macOS medium widget — notably bigger than a regular icon
  widget: { w: 264, h: 126 },
  // matches the real 3:4 aspect of the cover art so it never gets cropped
  poster: { w: 86, h: 115 },
  // matches the real ~0.337:1 aspect of the photobooth strip
  strip: { w: 80, h: 237 },
};

// these ship as full posed images with their own real aspect ratio — scale
// to fit inside the tile instead of cropping to fill it
const CONTAIN_SHAPES = new Set<DesktopIconData['shape']>(['poster', 'strip']);

interface DesktopIconProps {
  data: DesktopIconData;
  containerRef: RefObject<HTMLDivElement | null>;
  onOpen: (data: DesktopIconData, originRect: DOMRect | null) => void;
}

export function DesktopIcon({ data, containerRef, onOpen }: DesktopIconProps) {
  const [pos, setPos] = useState({ x: data.x, y: data.y });
  const [dragging, setDragging] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const drag = useDrag({
    onStart: () => setDragging(true),
    onMove: (dx, dy) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      setPos((p) => ({
        x: clamp(p.x + (dx / rect.width) * 100, 3, 96),
        y: clamp(p.y + (dy / rect.height) * 100, 6, 90),
      }));
    },
    onEnd: () => setDragging(false),
    onClick: data.notOpenable
      ? undefined
      : () => {
          const rect = buttonRef.current?.getBoundingClientRect() ?? null;
          onOpen(data, rect);
        },
  });

  const size = TILE_SIZE[data.shape];
  const style = {
    left: `${pos.x}%`,
    top: `${pos.y}%`,
    '--accent': data.accent,
    '--accent2': data.accent2,
    '--tile-w': `${size.w}px`,
    '--tile-h': `${size.h}px`,
  } as CSSProperties;
  const tileStyle = data.image
    ? ({
        backgroundImage: `url(${data.image})`,
        backgroundSize: CONTAIN_SHAPES.has(data.shape) ? 'contain' : 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      } as CSSProperties)
    : undefined;

  return (
    <button
      ref={buttonRef}
      type="button"
      className={`desktop-icon${dragging ? ' is-dragging' : ''}`}
      style={style}
      onPointerDown={drag.onPointerDown}
      onPointerMove={drag.onPointerMove}
      onPointerUp={drag.onPointerUp}
      aria-label={data.notOpenable ? data.label : `Open ${data.label}`}
    >
      <span className={`desktop-icon-tile${data.shape === 'widget' ? ' desktop-icon-tile-widget' : ''}`} style={tileStyle}>
        {!data.image && <span className="desktop-icon-mark">{data.glyph}</span>}
      </span>
      {!data.hideLabel && <span className="desktop-icon-label">{data.label}</span>}
    </button>
  );
}
