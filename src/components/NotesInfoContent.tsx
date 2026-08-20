import { useState } from 'react';
import './NotesInfoContent.css';

interface InfoSection {
  id: string;
  label: string;
  count: string;
  paragraph: string;
  items: string[];
}

const SECTIONS: InfoSection[] = [
  {
    id: 'about',
    label: 'About me',
    count: '18',
    paragraph: 'Add your bio here.',
    items: ['Add a skill or capability here', 'Add a skill or capability here', 'Add a skill or capability here'],
  },
  {
    id: 'cv',
    label: 'CV',
    count: '48',
    paragraph: 'Add a CV summary here.',
    items: ['Add an experience or education entry here', 'Add an experience or education entry here'],
  },
  {
    id: 'interests',
    label: 'Interests',
    count: '∞',
    paragraph: 'Add a short intro to your interests here.',
    items: ['Add an interest here', 'Add an interest here', 'Add an interest here'],
  },
];

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" className="info-check-icon">
      <circle cx="8" cy="8" r="8" fill="#f2a93b" />
      <path d="M4.6 8.2L6.8 10.4L11.4 5.6" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function NotesInfoContent() {
  const [selectedId, setSelectedId] = useState(SECTIONS[0].id);
  const section = SECTIONS.find((s) => s.id === selectedId) ?? SECTIONS[0];

  return (
    <div className="info-app">
      <div className="info-sidebar">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            type="button"
            className={`info-sidebar-item${s.id === selectedId ? ' is-selected' : ''}`}
            onClick={() => setSelectedId(s.id)}
          >
            <span className="info-sidebar-label">{s.label}</span>
            <span className="info-sidebar-count">{s.count}</span>
          </button>
        ))}
      </div>
      <div className="info-content">
        <p className="info-paragraph">{section.paragraph}</p>
        <ul className="info-checklist">
          {section.items.map((item, i) => (
            <li key={i} className="info-check-item">
              <CheckIcon />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
