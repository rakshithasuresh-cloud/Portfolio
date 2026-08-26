export type IconKind = 'music' | 'video' | 'document' | 'product' | 'collab';

export type IconShape = 'square' | 'portrait' | 'landscape' | 'widget' | 'poster' | 'strip' | 'photo';

export interface WindowContentSection {
  heading: string;
  body: string[];
  image?: string;
}

export interface WindowContentData {
  eyebrow: string;
  subtitle: string;
  body: string[];
  showImageGrid?: boolean;
  showVideo?: boolean;
  linkLabel?: string;
  /** Extra case-study blocks (image + heading + copy) rendered inside the Preview section, in order. */
  sections?: WindowContentSection[];
  /** A final image shown after all sections, inside the Preview section. */
  closingImage?: string;
}

export interface DesktopIconData {
  id: string;
  label: string;
  kind: IconKind;
  shape: IconShape;
  glyph: string;
  accent: string;
  accent2: string;
  /** When set, this real image fills the tile instead of the gradient + glyph treatment. */
  image?: string;
  /** Purely decorative — draggable but doesn't open a window on click. */
  notOpenable?: boolean;
  /** Hides the text label under the tile. */
  hideLabel?: boolean;
  x: number;
  y: number;
  content: WindowContentData;
}

export type DockAppKind =
  | 'linkedin'
  | 'files'
  | 'notes'
  | 'photos'
  | 'instagram'
  | 'mail'
  | 'error'
  | 'trash';

export interface DockAppData {
  id: string;
  label: string;
  kind: DockAppKind;
  /** When set, clicking the dock icon opens this URL in a new tab instead of launching a placeholder window. */
  href?: string;
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
