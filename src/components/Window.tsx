import { type ReactNode } from 'react';
import { useDrag } from '../hooks/useDrag';
import type { WindowState } from '../types';
import './Window.css';

interface WindowProps {
  win: WindowState;
  children: ReactNode;
  isClosing?: boolean;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onToggleZoom: (id: string) => void;
  onFocus: (id: string) => void;
  onMove: (id: string, dx: number, dy: number) => void;
  onResize: (id: string, dw: number, dh: number) => void;
}

export function Window({
  win,
  children,
  isClosing,
  onClose,
  onMinimize,
  onToggleZoom,
  onFocus,
  onMove,
  onResize,
}: WindowProps) {
  const dragTitle = useDrag({
    onStart: () => onFocus(win.id),
    onMove: (dx, dy) => {
      if (!win.maximized) onMove(win.id, dx, dy);
    },
  });

  const dragResize = useDrag({
    onStart: () => onFocus(win.id),
    onMove: (dx, dy) => {
      if (!win.maximized) onResize(win.id, dx, dy);
    },
  });

  const style = win.maximized
    ? {
        left: 12,
        top: 'calc(var(--menubar-h) + 10px)',
        width: 'calc(100vw - 24px)',
        height: 'calc(100vh - var(--menubar-h) - var(--dock-h) - 26px)',
        zIndex: win.zIndex,
        display: win.minimized ? 'none' : 'flex',
        transformOrigin: `${win.originX}% ${win.originY}%`,
      }
    : {
        left: win.x,
        top: win.y,
        width: win.width,
        height: win.height,
        zIndex: win.zIndex,
        display: win.minimized ? 'none' : 'flex',
        transformOrigin: `${win.originX}% ${win.originY}%`,
      };

  return (
    <section
      className={`mac-window${isClosing ? ' is-closing' : ''}`}
      style={style}
      onPointerDown={() => onFocus(win.id)}
      role="dialog"
      aria-label={win.title}
    >
      <header
        className="mac-window-titlebar"
        onPointerDown={(e) => {
          if ((e.target as HTMLElement).closest('.mac-traffic-btn')) return;
          dragTitle.onPointerDown(e);
        }}
        onPointerMove={dragTitle.onPointerMove}
        onPointerUp={dragTitle.onPointerUp}
        onDoubleClick={() => onToggleZoom(win.id)}
      >
        <div className="mac-window-traffic">
          <button
            type="button"
            className="mac-traffic-btn close"
            onClick={() => onClose(win.id)}
            aria-label="Close window"
          >
            <svg viewBox="0 0 8 8" width="7" height="7">
              <path d="M1.3 1.3L6.7 6.7M6.7 1.3L1.3 6.7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </button>
          <button
            type="button"
            className="mac-traffic-btn minimize"
            onClick={() => onMinimize(win.id)}
            aria-label="Minimize window"
          >
            <svg viewBox="0 0 8 8" width="7" height="7">
              <path d="M1.2 4H6.8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </button>
          <button
            type="button"
            className="mac-traffic-btn zoom"
            onClick={() => onToggleZoom(win.id)}
            aria-label="Zoom window"
          >
            <svg viewBox="0 0 8 8" width="7" height="7">
              <path
                d="M1.3 5.1V6.7H2.9M6.7 2.9V1.3H5.1"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </button>
        </div>
        <span className="mac-window-title">{win.title}</span>
      </header>
      <div className="mac-window-body">{children}</div>
      {!win.maximized && (
        <div
          className="mac-window-resize"
          onPointerDown={dragResize.onPointerDown}
          onPointerMove={dragResize.onPointerMove}
          onPointerUp={dragResize.onPointerUp}
        />
      )}
    </section>
  );
}
