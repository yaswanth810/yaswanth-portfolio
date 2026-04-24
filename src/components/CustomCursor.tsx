import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip on touch devices
    if ('ontouchstart' in window) return;

    let dotX = 0, dotY = 0;
    let ringX = 0, ringY = 0;
    let mouseX = 0, mouseY = 0;
    let isHovering = false;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Check if hovering over interactive element
      const target = e.target as HTMLElement;
      isHovering = !!(target.closest('a, button, [role="button"]'));
    };

    window.addEventListener('mousemove', onMouseMove);

    let raf: number;
    const animate = () => {
      // Dot follows fast (lerp 0.15)
      dotX += (mouseX - dotX) * 0.15;
      dotY += (mouseY - dotY) * 0.15;

      // Ring follows slower (lerp 0.06)
      ringX += (mouseX - ringX) * 0.06;
      ringY += (mouseY - ringY) * 0.06;

      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${dotX - 4}px, ${dotY - 4}px)`;
      }

      if (ringRef.current) {
        const scale = isHovering ? 2.5 : 1;
        ringRef.current.style.transform =
          `translate(${ringX - 16}px, ${ringY - 16}px) scale(${scale})`;
        ringRef.current.style.borderColor =
          isHovering ? '#64C8FF' : 'rgba(100,200,255,0.5)';
      }

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="hidden md:block">
      {/* dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-accent-teal rounded-full
                   pointer-events-none z-[9999] mix-blend-difference"
        style={{ willChange: 'transform' }}
      />
      {/* ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 border border-accent-teal/50
                   rounded-full pointer-events-none z-[9998]
                   transition-transform duration-200"
        style={{ willChange: 'transform' }}
      />
    </div>
  );
}
