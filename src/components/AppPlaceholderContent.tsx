import type { DockAppData } from '../types';
import './WindowContent.css';

const TRASH_COPY = 'Trash is empty.';
const DEFAULT_COPY = "This app isn't wired up yet - tell me what it should open or do here.";

interface AppPlaceholderContentProps {
  app: DockAppData;
}

export function AppPlaceholderContent({ app }: AppPlaceholderContentProps) {
  return (
    <div className="wc">
      <div className="wc-eyebrow">
        <span className="wc-eyebrow-dot" style={{ background: '#8a8a8f' }} />
        Application
      </div>
      <h1 className="wc-title">{app.label}</h1>
      <p className="wc-subtitle">{app.kind === 'trash' ? TRASH_COPY : DEFAULT_COPY}</p>
    </div>
  );
}
