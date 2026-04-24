import { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null!);
  const ringRef = useRef<HTMLDivElement>(null!);
  const mouse = useRef({ x: 0, y: 0 });
  const dotPos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const hovering = useRef(false);

  useEffect(() => {
    // Hide on touch devices
    if ('ontouchstart' in window) return;

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const onEnterInteractive = () => { hovering.current = true; };
    const onLeaveInteractive = () => { hovering.current = false; };

    window.addEventListener('mousemove', onMove);

    // Observe interactive elements
    const attachListeners = () => {
      const interactives = document.querySelectorAll('a, button, [role="button"]');
      interactives.forEach((el) => {
        el.addEventListener('mouseenter', onEnterInteractive);
        el.addEventListener('mouseleave', onLeaveInteractive);
      });
    };

    attachListeners();
    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    // Animation loop
    let raf: number;
    const animate = () => {
      // Lerp dot (fast)
      dotPos.current.x += (mouse.current.x - dotPos.current.x) * 0.1;
      dotPos.current.y += (mouse.current.y - dotPos.current.y) * 0.1;

      // Lerp ring (slow)
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.05;
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.05;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotPos.current.x - 4}px, ${dotPos.current.y - 4}px)`;
      }

      if (ringRef.current) {
        const scale = hovering.current ? 2 : 1;
        const borderColor = hovering.current ? '#64C8FF' : 'rgba(100,200,255,0.4)';
        ringRef.current.style.transform = `translate(${ringPos.current.x - 12}px, ${ringPos.current.y - 12}px) scale(${scale})`;
        ringRef.current.style.borderColor = borderColor;
      }

      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  // Don't render on touch
  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null;

  return (
    <>
      {/* dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-accent-teal pointer-events-none z-[9999] mix-blend-difference"
        style={{ willChange: 'transform' }}
      />
      {/* ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-6 h-6 rounded-full border border-accent-teal/40 pointer-events-none z-[9999] transition-[border-color] duration-200"
        style={{ willChange: 'transform' }}
      />
    </>
  );
};

export default CustomCursor;
