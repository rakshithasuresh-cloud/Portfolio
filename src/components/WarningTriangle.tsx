interface WarningTriangleProps {
  className?: string;
}

export function WarningTriangle({ className }: WarningTriangleProps) {
  return (
    <svg viewBox="0 0 48 48" className={className}>
      <path
        d="M24 5.5L44.5 40a3 3 0 01-2.6 4.5H6.1A3 3 0 013.5 40L24 5.5z"
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
