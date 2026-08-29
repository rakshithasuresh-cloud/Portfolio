import { useState } from 'react';
import type { DesktopIconData } from '../types';
import { filesSections } from '../data/filesFolders';
import filesImg from '../assets/dock/files.png';
import './FilesAppContent.css';

interface FilesAppContentProps {
  onOpenFolder: (folder: DesktopIconData) => void;
}

export function FilesAppContent({ onOpenFolder }: FilesAppContentProps) {
  const [selectedId, setSelectedId] = useState(filesSections[0].id);
  const section = filesSections.find((s) => s.id === selectedId) ?? filesSections[0];

  return (
    <div className="files-app">
      <div className="files-sidebar">
        <span className="files-sidebar-item-dummy">Recent Projects</span>
        {filesSections.map((s) => (
          <div key={s.id} style={{ display: 'contents' }}>
            {s.id === 'program-files' && <div className="files-sidebar-divider" />}
            <button
              type="button"
              className={`files-sidebar-item${s.id === selectedId ? ' is-selected' : ''}`}
              onClick={() => setSelectedId(s.id)}
            >
              {s.label}
            </button>
          </div>
        ))}
      </div>
      <div className="files-content">
        <h2 className="files-content-title">{section.label}</h2>
        {section.subtitle && <p className="files-content-subtitle">{section.subtitle}</p>}
        <div className="files-grid">
          {section.folders?.map((folder) => (
            <button
              key={folder.id}
              type="button"
              className="files-folder"
              onClick={() => (folder.href ? window.open(folder.href, '_blank', 'noopener,noreferrer') : onOpenFolder(folder))}
            >
              <img src={filesImg} alt="" className="files-folder-icon" />
              <span className="files-folder-label">{folder.label}</span>
            </button>
          ))}
          {section.tools?.map((tool) => (
            <div key={tool.id} className="files-tool">
              <img src={tool.image} alt="" className="files-tool-icon" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
