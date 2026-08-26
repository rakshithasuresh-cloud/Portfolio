import type { CSSProperties } from 'react';
import type { DesktopIconData } from '../types';
import './WindowContent.css';

interface WindowContentProps {
  icon: DesktopIconData;
}

// matches each shape's real image proportions (see TILE_SIZE in DesktopIcon.tsx)
// so the cover box fits the actual picture instead of a fixed placeholder ratio
const COVER_ASPECT: Partial<Record<DesktopIconData['shape'], number>> = {
  photo: 96 / 96,
  poster: 96 / 128,
  strip: 80 / 237,
  widget: 216 / 104,
};

export function WindowContent({ icon }: WindowContentProps) {
  const { content } = icon;
  const style = {
    '--accent': icon.accent,
    '--accent2': icon.accent2,
    '--dot': icon.accent,
  } as CSSProperties;
  const coverStyle = icon.image ? { aspectRatio: COVER_ASPECT[icon.shape] ?? 16 / 9 } : undefined;

  return (
    <div className="wc" style={style}>
      <div className="wc-eyebrow">
        <span className="wc-eyebrow-dot" />
        {content.eyebrow}
      </div>
      <h1 className="wc-title">{icon.label}</h1>
      <p className="wc-subtitle">{content.subtitle}</p>

      <div className="wc-cover" style={coverStyle}>
        {icon.image ? (
          <img src={icon.image} alt="" className="wc-cover-img" />
        ) : (
          <>
            <span className="wc-cover-glyph">{icon.glyph}</span>
            <span className="wc-cover-tag">Placeholder cover</span>
          </>
        )}
      </div>

      <div className="wc-body">
        {content.body.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

      {content.showImageGrid && (
        <div className="wc-grid">
          {[0, 1, 2].map((i) => (
            <div className="wc-grid-tile" key={i}>
              <span className="wc-grid-tile-mark">{icon.glyph}</span>
            </div>
          ))}
        </div>
      )}

      {content.showVideo && (
        <div className="wc-video">
          <span className="wc-play">▶</span>
        </div>
      )}

      {content.linkLabel && (
        <a
          className="wc-link"
          href="#"
          onClick={(e) => e.preventDefault()}
        >
          {content.linkLabel} →
        </a>
      )}
    </div>
  );
}
