import type { DockAppData } from '../types';

export const dockApps: DockAppData[] = [
  { id: 'ps', label: 'Photoshop', kind: 'ps' },
  { id: 'files', label: 'Files', kind: 'files' },
  { id: 'notes', label: 'Notes', kind: 'notes' },
  { id: 'photos', label: 'Photos', kind: 'photos' },
  {
    id: 'instagram',
    label: 'Instagram',
    kind: 'instagram',
    href: 'https://www.instagram.com/moonpie_1478?igsh=MWR2MDdrbnE2NWl6dA==',
  },
  { id: 'mail', label: 'Mail', kind: 'mail' },
  { id: 'error', label: 'Error', kind: 'error' },
  { id: 'trash', label: 'Bin of Ideas', kind: 'trash' },
];
