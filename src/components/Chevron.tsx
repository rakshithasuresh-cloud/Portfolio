export function Chevron({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 10 10" className={`wc-chevron${open ? ' is-open' : ''}`}>
      <path d="M2 3.5 L5 6.5 L8 3.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
