import { useRef, type RefObject } from 'react';
import { DesktopIcon } from './DesktopIcon';
import type { DesktopIconData } from '../types';
import './Desktop.css';

interface DesktopProps {
  icons: DesktopIconData[];
  onOpenIcon: (icon: DesktopIconData, rect: DOMRect | null) => void;
}

export function Desktop({ icons, onOpenIcon }: DesktopProps) {
  const containerRef: RefObject<HTMLDivElement | null> = useRef(null);

  return (
    <div className="desktop" ref={containerRef}>
      <div className="desktop-wallpaper" />
      <div className="desktop-vignette" />
      <div className="desktop-icons">
        {icons.map((icon) => (
          <DesktopIcon key={icon.id} data={icon} containerRef={containerRef} onOpen={onOpenIcon} />
        ))}
      </div>
    </div>
  );
}
