import { useState } from 'react';
import './NotesInfoContent.css';

interface InfoGroup {
  label: string;
  items: string[];
}

interface InfoSection {
  id: string;
  label: string;
  count: string;
  paragraph?: string;
  listLabel?: string;
  items?: string[];
  groups?: InfoGroup[];
}

const SECTIONS: InfoSection[] = [
  {
    id: 'about',
    label: 'About me',
    count: '',
    paragraph:
      'Marketer, Social Media Strategist, Art Director, Graphic Designer, Digital Artist, Photographer, even a Stylist sometimes and much more. To put it simply, I bring ideas to life through visuals and manage everything that makes a project come together in the end.',
    listLabel: 'I can do…',
    items: [
      'Marketing Research',
      'Social Media Content',
      'Creative Direction',
      'Artwork (posters, merch, illustrations)',
      'Offline event planning and visuals',
      'Photography',
    ],
  },
  {
    id: 'cv',
    label: 'CV',
    count: '',
    groups: [
      {
        label: 'Education',
        items: [
          'UCL School of Management - MSc Marketing Science (2026-2027)',
          'Women’s Christian College - BBA, General CGPA: 8.4/10 (2022-2025)',
        ],
      },
      {
        label: 'Experience',
        items: [
          'Kairos Makeup Studio & Spa - Marketing and Strategy Associate (2025-2026)',
          'Abroad Scholar - Marketing Strategy Intern (2025)',
          'WOCO Spaces - Marketing Research (2025)',
          'Audi - Marketing Intern (2024)',
          'Hobics - Social Media Marketing Intern (2024)',
          'Aarveem International - Administrative Intern (2023)',
        ],
      },
      {
        label: 'Part-time Student Employment @ Women’s Christian College (2022-2025)',
        items: [
          'Arts Club Coordinator (2023-2025)',
          'Department Media Manager (2024-2025)',
          'Social Media Coordinator of National Service Scheme (2024-2025)',
          'International Conference Coordinator (2025)',
          'PR Head (2024)',
          'Design Head for Sports Day (2024)',
          'Annual College Play Assistant Costume Coordinator (2022)',
          'Department’s Fashion Parade Representative (2022)',
        ],
      },
    ],
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

function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="info-checklist">
      {items.map((item, i) => (
        <li key={i} className="info-check-item">
          <CheckIcon />
          {item}
        </li>
      ))}
    </ul>
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
            {s.count && <span className="info-sidebar-count">{s.count}</span>}
          </button>
        ))}
      </div>
      <div className="info-content">
        {section.paragraph && <p className="info-paragraph">{section.paragraph}</p>}
        {section.groups
          ? section.groups.map((group) => (
              <div key={group.label} className="info-group">
                <h3 className="info-group-label">{group.label}</h3>
                <Checklist items={group.items} />
              </div>
            ))
          : section.items && (
              <>
                {section.listLabel && <h3 className="info-group-label">{section.listLabel}</h3>}
                <Checklist items={section.items} />
              </>
            )}
      </div>
    </div>
  );
}
