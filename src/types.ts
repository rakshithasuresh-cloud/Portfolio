export type IconKind = 'music' | 'video' | 'document' | 'product' | 'collab';

export type IconShape = 'square' | 'portrait' | 'landscape';

export interface WindowContentData {
  eyebrow: string;
  subtitle: string;
  body: string[];
  showImageGrid?: boolean;
  showVideo?: boolean;
  linkLabel?: string;
}

export interface DesktopIconData {
  id: string;
  label: string;
  kind: IconKind;
  shape: IconShape;
  glyph: string;
  accent: string;
  accent2: string;
  x: number;
  y: number;
  content: WindowContentData;
}

export type DockAppKind =
  | 'ae'
  | 'ps'
  | 'ai'
  | 'notes'
  | 'photos'
  | 'instagram'
  | 'mail'
  | 'trash';

export interface DockAppData {
  id: string;
  label: string;
  kind: DockAppKind;
}

export interface WindowState {
  id: string;
  iconId: string;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  minimized: boolean;
  maximized: boolean;
  originX: number;
  originY: number;
  icon?: DesktopIconData;
  app?: DockAppData;
}
