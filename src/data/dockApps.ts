import type { DockAppData } from '../types';

export const dockApps: DockAppData[] = [
  { id: 'notes', label: 'Notes', kind: 'notes' },
  { id: 'files', label: 'Files', kind: 'files' },
  { id: 'linkedin', label: 'LinkedIn', kind: 'linkedin', href: 'https://www.linkedin.com/in/rakshitha-v-s' },
  { id: 'mail', label: 'Mail', kind: 'mail', href: 'mailto:rakswork7@gmail.com' },
  {
    id: 'instagram',
    label: 'Instagram',
    kind: 'instagram',
    href: 'https://www.instagram.com/moonpie_1478?igsh=MWR2MDdrbnE2NWl6dA==',
  },
  { id: 'photos', label: 'Photos', kind: 'photos' },
  { id: 'error', label: 'Error', kind: 'error' },
  { id: 'trash', label: 'Bin of Ideas', kind: 'trash' },
];
