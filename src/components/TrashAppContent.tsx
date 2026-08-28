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

interface DetailItem {
  text: string;
  subitems?: string[];
  note?: string;
}

const BLOCKS: { rows: string[][]; caption: string; intro?: string; details?: DetailItem[] }[] = [
  {
    rows: [
      [binBehind1Img, binBehind2Img, binBehind3Img],
      [binBehind6Img, binBehind5Img, binBehind4Img],
    ],
    caption: 'PR Club:',
    details: [
      { text: 'Head of the PR team for intercollegiate fests, strategised and directed digital content creation.' },
      {
        text: 'Produced reels with record engagement: one with 1.9 million views and another with nearly 1 million views, the highest in the college Instagram account’s history till date.',
      },
    ],
  },
  {
    rows: [[binBehind7Img, binBehind8Img, binBehind9Img]],
    caption: 'Sports day decoration committee',
    intro: 'Led the decoration team, developing the overall visual concept in line with the Sports Day theme.',
    details: [
      { text: 'Designed outfit sketches for the parade and transformed the concepts into a cohesive visual direction.' },
      { text: 'Planned and managed decor purchases, determining the materials and quantities required for execution.' },
    ],
  },
  {
    rows: [
      [binBehind10Img, binBehind11Img, binBehind12Img],
      [binBehind13Img, binBehind14Img, binBehind15Img],
    ],
    caption: 'Department Contributions:',
    details: [
      { text: 'Represented the department in the Fashion Parade.' },
      { text: 'Organiser for the National and international Workshop of the department.' },
      {
        text: 'Held positions for several events, including:',
        subitems: ['Decoration and Technical (Student Services Events)', 'Photography (International Conclave)'],
        note: 'These are selected examples of the committees I led, not the complete list.',
      },
      {
        text: 'Media Manager in the final year, managed the club’s Instagram account, designed posters, geo-tagged content, and wrote summaries of workshops and events.',
      },
    ],
  },
  {
    rows: [[binBehind16Img, binBehind17Img, binBehind18Img]],
    caption: 'National Service Scheme',
    details: [
      {
        text: 'Contributed over 160 hours of service as a volunteer over the span of 2 academic years, engaging in various initiatives to make a positive community impact.',
      },
      {
        text: 'Served as the Social Media Coordinator in the final year:',
        subitems: [
          'Managed NSS social media platforms and curated content to increase volunteer participation and engagement.',
          'Collaborated with the NSS team, providing regular updates on events and carrying out online events for volunteers.',
        ],
      },
    ],
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
              {block.intro && <p className="wc-case-text">{block.intro}</p>}
              {block.details && (
                <ul className="wc-bin-list">
                  {block.details.map((d, idx) => (
                    <li key={idx}>
                      {d.text}
                      {d.subitems && (
                        <ul className="wc-bin-sublist">
                          {d.subitems.map((s, j) => (
                            <li key={j}>{s}</li>
                          ))}
                        </ul>
                      )}
                      {d.note && <p className="wc-bin-note">{d.note}</p>}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
