import { useRef, useState, type RefObject } from 'react';
import type { CSSProperties } from 'react';
import { useDrag } from '../hooks/useDrag';
import type { DesktopIconData } from '../types';
import './DesktopIcon.css';

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

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
    onClick: () => {
      const rect = buttonRef.current?.getBoundingClientRect() ?? null;
      onOpen(data, rect);
    },
  });

  const style = {
    left: `${pos.x}%`,
    top: `${pos.y}%`,
    '--accent': data.accent,
    '--accent2': data.accent2,
  } as CSSProperties;

  return (
    <button
      ref={buttonRef}
      type="button"
      className={`desktop-icon${dragging ? ' is-dragging' : ''}`}
      style={style}
      onPointerDown={drag.onPointerDown}
      onPointerMove={drag.onPointerMove}
      onPointerUp={drag.onPointerUp}
      aria-label={`Open ${data.label}`}
    >
      <span className="desktop-icon-tile">
        <span className="desktop-icon-mark">{data.glyph}</span>
      </span>
      <span className="desktop-icon-label">{data.label}</span>
    </button>
  );
}
