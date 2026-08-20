import { WarningTriangle } from './WarningTriangle';
import './ErrorDialogContent.css';

interface ErrorDialogContentProps {
  onTryAgain: () => void;
}

export function ErrorDialogContent({ onTryAgain }: ErrorDialogContentProps) {
  return (
    <div className="error-dialog">
      <div className="error-dialog-row">
        <WarningTriangle className="error-dialog-icon" />
        <p className="error-dialog-text">Graphic designer just lost his mind. Shame he didn't have a hard drive copy.</p>
      </div>
      <div className="error-dialog-actions">
        <button type="button" className="error-dialog-btn" onClick={onTryAgain}>
          Try Again
        </button>
      </div>
    </div>
  );
}
