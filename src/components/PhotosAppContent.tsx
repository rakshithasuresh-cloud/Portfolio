import { useState } from 'react';
import { Chevron } from './Chevron';
import photosImg from '../assets/dock/photos.png';
import recents1 from '../assets/photos/recents-1.jpg';
import recents2 from '../assets/photos/recents-2.jpg';
import recents3 from '../assets/photos/recents-3.jpg';
import recents4 from '../assets/photos/recents-4.jpg';
import recents5 from '../assets/photos/recents-5.jpg';
import recents6 from '../assets/photos/recents-6.jpg';
import recents7 from '../assets/photos/recents-7.jpg';
import recents8 from '../assets/photos/recents-8.jpg';
import recents9 from '../assets/photos/recents-9.jpg';
import recents10 from '../assets/photos/recents-10.jpg';
import recents11 from '../assets/photos/recents-11.jpg';
import recents12 from '../assets/photos/recents-12.jpg';
import './WindowContent.css';

const RECENTS = [
  recents1,
  recents2,
  recents3,
  recents4,
  recents5,
  recents6,
  recents7,
  recents8,
  recents9,
  recents10,
  recents11,
  recents12,
];

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
        <div className="wc-section-body wc-preview-body">
          <div className="wc-grid">
            {RECENTS.map((src, i) => (
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
