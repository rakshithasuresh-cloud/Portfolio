import { useState } from 'react';
import { Chevron } from './Chevron';
import trashImg from '../assets/dock/trash.png';
import binBehind1Img from '../assets/desktop/bin-behind-1.jpg';
import binBehind2Img from '../assets/desktop/bin-behind-2.jpg';
import binBehind3Img from '../assets/desktop/bin-behind-3.jpg';
import binBehind4Img from '../assets/desktop/bin-behind-4.jpg';
import binBehind5Img from '../assets/desktop/bin-behind-5.jpg';
import binBehind6Img from '../assets/desktop/bin-behind-6.jpg';
import binBehind7Img from '../assets/desktop/bin-behind-7.jpg';
import binBehind8Img from '../assets/desktop/bin-behind-8.jpg';
import binBehind9Img from '../assets/desktop/bin-behind-9.jpg';
import binBehind10Img from '../assets/desktop/bin-behind-10.jpg';
import binBehind11Img from '../assets/desktop/bin-behind-11.jpg';
import binBehind12Img from '../assets/desktop/bin-behind-12.jpg';
import binBehind13Img from '../assets/desktop/bin-behind-13.jpg';
import binBehind14Img from '../assets/desktop/bin-behind-14.jpg';
import binBehind15Img from '../assets/desktop/bin-behind-15.jpg';
import binBehind16Img from '../assets/desktop/bin-behind-16.jpg';
import binBehind17Img from '../assets/desktop/bin-behind-17.jpg';
import binBehind18Img from '../assets/desktop/bin-behind-18.jpg';
import './WindowContent.css';

const BLOCKS: { rows: string[][]; caption: string }[] = [
  {
    rows: [
      [binBehind1Img, binBehind2Img, binBehind3Img],
      [binBehind6Img, binBehind5Img, binBehind4Img],
    ],
    caption: 'College PR club',
  },
  {
    rows: [[binBehind7Img, binBehind8Img, binBehind9Img]],
    caption: 'Sports day decoration committee',
  },
  {
    rows: [
      [binBehind10Img, binBehind11Img, binBehind12Img],
      [binBehind13Img, binBehind14Img, binBehind15Img],
    ],
    caption: 'department events, competition, workshops and club',
  },
  {
    rows: [[binBehind16Img, binBehind17Img, binBehind18Img]],
    caption: 'National Service Scheme',
  },
];

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
          <p className="wc-info-subtitle">Behind the scenes from college roles mentioned in Notes app</p>
        </div>
      </div>

      <button type="button" className="wc-section-header" onClick={() => setPreviewOpen((v) => !v)}>
        <Chevron open={previewOpen} />
        Preview:
      </button>
      {previewOpen && (
        <div className="wc-section-body wc-preview-body">
          {BLOCKS.map((block, i) => (
            <div key={i}>
              <p className="wc-caption">{block.caption}</p>
              {block.rows.map((row, j) => (
                <div className="wc-grid" key={j}>
                  {row.map((src, k) => (
                    <div className="wc-photo-tile" key={k}>
                      <img src={src} alt="" className="wc-photo-tile-img" />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
