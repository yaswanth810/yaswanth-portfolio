import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════
   PROJECT PREVIEW — Microlink screenshots
   ═══════════════════════════════════════════ */

function ProjectPreview({ url, alt }: { url: string; alt: string }) {
  const screenshotUrl = `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url`;

  return (
    <div className="relative w-full h-44 overflow-hidden rounded-t-xl bg-[#0A1020]">
      <img
        src={screenshotUrl}
        alt={alt}
        className="w-full h-full object-cover object-top
                   transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = 'none';
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0C1020]" />
    </div>
  );
}

/** EduTrust — branded placeholder (no live URL) */
function EduTrustPlaceholder() {
  return (
    <div className="w-full h-44 rounded-t-xl bg-gradient-to-br from-[#0A1530] to-[#050810]
                    flex items-center justify-center border-b border-[#1A2A5A]">
      <div className="text-center">
        <div className="text-4xl font-mono font-bold text-accent-blue opacity-40">
          EduTrust
        </div>
        <div className="text-xs font-mono text-text-muted mt-2">
          ERC-721 · IPFS · Ethereum Sepolia
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   VISUAL SWITCH
   ═══════════════════════════════════════════ */

function VisualSwitch({ type }: { type: ProjectData['visual'] }) {
  switch (type) {
    case 'trustdrop':
      return <ProjectPreview url="https://trust-drop-henna.vercel.app/" alt="TrustDrop live preview" />;
    case 'edutrust':
      return <EduTrustPlaceholder />;
    case 'voting':
      return <ProjectPreview url="https://voting-proposal.vercel.app/" alt="Voting System live preview" />;
  }
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

function ProjectCard({ project }: { project: ProjectData }) {
  const primaryLink = project.links.find((l) => l.label.includes('Demo')) ?? project.links[0];

  return (
    <div className="project-card group relative bg-[#0C1020] border border-[#1A2A5A] rounded-xl overflow-hidden
                    transition-all duration-300
                    hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(100,200,255,0.15)] hover:border-accent-teal">
      {/* visual area */}
      <VisualSwitch type={project.visual} />

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
