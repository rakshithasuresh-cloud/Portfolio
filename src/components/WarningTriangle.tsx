interface WarningTriangleProps {
  className?: string;
}

export function WarningTriangle({ className }: WarningTriangleProps) {
  return (
    <svg viewBox="0 0 48 48" className={className}>
      <path
        d="M26.79 9.31 L41.21 36.69 A5 5 0 0 1 38 42 L10 42 A5 5 0 0 1 6.79 36.69 L21.21 9.31 A5 5 0 0 1 26.79 9.31 Z"
        fill="#ffcc33"
        stroke="#000"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <rect x="21.6" y="17" width="4.8" height="14" rx="2.4" fill="#000" />
      <circle cx="24" cy="35.5" r="2.6" fill="#000" />
    </svg>
  );
}
