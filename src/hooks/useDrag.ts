import { useCallback, useRef } from 'react';

interface UseDragOptions {
  onMove: (dx: number, dy: number) => void;
  onStart?: () => void;
  onEnd?: () => void;
  onClick?: () => void;
  threshold?: number;
}

export function useDrag({ onMove, onStart, onEnd, onClick, threshold = 4 }: UseDragOptions) {
  const dragging = useRef(false);
  const moved = useRef(false);
  const last = useRef({ x: 0, y: 0 });

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (e.button !== 0) return;
      dragging.current = true;
      moved.current = false;
      last.current = { x: e.clientX, y: e.clientY };
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      onStart?.();
      e.stopPropagation();
    },
    [onStart],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging.current) return;
      const dx = e.clientX - last.current.x;
      const dy = e.clientY - last.current.y;
      if (!moved.current && Math.hypot(dx, dy) > threshold) {
        moved.current = true;
      }
      if (moved.current) {
        onMove(dx, dy);
        last.current = { x: e.clientX, y: e.clientY };
      }
    },
    [onMove, threshold],
  );

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging.current) return;
      dragging.current = false;
      if (moved.current) {
        onEnd?.();
      } else {
        onClick?.();
      }
      e.stopPropagation();
    },
    [onEnd, onClick],
  );

  return { onPointerDown, onPointerMove, onPointerUp };
}
