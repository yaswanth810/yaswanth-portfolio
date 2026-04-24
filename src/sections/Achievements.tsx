import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ───────────────────────────────────────────
   Data
   ─────────────────────────────────────────── */

interface Stat {
  suffix: string;
  numeric: number;
  label: string;
}

const STATS: Stat[] = [
  { suffix: 'x', numeric: 4, label: 'Hackathon Winner' },
  { suffix: '+', numeric: 100, label: 'Testnets & Mainnets' },
  { suffix: '+', numeric: 400, label: 'Binance Yatra Participants' },
];

interface TimelineEntry {
  title: string;
  description: string;
}

const TIMELINE: TimelineEntry[] = [
  {
    title: '🏆 SUS Hacks 2026 Winner',
    description: 'TrustDrop · NGO Fund Transparency · Polygon Amoy · 2026',
  },
  {
    title: '🥉 Piston Cup Hackathon 2025 — 3rd Prize',
    description: 'Led EduTrust among 85+ teams at VIIT',
  },
  {
    title: '🥉 Binance Blockchain Yatra 2025 — 3rd Place',
    description: 'Top 3 among 400+ participants in Ethereum & blockchain quiz',
  },
  {
    title: '🥈 National Blockchain Hackathon 2024 — Runner-Up',
    description: 'Crypto Payment Gateway on Ethereum Testnet',
  },
  {
    title: '🏛️ VP, Street Cause NGO — VIIT',
    description: 'Leading 30+ member student volunteer team',
  },
  {
    title: '🌐 100+ Testnets & Mainnets',
    description: 'Ethereum, EVM-compatible chains, DeFi protocols, 2021–Present',
  },
];

/* ───────────────────────────────────────────
   Animated counter component
   ─────────────────────────────────────────── */

function StatCounter({ stat, index }: { stat: Stat; index: number }) {
  const numRef = useRef<HTMLSpanElement>(null!);
  const cardRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    const obj = { val: 0 };

    ScrollTrigger.create({
      trigger: cardRef.current,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: stat.numeric,
          duration: 2,
          ease: 'power2.out',
          delay: index * 0.15,
          onUpdate: () => {
            if (numRef.current) {
              numRef.current.textContent = `${Math.round(obj.val)}${stat.suffix}`;
            }
          },
        });
      },
    });
  }, [stat, index]);

  return (
    <div ref={cardRef} className="stat-counter flex flex-col items-center gap-2 opacity-0">
      <span
        ref={numRef}
        className="font-mono text-5xl sm:text-6xl font-bold text-accent-teal"
      >
        0{stat.suffix}
      </span>
      <span className="text-text-muted text-sm text-center">{stat.label}</span>
    </div>
  );
}

/* ───────────────────────────────────────────
   Achievements section
   ─────────────────────────────────────────── */

const Achievements = () => {
  const sectionRef = useRef<HTMLElement>(null!);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // stat counters fade in
      gsap.fromTo('.stat-counter',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, stagger: 0.15, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: '.achievements-section', start: 'top 70%', toggleActions: 'play none none none' },
        }
      );

      // timeline entries slide in from right
      gsap.fromTo('.timeline-entry',
        { opacity: 0, x: 60 },
        {
          opacity: 1, x: 0, stagger: 0.15, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: '.achievements-section', start: 'top 70%', toggleActions: 'play none none none' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="achievements-section relative w-full min-h-screen bg-bg-dark py-24 px-6 md:px-16 lg:px-24 flex flex-col items-center"
    >
      <div className="max-w-4xl w-full">
        {/* heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-2">
          Achievements
        </h2>
        <div className="w-16 h-0.5 bg-accent-teal mb-16" />

        {/* stat counters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-20">
          {STATS.map((s, i) => (
            <StatCounter key={s.label} stat={s} index={i} />
          ))}
        </div>

        {/* timeline */}
        <div className="relative pl-8 border-l-2 border-accent-blue/40 space-y-10">
          {TIMELINE.map((entry, i) => (
            <div key={i} className="timeline-entry relative opacity-0">
              {/* dot */}
              <span className="absolute -left-[calc(2rem+5px)] top-1.5 w-2.5 h-2.5 rounded-full bg-accent-teal shadow-[0_0_8px_rgba(100,200,255,0.5)]" />

              {/* card */}
              <div
                className="bg-[#0C1020] border border-[#1A2A5A] rounded-lg px-5 py-4
                           transition-all duration-300
                           hover:border-accent-teal/50 hover:shadow-[0_0_16px_rgba(100,200,255,0.08)]"
              >
                <h3 className="text-text-primary font-semibold text-sm sm:text-base mb-1">
                  {entry.title}
                </h3>
                <p className="text-text-muted text-xs sm:text-sm leading-relaxed">
                  {entry.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
