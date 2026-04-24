import { useEffect, useRef } from 'react';
import { TypeAnimation } from 'react-type-animation';
import gsap from 'gsap';
import HeroVisual from '../components/SplineAvatar';

/* ───────────────────────────────────────────
   Hero — exported default
   ─────────────────────────────────────────── */

const Hero = () => {
  const containerRef = useRef<HTMLElement>(null!);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // wallet address
      gsap.fromTo('.hero-wallet',
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, delay: 0.1 }
      );
      // left column
      gsap.fromTo('.hero-left',
        { opacity: 0, x: -60 },
        { opacity: 1, x: 0, duration: 1, delay: 0.3, ease: 'power3.out' }
      );
      // center spline
      gsap.fromTo('.hero-center',
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1.2, delay: 0.5, ease: 'power2.out' }
      );
      // right column
      gsap.fromTo('.hero-right',
        { opacity: 0, x: 60 },
        { opacity: 1, x: 0, duration: 1, delay: 0.4, ease: 'power3.out' }
      );
      // mobile content
      gsap.fromTo('.hero-mobile',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: 'power3.out' }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={containerRef} className="relative w-full h-screen overflow-hidden bg-bg-dark">
      {/* ── Wallet address — top center ── */}
      <div className="hero-wallet absolute top-16 left-0 w-full text-center z-20 opacity-0">
        <p className="font-mono text-text-muted text-xs tracking-wider">
          0xBE9085f51F17eCecF20407621F7302f9A426c34D
        </p>
      </div>

      {/* ══════════════════════════════════════
          DESKTOP — 3-column layout (md+)
          ══════════════════════════════════════ */}
      <div className="hidden md:grid grid-cols-[30%_40%_30%] h-full items-center relative z-10">

        {/* ── Left column — name + socials ── */}
        <div className="hero-left flex flex-col justify-center pl-8 lg:pl-16 opacity-0">
          <p className="font-mono text-accent-teal text-base lg:text-lg mb-2">Hello! I'm</p>
          <h1 className="font-mono font-bold text-white text-4xl lg:text-6xl xl:text-7xl leading-tight">
            YASWANTH
            <br />
            RAYAPUREDDY
          </h1>
          {/* tagline typing */}
          <TypeAnimation
            sequence={[
              'Building trustless systems on Ethereum & Polygon', 3000,
              '4x Hackathon Winner · 100+ Testnets & Mainnets', 3000,
              'Smart Contracts · IPFS · DeFi · ERC-721 NFTs', 3000,
              'Open to Remote Web3 Internships', 3000,
            ]}
            wrapper="p"
            speed={60}
            repeat={Infinity}
            className="font-mono text-sm text-text-muted mt-4"
          />
          {/* social icons */}
          <div className="mt-6 flex gap-4">
            <a
              href="https://github.com/yaswanth810"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-[#1A2A5A] flex items-center justify-center
                         text-white hover:text-accent-teal hover:border-accent-teal transition-all duration-300
                         hover:shadow-[0_0_12px_rgba(100,200,255,0.2)]"
              aria-label="GitHub"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </a>
            <a
              href="https://linkedin.com/in/yaswanth-rayapureddy"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-[#1A2A5A] flex items-center justify-center
                         text-white hover:text-accent-teal hover:border-accent-teal transition-all duration-300
                         hover:shadow-[0_0_12px_rgba(100,200,255,0.2)]"
              aria-label="LinkedIn"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>

        {/* ── Center column — Spline 3D ── */}
        <div className="hero-center relative h-full flex items-center justify-center opacity-0">
          {/* radial glow behind spline */}
          <div
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              background: `radial-gradient(ellipse 60% 70% at 50% 60%,
                rgba(96,32,192,0.25) 0%,
                rgba(100,200,255,0.08) 50%,
                transparent 100%)`,
            }}
          />
          {/* spline scene */}
          <div className="relative z-[1] w-full h-[85%]">
            <HeroVisual />
          </div>
        </div>

        {/* ── Right column — role + resume ── */}
        <div className="hero-right flex flex-col justify-center items-end pr-8 lg:pr-16 opacity-0">
          <p className="font-mono text-accent-teal text-base lg:text-lg text-right mb-2">
            A Blockchain
          </p>
          <h2 className="font-mono font-bold text-right text-4xl lg:text-6xl xl:text-7xl leading-tight">
            <span className="text-white block">DEVELOPER</span>
          </h2>
          <TypeAnimation
            sequence={[
              'BUILDER', 2000,
              'RESEARCHER', 1500,
              'INNOVATOR', 1500,
            ]}
            wrapper="span"
            speed={50}
            deletionSpeed={60}
            repeat={Infinity}
            cursor={true}
            className="font-mono font-bold text-4xl lg:text-6xl xl:text-7xl text-accent-teal text-right block mt-1"
          />

          {/* resume download */}
          <a
            href="/Yaswanth_Resume.pdf"
            download="Yaswanth_Rayapureddy_Resume.pdf"
            className="inline-flex items-center gap-2 font-mono text-sm text-text-muted
                       hover:text-accent-teal transition-colors mt-6 group"
          >
            RESUME
            <span className="border border-text-muted group-hover:border-accent-teal
                             rounded px-1 py-0.5 text-xs transition-colors">↓</span>
          </a>

          {/* stats */}
          <p className="font-mono text-text-muted text-xs mt-6 text-right tracking-wide">
            4x Hackathon Winner · 100+ Testnets
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════
          MOBILE — stacked layout (below md)
          ══════════════════════════════════════ */}
      <div className="hero-mobile md:hidden flex flex-col items-center justify-center h-full px-6 relative z-10 opacity-0">
        {/* radial glow */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 80% 60% at 50% 45%,
              rgba(96,32,192,0.2) 0%,
              rgba(100,200,255,0.06) 40%,
              transparent 70%)`,
          }}
        />

        <div className="relative z-[1] text-center">
          <p className="font-mono text-accent-teal text-sm mb-2">Hello! I'm</p>
          <h1 className="font-mono font-bold text-white text-4xl leading-tight">
            YASWANTH
            <br />
            RAYAPUREDDY
          </h1>

          {/* Spline on mobile */}
          <div className="w-[260px] h-[220px] mx-auto my-4 relative">
            <HeroVisual />
          </div>

          <p className="font-mono text-accent-teal text-sm mb-1">A Blockchain</p>
          <h2 className="font-mono font-bold text-white text-3xl">DEVELOPER</h2>
          <div className="h-10 mt-1">
            <TypeAnimation
              sequence={[
                'BUILDER', 2000,
                'RESEARCHER', 1500,
                'INNOVATOR', 1500,
              ]}
              wrapper="span"
              speed={50}
              deletionSpeed={60}
              repeat={Infinity}
              cursor={true}
              className="font-mono font-bold text-2xl text-accent-teal"
            />
          </div>
          <TypeAnimation
            sequence={[
              'Building trustless systems on Ethereum & Polygon', 3000,
              '4x Hackathon Winner · 100+ Testnets & Mainnets', 3000,
              'Smart Contracts · IPFS · DeFi · ERC-721 NFTs', 3000,
              'Open to Remote Web3 Internships', 3000,
            ]}
            wrapper="p"
            speed={60}
            repeat={Infinity}
            className="font-mono text-xs text-text-muted mt-4 text-center"
          />

          {/* mobile socials + resume */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <a
              href="https://github.com/yaswanth810"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-[#1A2A5A] flex items-center justify-center
                         text-white hover:text-accent-teal hover:border-accent-teal transition-all"
              aria-label="GitHub"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </a>
            <a
              href="https://linkedin.com/in/yaswanth-rayapureddy"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-[#1A2A5A] flex items-center justify-center
                         text-white hover:text-accent-teal hover:border-accent-teal transition-all"
              aria-label="LinkedIn"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="/Yaswanth_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm text-text-muted hover:text-accent-teal transition-colors"
            >
              RESUME ↓
            </a>
          </div>

          <p className="font-mono text-text-muted text-xs mt-6 tracking-wide">
            4x Hackathon Winner · 100+ Testnets · CGPA 8.75
          </p>
        </div>
      </div>

      {/* ── Block ticker marquee — bottom ── */}
      <div className="absolute bottom-0 left-0 w-full z-20 border-t border-[#1A2A5A] bg-[#080A12]">
        <div className="overflow-hidden py-2">
          <div className="animate-marquee whitespace-nowrap">
            <span className="font-mono text-xs text-text-muted mx-4">
              BLOCK #19847231 · GAS: 12 GWEI · ETH: $3,241 · POLYGON: $0.89 ·
              LATEST TX: 0xBE90...c34D · SOLIDITY 0.8.24 · POLYGON AMOY ·
            </span>
            <span className="font-mono text-xs text-text-muted mx-4">
              BLOCK #19847231 · GAS: 12 GWEI · ETH: $3,241 · POLYGON: $0.89 ·
              LATEST TX: 0xBE90...c34D · SOLIDITY 0.8.24 · POLYGON AMOY ·
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
