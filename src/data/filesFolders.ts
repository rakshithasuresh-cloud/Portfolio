import type { DesktopIconData, WindowContentData } from '../types';
import tool1 from '../assets/tools/tool1.png';
import tool2 from '../assets/tools/tool2.png';
import tool3 from '../assets/tools/tool3.png';
import tool4 from '../assets/tools/tool4.png';
import tool5 from '../assets/tools/tool5.png';
import tool6 from '../assets/tools/tool6.png';

export interface FilesTool {
  id: string;
  image: string;
}

export interface FilesSection {
  id: string;
  label: string;
  folders?: DesktopIconData[];
  subtitle?: string;
  tools?: FilesTool[];
}

function makeFolder(id: string, label: string, content?: WindowContentData): DesktopIconData {
  return {
    id,
    label,
    kind: 'document',
    shape: 'square',
    glyph: '📁',
    accent: '#ffc6d5',
    accent2: '#ff9fb8',
    x: 0,
    y: 0,
    content: content ?? {
      eyebrow: 'Folder',
      subtitle: 'Add a description here.',
      body: ['Add this folder’s title and content here.'],
    },
  };
}

export const filesSections: FilesSection[] = [
  {
    id: 'documents',
    label: 'Marketing',
    folders: [
      makeFolder('documents-folder-1', 'Folder 1'),
      makeFolder('documents-folder-2', 'Folder 2'),
      makeFolder('documents-folder-3', 'Folder 3'),
    ],
  },
  {
    id: 'undergraduate',
    label: 'Undergraduate',
    folders: [
      makeFolder('undergraduate-folder-1', 'Service Based Learning', {
        eyebrow: 'Folder',
        subtitle: '',
        hidePreviewPlaceholder: true,
        hideThumb: true,
        previewLabel: 'Key Contributions:',
        body: [
          'In collaboration with three of my classmates, I undertook a service-based learning project focused on revitalising a small panipuri business. Our goal was to boost their sales and enhance their market presence.',
        ],
        sections: [
          {
            heading: '',
            body: [
              '• Menu Diversification: Introduced new menu items based on consumer preferences to attract a wider base.',
              '• Marketing Materials: Designed eye-catching pamphlets, menu cards etc. to promote the business and its offerings.',
              '• Social Media Setup: Created and managed the business’s social media profiles to increase online visibility and engagement.',
              '• Consumer Feedback: Conducted surveys to gather consumer reviews and insights for continuous improvement.',
              '• Market Observation: Studied similar businesses in the area to identify best practices and potential opportunities.',
              'Through this hands-on project, we successfully increased the business’s sales in a short period of time and established a stronger connection with their target audience.',
            ],
          },
        ],
      }),
      makeFolder('undergraduate-folder-2', 'Peer Based Intervention', {
        eyebrow: 'Folder',
        subtitle: '',
        hidePreviewPlaceholder: true,
        hideThumb: true,
        previewLabel: 'My involvement included:',
        body: [
          'I participated in a Peer-Based Intervention Program initiated by the Department of Psychology at Women’s Christian College, focusing on enhancing personal growth and well-being among female undergraduate students and received a letter of appreciation from the department head.',
        ],
        sections: [
          {
            heading: '',
            body: [
              '• Collaborative and Individual Activities: Engaged in various team and solo exercises designed to build resilience, self-regulation, and social intelligence.',
              '• Confidence and Emotional Intelligence Development: Received targeted guidance and practical tips that significantly boosted my self-confidence and emotional intelligence.',
              '• Networking and Adaptability: Interacted with a diverse group of peers, enhancing my ability to form acquaintances and adapt to new social environments.',
              'This experience deepened my understanding of peer-led interventions in promoting mental health and personal development, while also honing my collaborative and interpersonal skills.',
            ],
          },
        ],
      }),
      makeFolder('undergraduate-folder-3', 'Marketing Research', {
        eyebrow: 'Folder',
        subtitle: '',
        hidePreviewPlaceholder: true,
        hideThumb: true,
        previewLabel: 'Key Points:',
        body: [
          'During my final year of undergraduate, I took on a marketing research project and helped a coworking space solve their problem of not filling enough seats every month.',
        ],
        sections: [
          {
            heading: '',
            body: [
              '• Analysed the company’s current situation to identify challenges in customer retention.',
              '• Conducted research on the relationship between CRM, customer satisfaction, and customer retention.',
              '• Identified factors contributing to customers not staying for a long period.',
              '• Developed insights based on data-driven research to enhance customer engagement.',
              '• Proposed strategies to improve CRM effectiveness and increase customer loyalty.',
            ],
          },
        ],
      }),
    ],
  },
  {
    id: 'program-files',
    label: 'Program Files',
    subtitle: 'Tools I use for creating',
    tools: [
      { id: 'tool-1', image: tool1 },
      { id: 'tool-2', image: tool2 },
      { id: 'tool-3', image: tool3 },
      { id: 'tool-4', image: tool4 },
      { id: 'tool-5', image: tool5 },
      { id: 'tool-6', image: tool6 },
    ],
  },
];
