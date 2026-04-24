import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ───────────────────────────────────────────
   Skills data
   ─────────────────────────────────────────── */

const SKILLS = [
  'Solidity',
  'Ethereum',
  'Polygon',
  'Hardhat',
  'IPFS',
  'ethers.js',
  'ERC-721',
  'React 18',
  'TypeScript',
  'Tailwind',
  'Python',
  'Flask',
  'PostgreSQL',
  'Git',
];

/* ───────────────────────────────────────────
   About section
   ─────────────────────────────────────────── */

const About = () => {
  const sectionRef = useRef<HTMLElement>(null!);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.about-3d',
        { opacity: 0, x: -80 },
        {
          opacity: 1, x: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.about-section', start: 'top 75%', toggleActions: 'play none none none' },
        }
      );
      gsap.fromTo('.about-text',
        { opacity: 0, x: 80 },
        {
          opacity: 1, x: 0, duration: 1, delay: 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: '.about-section', start: 'top 75%', toggleActions: 'play none none none' },
        }
      );
      gsap.fromTo('.skill-chip',
        { opacity: 0, y: 20, scale: 0.9 },
        {
          opacity: 1, y: 0, scale: 1, stagger: 0.05, ease: 'back.out(1.4)',
          scrollTrigger: { trigger: '.skills-grid', start: 'top 80%', toggleActions: 'play none none none' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="about-section relative w-full min-h-screen bg-bg-dark py-24 px-6 md:px-16 lg:px-24 flex items-center"
    >
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* ── Left: Photo + Code ── */}
        <div className="about-3d flex flex-col items-center justify-center opacity-0">
          {/* profile photo */}
          <div className="relative w-[280px] h-[340px] sm:w-[360px] sm:h-[420px] rounded-2xl overflow-hidden
                          border-2 border-accent-teal/30 shadow-[0_0_40px_rgba(100,200,255,0.1)]
                          group">
            <img
              src="/yaswanth.jpg"
              alt="Yaswanth Rayapureddy at Binance Blockchain Yatra"
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            {/* gradient overlay at bottom */}
            <div
              className="absolute bottom-0 left-0 w-full h-24 pointer-events-none"
              style={{ background: 'linear-gradient(to top, #080A12 0%, transparent 100%)' }}
            />
            {/* teal corner accent */}
            <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-accent-teal rounded-tr-lg" />
            <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-accent-teal rounded-bl-lg" />
          </div>

          {/* code snippet card */}
          <div className="mt-5 w-[320px] sm:w-[400px] bg-[#050810] border border-[#1A2A5A] rounded-xl p-4 font-mono text-xs leading-relaxed overflow-hidden">
            <div className="flex items-center gap-1.5 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
              <span className="ml-2 text-text-muted text-[10px]">TrustDrop.sol</span>
            </div>
            <pre className="text-text-muted whitespace-pre">
<span className="text-accent-teal">contract</span> <span className="text-text-primary">TrustDrop</span> {'{\n'}
{'  '}<span className="text-accent-teal">mapping</span>(<span className="text-accent-blue">address</span> {'=>'} <span className="text-accent-blue">uint256</span>) <span className="text-accent-teal">public</span> donations;{'\n'}
{'\n'}
{'  '}<span className="text-accent-teal">function</span> <span className="text-text-primary">donate</span>() <span className="text-accent-teal">external payable</span> {'{\n'}
{'    '}donations[<span className="text-accent-blue">msg.sender</span>] += <span className="text-accent-blue">msg.value</span>;{'\n'}
{'    '}<span className="text-accent-teal">emit</span> <span className="text-text-primary">DonationReceived</span>(<span className="text-accent-blue">msg.sender</span>, <span className="text-accent-blue">msg.value</span>);{'\n'}
{'  }\n'}
{'}'}
<span className="animate-blink text-accent-teal">▌</span>
            </pre>
          </div>
        </div>

        {/* ── Right: Text content ── */}
        <div className="about-text opacity-0">
          {/* heading */}
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-2">
            About Me
          </h2>
          <div className="w-16 h-0.5 bg-accent-teal mb-8" />

          {/* body */}
          <div className="space-y-5 text-text-muted text-sm sm:text-base leading-relaxed">
            <p>
              I build systems that don't need a middleman to be trusted. Over the
              last few years I've gone deep into blockchain — 100+ testnets and
              mainnets, DeFi protocols, cross‑chain bridging. I understand how
              these systems work at the protocol level, not just the surface.
            </p>
            <p>
              I'm currently studying B.Tech in Information Technology at VIIT
              (CGPA 8.75) and I also lead a 30+ member volunteer team as VP of
              Street Cause NGO. Outside of code, I've organized badminton
              tournaments and managed real payment and registration data
              pipelines.
            </p>
            <p>
              Looking for remote blockchain / Web3 internship roles where I can
              contribute to real protocol work, smart contract development, or
              dApp infrastructure.
            </p>
          </div>

          {/* skills grid */}
          <div className="skills-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-10">
            {SKILLS.map((skill) => (
              <div
                key={skill}
                className="skill-chip border border-accent-blue/30 bg-bg-dark rounded-lg px-3 py-2 text-center
                           font-mono text-xs text-accent-teal opacity-0
                           transition-all duration-200
                           hover:-translate-y-0.5 hover:shadow-[0_0_14px_rgba(100,200,255,0.15)] hover:border-accent-teal/50
                           cursor-default"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
