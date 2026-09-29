import { PointerEvent, useCallback, useState } from "react";

export function useParallax() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const onPointerMove = useCallback((event: PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    setOffset({ x, y });
  }, []);

  const onPointerLeave = useCallback(() => {
    setOffset({ x: 0, y: 0 });
  }, []);

  return {
    offset,
    handlers: {
      onPointerMove,
      onPointerLeave,
    },
  };
}
