import { useState, useEffect, useCallback, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ───────────────────────────────────────────
   Nav link data
   ─────────────────────────────────────────── */

const NAV_LINKS = [
  { label: 'About', id: 'about' },
  { label: 'Projects', id: 'projects' },
  { label: 'Achievements', id: 'achievements' },
  { label: 'Contact', id: 'contact' },
];

/* ───────────────────────────────────────────
   Navbar
   ─────────────────────────────────────────── */

const Navbar = () => {
  const [activeId, setActiveId] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const navListRef = useRef<HTMLUListElement>(null!);
  const underlineRef = useRef<HTMLDivElement>(null!);

  /* ── Scroll progress bar (GSAP) ── */
  useEffect(() => {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;

    const trigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        bar.style.width = `${self.progress * 100}%`;
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  /* ── IntersectionObserver for active section ── */
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.id);
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  /* ── Sliding underline position ── */
  useEffect(() => {
    if (!navListRef.current || !underlineRef.current || !activeId) {
      if (underlineRef.current) underlineRef.current.style.opacity = '0';
      return;
    }
    const activeBtn = navListRef.current.querySelector(`[data-nav-id="${activeId}"]`) as HTMLElement | null;
    if (!activeBtn) return;

    const listRect = navListRef.current.getBoundingClientRect();
    const btnRect = activeBtn.getBoundingClientRect();

    underlineRef.current.style.opacity = '1';
    underlineRef.current.style.width = `${btnRect.width}px`;
    underlineRef.current.style.left = `${btnRect.left - listRect.left}px`;
  }, [activeId]);

  /* ── Smooth scroll handler ── */
  const scrollTo = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
      setMenuOpen(false);
    },
    [],
  );

  return (
    <>
      {/* scroll progress bar */}
      <div className="fixed top-0 left-0 w-full z-[60] h-[2px]">
        <div
          id="scroll-progress"
          className="h-full bg-accent-teal"
          style={{ width: '0%', transition: 'none' }}
        />
      </div>

      {/* navbar */}
      <nav className="fixed top-[2px] left-0 w-full z-50 bg-bg-dark/80 backdrop-blur-md border-b border-[#1A2A5A]/50">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
          {/* monogram */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-mono text-accent-teal font-bold text-xl tracking-tight cursor-pointer
                       hover:drop-shadow-[0_0_8px_rgba(100,200,255,0.4)] transition-all"
          >
            YR
          </button>

          {/* desktop links with sliding underline */}
          <div className="hidden md:block relative">
            <ul ref={navListRef} className="flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <button
                    data-nav-id={link.id}
                    onClick={() => scrollTo(link.id)}
                    className={`font-mono text-sm transition-colors cursor-pointer ${
                      activeId === link.id
                        ? 'text-accent-teal'
                        : 'text-text-muted hover:text-accent-teal'
                    }`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
            {/* sliding underline */}
            <div
              ref={underlineRef}
              className="absolute bottom-[-8px] h-[2px] bg-accent-teal rounded-full transition-all duration-300 ease-out"
              style={{ opacity: 0 }}
            />
          </div>

          {/* mobile hamburger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden flex flex-col gap-[5px] cursor-pointer group"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-5 h-[2px] bg-text-muted transition-all duration-300 ${
                menuOpen ? 'rotate-45 translate-y-[7px]' : ''
              }`}
            />
            <span
              className={`block w-5 h-[2px] bg-text-muted transition-all duration-300 ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-5 h-[2px] bg-text-muted transition-all duration-300 ${
                menuOpen ? '-rotate-45 -translate-y-[7px]' : ''
              }`}
            />
          </button>
        </div>

        {/* mobile dropdown */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            menuOpen ? 'max-h-64' : 'max-h-0'
          }`}
        >
          <ul className="flex flex-col items-center gap-4 py-5 bg-bg-dark/95 backdrop-blur-md border-t border-[#1A2A5A]/30">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => scrollTo(link.id)}
                  className={`font-mono text-sm transition-colors cursor-pointer ${
                    activeId === link.id
                      ? 'text-accent-teal'
                      : 'text-text-muted hover:text-accent-teal'
                  }`}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
