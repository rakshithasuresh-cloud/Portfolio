import type { DesktopIconData } from '../types';
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

function makeFolder(id: string, label: string): DesktopIconData {
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
    content: {
      eyebrow: 'Folder',
      subtitle: 'Add a description here.',
      body: ['Add this folder’s title and content here.'],
    },
  };
}

export const filesSections: FilesSection[] = [
  {
    id: 'documents',
    label: 'Documents',
    folders: [
      makeFolder('documents-folder-1', 'Folder 1'),
      makeFolder('documents-folder-2', 'Folder 2'),
      makeFolder('documents-folder-3', 'Folder 3'),
    ],
  },
  {
    id: 'research',
    label: 'Research',
    folders: [
      makeFolder('research-folder-1', 'Folder 1'),
      makeFolder('research-folder-2', 'Folder 2'),
      makeFolder('research-folder-3', 'Folder 3'),
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
