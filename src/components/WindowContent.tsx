import { useState, type CSSProperties } from 'react';
import type { DesktopIconData } from '../types';
import { Chevron } from './Chevron';
import './WindowContent.css';

interface WindowContentProps {
  icon: DesktopIconData;
}

export function WindowContent({ icon }: WindowContentProps) {
  const { content } = icon;
  const [detailsOpen, setDetailsOpen] = useState(true);
  const [previewOpen, setPreviewOpen] = useState(true);
  const style = {
    '--accent': icon.accent,
    '--accent2': icon.accent2,
    '--dot': icon.accent,
  } as CSSProperties;

  return (
    <div className="wc" style={style}>
      <div className="wc-info-header">
        <div className="wc-info-thumb">
          {icon.image ? <img src={icon.image} alt="" className="wc-info-thumb-img" /> : <span>{icon.glyph}</span>}
        </div>
        <div className="wc-info-heading">
          <h1 className="wc-info-title">{icon.label}</h1>
          <p className="wc-info-subtitle">{content.subtitle}</p>
        </div>
      </div>

      <div className="wc-description">
        {content.body.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

      <button type="button" className="wc-section-header" onClick={() => setDetailsOpen((v) => !v)}>
        <Chevron open={detailsOpen} />
        Details:
      </button>
      {detailsOpen && (
        <div className="wc-section-body">
          <div className="wc-detail-row">
            <span className="wc-detail-label">Type:</span> {content.eyebrow}
          </div>
        </div>
      )}

      <button type="button" className="wc-section-header" onClick={() => setPreviewOpen((v) => !v)}>
        <Chevron open={previewOpen} />
        Preview:
      </button>
      {previewOpen && (
        <div className="wc-section-body wc-preview-body">
          {icon.image && <img src={icon.image} alt="" className="wc-preview-img" />}

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

          {!icon.image && !content.showImageGrid && !content.showVideo && !content.hidePreviewPlaceholder && (
            <div className="wc-preview-placeholder">
              <span>{icon.glyph}</span>
            </div>
          )}

          {content.sections?.map((section, i) => (
            <div className="wc-case-section" key={i}>
              <h2 className="wc-case-heading">{section.heading}</h2>
              {section.body?.map((paragraph, j) => (
                <p key={j} className="wc-case-text">
                  {paragraph}
                </p>
              ))}
              {section.image && <img src={section.image} alt="" className="wc-preview-img" />}
            </div>
          ))}

          {content.closingImage && <img src={content.closingImage} alt="" className="wc-preview-img wc-preview-img-closing" />}

          {content.linkLabel &&
            (content.linkHref ? (
              <a className="wc-link" href={content.linkHref} target="_blank" rel="noopener noreferrer">
                {content.linkLabel} →
              </a>
            ) : (
              <a className="wc-link" href="#" onClick={(e) => e.preventDefault()}>
                {content.linkLabel} →
              </a>
            ))}
        </div>
      )}
    </div>
  );
}
