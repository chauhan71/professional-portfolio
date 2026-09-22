'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [visible, setVisible] = useState(false);
  const [inTorchZone, setInTorchZone] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(hover: none)').matches) {
      return;
    }

    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let hasMoved = false;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!hasMoved) {
        hasMoved = true;
        ringX = mouseX;
        ringY = mouseY;
        setVisible(true);
      }

      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    };

    const tick = () => {
      if (hasMoved) {
        ringX += (mouseX - ringX) * 0.18;
        ringY += (mouseY - ringY) * 0.18;
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target || !target.closest) return;
      const isTorch = !!target.closest('[data-torch-zone]');
      setInTorchZone(isTorch);
      const interactive = target.closest(
        'a, button, [data-cursor="hover"], input, textarea, select, [role="button"], canvas'
      );
      setHovering(!!interactive);
    };

    const onDown = () => setIsClicking(true);
    const onUp = () => setIsClicking(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', checkHover, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', checkHover);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
  }, []);

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[99999] transition-opacity duration-300 hidden md:block ${
        visible && !inTorchZone ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* Outer Smooth Trailing Ring */}
      <div
        ref={ringRef}
        className="fixed left-0 top-0 rounded-full border transition-[width,height,border-color,background-color,box-shadow,scale] duration-200 ease-out will-change-transform"
        style={{
          width: hovering ? '56px' : '32px',
          height: hovering ? '56px' : '32px',
          borderColor: hovering ? 'rgba(245, 158, 11, 0.85)' : 'rgba(255, 255, 255, 0.55)',
          backgroundColor: hovering ? 'rgba(245, 158, 11, 0.08)' : 'transparent',
          boxShadow: hovering
            ? '0 0 20px rgba(245, 158, 11, 0.3), inset 0 0 10px rgba(245, 158, 11, 0.15)'
            : '0 0 10px rgba(255, 255, 255, 0.1)',
          transform: isClicking ? 'scale(0.85)' : 'scale(1)',
        }}
      />

      {/* Direct Snappy Center Dot */}
      <div
        ref={dotRef}
        className="fixed left-0 top-0 rounded-full transition-[width,height,background-color,box-shadow] duration-150 ease-out will-change-transform"
        style={{
          width: hovering ? '6px' : '4px',
          height: hovering ? '6px' : '4px',
          backgroundColor: hovering ? '#fbbf24' : '#ffffff',
          boxShadow: hovering
            ? '0 0 8px #fbbf24, 0 0 12px rgba(245, 158, 11, 0.6)'
            : '0 0 6px rgba(255, 255, 255, 0.8)',
        }}
      />
    </div>
  );
}
