import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════
   CARD TOP VISUALS
   ═══════════════════════════════════════════ */

/** TrustDrop — live site iframe preview */
function TrustDropVisual() {
  return (
    <div className="relative w-full h-[200px] overflow-hidden bg-[#0A1020] rounded-t-xl">
      <iframe
        src="https://trust-drop-henna.vercel.app/"
        title="TrustDrop Preview"
        className="absolute top-0 left-0 border-none pointer-events-none"
        style={{
          width: '200%',
          height: '200%',
          transform: 'scale(0.5)',
          transformOrigin: 'top left',
        }}
        loading="lazy"
        sandbox="allow-scripts allow-same-origin"
      />
      {/* bottom fade gradient */}
      <div
        className="absolute bottom-0 left-0 w-full h-20 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #0C1020 0%, transparent 100%)' }}
      />
    </div>
  );
}

/** EduTrust — floating hexagons in Three.js */
function HexagonMesh({ position, scale }: { position: [number, number, number]; scale: number }) {
  const ref = useRef<THREE.Mesh>(null!);
  const speed = useRef(0.3 + Math.random() * 0.4);

  useFrame((_, delta) => {
    ref.current.rotation.y += delta * speed.current;
    ref.current.rotation.z += delta * 0.15;
    ref.current.position.y += Math.sin(Date.now() * 0.001 + position[0]) * 0.002;
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <cylinderGeometry args={[0.4, 0.4, 0.08, 6]} />
      <meshStandardMaterial
        color="#1A3080"
        emissive="#0A1A4A"
        emissiveIntensity={0.3}
        metalness={0.6}
        roughness={0.3}
      />
      {/* border ring */}
      <mesh>
        <torusGeometry args={[0.4, 0.015, 8, 6]} />
        <meshStandardMaterial color="#64C8FF" emissive="#64C8FF" emissiveIntensity={0.6} />
      </mesh>
    </mesh>
  );
}

function EduTrustScene() {
  const hexPositions: { pos: [number, number, number]; s: number }[] = [
    { pos: [0, 0, 0], s: 1.2 },
    { pos: [-1.5, 0.6, -0.5], s: 0.8 },
    { pos: [1.4, -0.3, 0.3], s: 0.9 },
    { pos: [-0.8, -0.8, 0.6], s: 0.7 },
    { pos: [0.9, 0.9, -0.4], s: 0.6 },
    { pos: [-1.8, -0.5, -0.8], s: 0.5 },
  ];

  return (
    <>
      <ambientLight color="#ffffff" intensity={0.5} />
      <directionalLight color="#64C8FF" intensity={1.5} position={[3, 4, 3]} />
      <pointLight color="#3C78DC" intensity={1} position={[-2, -1, 2]} />
      {hexPositions.map((h, i) => (
        <HexagonMesh key={i} position={h.pos} scale={h.s} />
      ))}
    </>
  );
}

function EduTrustVisual() {
  return (
    <div className="relative w-full h-[200px] overflow-hidden bg-[#0A1020] rounded-t-xl">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        gl={{ antialias: true, alpha: false }}
        style={{ background: '#0A1020' }}
      >
        <EduTrustScene />
      </Canvas>
      <div
        className="absolute bottom-0 left-0 w-full h-12 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #0C1020 0%, transparent 100%)' }}
      />
    </div>
  );
}

/** Voting — CSS animated bar chart */
function VotingVisual() {
  const bars = [
    { height: 72, delay: '0s' },
    { height: 48, delay: '0.1s' },
    { height: 88, delay: '0.2s' },
    { height: 56, delay: '0.3s' },
    { height: 64, delay: '0.4s' },
  ];

  return (
    <div className="relative w-full h-[200px] overflow-hidden bg-[#0A1020] rounded-t-xl flex flex-col items-center justify-end px-8 pb-5 pt-4">
      <span className="absolute top-4 left-5 font-mono text-[11px] text-accent-teal tracking-widest uppercase">
        Live Votes
      </span>
      <div className="flex items-end gap-3 w-full justify-center h-[140px]">
        {bars.map((bar, i) => (
          <div
            key={i}
            className="flex-1 max-w-[48px] rounded-t-md animate-bar-rise"
            style={{
              height: `${bar.height}%`,
              background: `linear-gradient(to top, #3C78DC, #64C8FF)`,
              animationDelay: bar.delay,
              opacity: 0.85,
            }}
          />
        ))}
      </div>
      <div className="flex gap-3 w-full justify-center mt-2">
        {['A', 'B', 'C', 'D', 'E'].map((l) => (
          <span key={l} className="flex-1 max-w-[48px] text-center font-mono text-[10px] text-text-muted">
            {l}
          </span>
        ))}
      </div>
      <div
        className="absolute bottom-0 left-0 w-full h-8 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #0C1020 0%, transparent 100%)' }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════
   PROJECT DATA
   ═══════════════════════════════════════════ */

interface ProjectData {
  title: string;
  badge: string;
  badgeColor: string;
  subtitle: string;
  description: string;
  stack: string[];
  contract?: string;
  links: { label: string; href: string }[];
  visual: 'trustdrop' | 'edutrust' | 'voting';
  chainBadge: string;
}

const PROJECTS: ProjectData[] = [
  {
    title: 'TrustDrop',
    badge: '🏆 SUS Hacks 2026 Winner',
    badgeColor: 'text-yellow-400 border-yellow-500/40 bg-yellow-500/10',
    subtitle: 'NGO Fund Transparency Platform',
    description:
      'Blockchain platform that makes NGO donations fully traceable on-chain. Milestone-based fund release, USDC stablecoins, IPFS proof-of-spend, anti-fraud logic baked into Solidity contracts. UPI on-ramp for INR → USDC.',
    stack: ['Solidity', 'Polygon Amoy', 'USDC', 'IPFS', 'React', 'TypeScript'],
    links: [
      { label: 'Live Demo →', href: 'https://trust-drop-henna.vercel.app/' },
      { label: 'GitHub', href: 'https://github.com/yaswanth810/TRUST_DROP' },
    ],
    visual: 'trustdrop',
    chainBadge: '✓ Deployed: Polygon Amoy',
  },
  {
    title: 'EduTrust',
    badge: '🥉 Piston Cup 2025',
    badgeColor: 'text-orange-300 border-orange-400/40 bg-orange-400/10',
    subtitle: 'Blockchain Certificate Verification',
    description:
      'Tamper-proof academic credentials as ERC-721 NFTs on Ethereum. RBAC with 3 contract roles, IPFS via Pinata, QR code validation, OCR-powered legacy certificate digitization, Web3Modal v3 multi-wallet support.',
    stack: ['Solidity', 'ERC-721', 'IPFS', 'Hardhat', 'ethers.js', 'OpenZeppelin'],
    contract: '0x754F223698E00B36b150B98B748E42DAfaE11C1D',
    links: [
      { label: 'GitHub', href: 'https://github.com/yaswanth810/certificate-validation-for-academic' },
    ],
    visual: 'edutrust',
    chainBadge: '✓ Verified on Sourcify',
  },
  {
    title: 'Decentralized Voting System',
    badge: '',
    badgeColor: '',
    subtitle: 'Trustless On-Chain Governance',
    description:
      'Governance platform on Ethereum Sepolia. RBAC, one-vote enforcement, full proposal lifecycle, Recharts vote analytics dashboard, auto network switching.',
    stack: ['Solidity', 'Ethereum Sepolia', 'ethers.js', 'React 18', 'TypeScript', 'Recharts'],
    links: [
      { label: 'Live Demo →', href: 'https://voting-proposal.vercel.app/' },
      { label: 'GitHub', href: 'https://github.com/yaswanth810/voting-proposal' },
    ],
    visual: 'voting',
    chainBadge: '✓ Deployed: Ethereum Sepolia',
  },
];

/* ═══════════════════════════════════════════
   PROJECT CARD
   ═══════════════════════════════════════════ */

function VisualSwitch({ type }: { type: ProjectData['visual'] }) {
  switch (type) {
    case 'trustdrop':
      return <TrustDropVisual />;
    case 'edutrust':
      return <EduTrustVisual />;
    case 'voting':
      return <VotingVisual />;
  }
}

function ProjectCard({ project }: { project: ProjectData }) {
  const primaryLink = project.links.find((l) => l.label.includes('Demo')) ?? project.links[0];

  return (
    <div className="project-card group relative bg-[#0C1020] border border-[#1A2A5A] rounded-xl overflow-hidden
                    transition-all duration-300
                    hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(100,200,255,0.15)] hover:border-accent-teal">
      {/* visual area */}
      <div className="overflow-hidden transition-transform duration-300 group-hover:scale-[1.05] origin-center">
        <VisualSwitch type={project.visual} />
      </div>

      {/* content */}
      <div className="p-6">
        {/* title row */}
        <div className="flex flex-wrap items-center gap-3 mb-1">
          <h3 className="text-lg font-bold text-text-primary">{project.title}</h3>
          {project.badge && (
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${project.badgeColor}`}>
              {project.badge}
            </span>
          )}
        </div>

        {/* subtitle */}
        <p className="text-accent-teal text-sm font-mono mb-3">{project.subtitle}</p>

        {/* description */}
        <p className="text-text-muted text-sm leading-relaxed mb-4">{project.description}</p>

        {/* contract */}
        {project.contract && (
          <p className="text-text-muted/60 text-[11px] font-mono mb-4 break-all">
            Deployed: {project.contract}
          </p>
        )}

        {/* stack chips */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="border border-accent-blue/30 bg-bg-dark/60 text-accent-teal font-mono text-[11px] px-2.5 py-0.5 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* chain badge */}
        <div className="mb-4">
          <span className="text-[10px] font-mono text-green-400 bg-green-400/10 px-2 py-1 rounded">
            {project.chainBadge}
          </span>
        </div>

        {/* action buttons */}
        <div className="flex gap-3">
          {project.links.map((link) => {
            const isPrimary = link.label.includes('Demo');
            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={
                  isPrimary
                    ? 'bg-accent-teal hover:bg-accent-teal/80 text-bg-dark font-semibold text-xs px-4 py-2 rounded-full transition-colors'
                    : 'border border-accent-teal/60 text-accent-teal hover:bg-accent-teal/10 font-semibold text-xs px-4 py-2 rounded-full transition-colors'
                }
              >
                {link.label}
              </a>
            );
          })}
        </div>
      </div>

      {/* slide-up pill on hover */}
      <a
        href={primaryLink.href}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-0 left-0 w-full py-2.5 bg-accent-teal text-bg-dark font-mono text-xs font-semibold
                   text-center translate-y-full group-hover:translate-y-0 transition-transform duration-300"
      >
        View Project →
      </a>
    </div>
  );
}

/* ═══════════════════════════════════════════
   PROJECTS SECTION
   ═══════════════════════════════════════════ */

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null!);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.project-card',
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, stagger: 0.2, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.projects-section', start: 'top 70%', toggleActions: 'play none none none' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="projects-section relative w-full min-h-screen bg-bg-dark py-24 px-6 md:px-16 lg:px-24"
    >
      <div className="max-w-6xl mx-auto">
        {/* heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-2">
          Featured Projects
        </h2>
        <div className="w-16 h-0.5 bg-accent-teal mb-14" />

        {/* cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
