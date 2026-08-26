import { useState, type CSSProperties } from 'react';
import { Chevron } from './Chevron';
import photosImg from '../assets/dock/photos.png';
import './WindowContent.css';

const PLACEHOLDER_STYLE = {
  '--accent': '#c9c9cf',
  '--accent2': '#8f8f98',
} as CSSProperties;

export function PhotosAppContent() {
  const [recentsOpen, setRecentsOpen] = useState(true);

  return (
    <div className="wc">
      <div className="wc-info-header">
        <div className="wc-info-thumb">
          <img src={photosImg} alt="" className="wc-info-thumb-img" />
        </div>
        <div className="wc-info-heading">
          <h1 className="wc-info-title">Photos</h1>
          <p className="wc-info-subtitle">Shot on Fujifilm X100VI</p>
        </div>
      </div>

      <button type="button" className="wc-section-header" onClick={() => setRecentsOpen((v) => !v)}>
        <Chevron open={recentsOpen} />
        Recents:
      </button>
      {recentsOpen && (
        <div className="wc-section-body wc-preview-body" style={PLACEHOLDER_STYLE}>
          <div className="wc-grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <div className="wc-grid-tile" key={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
