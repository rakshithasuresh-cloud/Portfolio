import { useState } from 'react';
import { Chevron } from './Chevron';
import trashImg from '../assets/dock/trash.png';
import binPhotoImg from '../assets/desktop/bin-photo.jpg';
import binPosterImg from '../assets/desktop/bin-poster.jpg';
import './WindowContent.css';

export function TrashAppContent() {
  const [previewOpen, setPreviewOpen] = useState(true);

  return (
    <div className="wc">
      <div className="wc-info-header">
        <div className="wc-info-thumb">
          <img src={trashImg} alt="" className="wc-info-thumb-img" />
        </div>
        <div className="wc-info-heading">
          <h1 className="wc-info-title">Bin of ideas</h1>
          <p className="wc-info-subtitle">Unrelated yet cool selection</p>
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
        </div>
      )}
    </div>
  );
}
