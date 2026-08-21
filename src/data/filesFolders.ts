import type { DesktopIconData } from '../types';

export interface FilesSection {
  id: string;
  label: string;
  folders: DesktopIconData[];
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
    folders: [
      makeFolder('program-files-folder-1', 'Folder 1'),
      makeFolder('program-files-folder-2', 'Folder 2'),
      makeFolder('program-files-folder-3', 'Folder 3'),
    ],
  },
];
