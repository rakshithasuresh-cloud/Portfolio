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

function WifiIcon() {
  return (
    <svg viewBox="0 0 16 12" width="14" height="11" fill="none">
      <path
        d="M8 9.6a1 1 0 100 2 1 1 0 000-2z"
        fill="currentColor"
      />
      <path
        d="M4.8 7.3a4.6 4.6 0 016.4 0"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M2.3 4.9a8.2 8.2 0 0111.4 0"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        fill="none"
        opacity="0.75"
      />
    </svg>
  );
}

function BatteryIcon() {
  return (
    <svg viewBox="0 0 26 13" width="22" height="11" fill="none">
      <rect x="1" y="1" width="21" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.1" />
      <rect x="2.6" y="2.6" width="17.8" height="7.8" rx="1.3" fill="currentColor" />
      <rect x="23.2" y="4" width="2" height="5" rx="1" fill="currentColor" opacity="0.9" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 16 16" width="12.5" height="12.5" fill="none">
      <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M10.8 10.8L14 14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
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
        <span className="menubar-icon">
          <SearchIcon />
        </span>
        <span className="menubar-icon">
          <WifiIcon />
        </span>
        <span className="menubar-icon menubar-battery">
          <BatteryIcon />
        </span>
        <span className="menubar-item menubar-datetime">{formatClock(now)}</span>
      </div>
    </div>
  );
}
