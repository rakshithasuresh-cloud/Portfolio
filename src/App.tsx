import { useCallback, useRef, useState } from 'react';
import './App.css';
import { MenuBar } from './components/MenuBar';
import { Desktop } from './components/Desktop';
import { Dock } from './components/Dock';
import { Window } from './components/Window';
import { WindowContent } from './components/WindowContent';
import { AppPlaceholderContent } from './components/AppPlaceholderContent';
import { ErrorDialogContent } from './components/ErrorDialogContent';
import { NotesInfoContent } from './components/NotesInfoContent';
import { desktopIcons } from './data/icons';
import { dockApps } from './data/dockApps';
import type { DesktopIconData, DockAppData, WindowState } from './types';

const DEFAULT_W = 560;
const DEFAULT_H = 480;
const OWNER_NAME = 'Rakshitha Suresh';
const OWNER_EMAIL = 'rakswork7@gmail.com';

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function App() {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [closingIds, setClosingIds] = useState<Set<string>>(new Set());
  const zRef = useRef(100);
  const spawnCount = useRef(0);

  const nextZ = () => {
    zRef.current += 1;
    return zRef.current;
  };

  const computeSpawnRect = (originRect: DOMRect | null, width = DEFAULT_W, height = DEFAULT_H) => {
    const cascade = spawnCount.current % 6;
    spawnCount.current += 1;
    const x = clamp(window.innerWidth / 2 - width / 2 + cascade * 26 - 65, 30, window.innerWidth - width - 30);
    const y = clamp(window.innerHeight / 2 - height / 2 + cascade * 20 - 50, 44, window.innerHeight - height - 100);
    let originX = 50;
    let originY = 50;
    if (originRect) {
      originX = clamp(((originRect.left + originRect.width / 2 - x) / width) * 100, -40, 140);
      originY = clamp(((originRect.top + originRect.height / 2 - y) / height) * 100, -40, 140);
    }
    return { x, y, width, height, originX, originY };
  };

  const openIconWindow = useCallback((icon: DesktopIconData, originRect: DOMRect | null) => {
    setWindows((ws) => {
      const existing = ws.find((w) => w.iconId === icon.id);
      if (existing) {
        return ws.map((w) => (w.id === existing.id ? { ...w, minimized: false, zIndex: nextZ() } : w));
      }
      const rect = computeSpawnRect(originRect);
      const win: WindowState = {
        id: `icon-${icon.id}-${Date.now()}`,
        iconId: icon.id,
        title: icon.label,
        ...rect,
        zIndex: nextZ(),
        minimized: false,
        maximized: false,
        icon,
      };
      return [...ws, win];
    });
  }, []);

  const launchApp = useCallback((app: DockAppData) => {
    const key = `app-${app.id}`;
    setWindows((ws) => {
      const existing = ws.find((w) => w.iconId === key);
      if (existing) {
        return ws.map((w) => (w.id === existing.id ? { ...w, minimized: false, zIndex: nextZ() } : w));
      }
      const width = app.kind === 'error' ? 440 : app.kind === 'notes' ? 640 : 380;
      const height = app.kind === 'error' ? 190 : app.kind === 'notes' ? 460 : 220;
      const rect = computeSpawnRect(null, width, height);
      const title =
        app.kind === 'error'
          ? 'Adobe Error'
          : app.kind === 'notes'
            ? `Information about: ${OWNER_NAME}, ${OWNER_EMAIL}`
            : app.label;
      const win: WindowState = {
        id: `${key}-${Date.now()}`,
        iconId: key,
        title,
        ...rect,
        zIndex: nextZ(),
        minimized: false,
        maximized: false,
        app,
      };
      return [...ws, win];
    });
  }, []);

  const closeWindow = useCallback((id: string) => {
    setClosingIds((prev) => new Set(prev).add(id));
    window.setTimeout(() => {
      setWindows((ws) => ws.filter((w) => w.id !== id));
      setClosingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, 160);
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, minimized: true } : w)));
  }, []);

  const restoreWindow = useCallback((id: string) => {
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, minimized: false, zIndex: nextZ() } : w)));
  }, []);

  const toggleZoom = useCallback((id: string) => {
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, maximized: !w.maximized } : w)));
  }, []);

  const focusWindow = useCallback((id: string) => {
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, zIndex: nextZ() } : w)));
  }, []);

  const moveWindow = useCallback((id: string, dx: number, dy: number) => {
    setWindows((ws) =>
      ws.map((w) => {
        if (w.id !== id) return w;
        const x = clamp(w.x + dx, -w.width + 140, window.innerWidth - 140);
        const y = clamp(w.y + dy, 32, window.innerHeight - 60);
        return { ...w, x, y };
      }),
    );
  }, []);

  const resizeWindow = useCallback((id: string, dw: number, dh: number) => {
    setWindows((ws) =>
      ws.map((w) => {
        if (w.id !== id) return w;
        const width = clamp(w.width + dw, 340, Math.min(1100, window.innerWidth - 60));
        const height = clamp(w.height + dh, 240, Math.min(820, window.innerHeight - 100));
        return { ...w, width, height };
      }),
    );
  }, []);

  const minimizedWindows = windows.filter((w) => w.minimized);

  return (
    <div className="app-root">
      <MenuBar appName={OWNER_NAME} />
      <Desktop icons={desktopIcons} onOpenIcon={openIconWindow} />

      {windows.map((win) => (
        <Window
          key={win.id}
          win={win}
          isClosing={closingIds.has(win.id)}
          bare={win.app?.kind === 'error'}
          onClose={closeWindow}
          onMinimize={minimizeWindow}
          onToggleZoom={toggleZoom}
          onFocus={focusWindow}
          onMove={moveWindow}
          onResize={resizeWindow}
        >
          {win.icon ? (
            <WindowContent icon={win.icon} />
          ) : win.app?.kind === 'error' ? (
            <ErrorDialogContent onTryAgain={() => closeWindow(win.id)} />
          ) : win.app?.kind === 'notes' ? (
            <NotesInfoContent />
          ) : win.app ? (
            <AppPlaceholderContent app={win.app} />
          ) : null}
        </Window>
      ))}

      {minimizedWindows.length > 0 && (
        <div className="minimized-tray">
          {minimizedWindows.map((w) => (
            <button key={w.id} type="button" className="minimized-chip" onClick={() => restoreWindow(w.id)}>
              <span className="minimized-chip-dot" style={{ background: w.icon?.accent ?? '#8a8a8f' }} />
              {w.title}
            </button>
          ))}
        </div>
      )}

      <Dock apps={dockApps} onLaunch={launchApp} />
    </div>
  );
}

export default App;
