import { useEffect, useState } from 'react';
import './MenuBar.css';

const MENU_ITEMS = ['File', 'Edit', 'View', 'Window', 'Help'];

function formatClock(date: Date) {
  const day = date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
  const time = date.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
  return `${day}  ${time}`;
}

interface MenuBarProps {
  appName: string;
}

export function MenuBar({ appName }: MenuBarProps) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 15000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="menubar">
      <div className="menubar-left">
        <span className="menubar-apple"></span>
        <span className="menubar-appname">{appName}</span>
        {MENU_ITEMS.map((item) => (
          <span className="menubar-item" key={item}>
            {item}
          </span>
        ))}
      </div>
      <div className="menubar-right">
        <span className="menubar-icon">⌕</span>
        <span className="menubar-icon">◐</span>
        <span className="menubar-icon">▭</span>
        <span className="menubar-item">{formatClock(now)}</span>
      </div>
    </div>
  );
}
