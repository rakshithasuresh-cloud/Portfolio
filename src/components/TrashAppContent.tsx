import { useState } from 'react';
import { Chevron } from './Chevron';
import trashImg from '../assets/dock/trash.png';
import binPhotoImg from '../assets/desktop/bin-photo.jpg';
import binPosterImg from '../assets/desktop/bin-poster.jpg';
import binBehind1Img from '../assets/desktop/bin-behind-1.jpg';
import binBehind2Img from '../assets/desktop/bin-behind-2.jpg';
import binBehind3Img from '../assets/desktop/bin-behind-3.jpg';
import './WindowContent.css';

const BEHIND_THE_SCENES = [binBehind1Img, binBehind2Img, binBehind3Img];

export function TrashAppContent() {
  const [previewOpen, setPreviewOpen] = useState(true);

  return (
    <div className="wc">
      <div className="wc-info-header">
        <div className="wc-info-thumb">
          <img src={trashImg} alt="" className="wc-info-thumb-img" />
        </div>
        <div className="wc-info-heading">
          <h1 className="wc-info-title">Bin</h1>
          <p className="wc-info-subtitle">Behind the scenes</p>
        </div>
      </div>

      <button type="button" className="wc-section-header" onClick={() => setPreviewOpen((v) => !v)}>
        <Chevron open={previewOpen} />
        Preview:
      </button>
      {previewOpen && (
        <div className="wc-section-body wc-preview-body">
          <img src={binPhotoImg} alt="" className="wc-preview-img" />
          <p className="wc-caption">Typography for a music video Kacperczyk x Kinny Zimmer – Nieprzespane Noce</p>
          <img src={binPosterImg} alt="" className="wc-preview-img" />

          <div className="wc-grid">
            {BEHIND_THE_SCENES.map((src, i) => (
              <div className="wc-photo-tile" key={i}>
                <img src={src} alt="" className="wc-photo-tile-img" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
