import { useRef, useEffect, useState, useCallback, type FormEvent } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ───────────────────────────────────────────
   EmailJS config from env
   ─────────────────────────────────────────── */

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

/* ───────────────────────────────────────────
   Background 3D torus
   ─────────────────────────────────────────── */

function BackgroundTorus() {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    ref.current.rotation.y += delta * 0.12;
    ref.current.rotation.x += delta * 0.06;
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[2.2, 0.6, 32, 64]} />
      <meshStandardMaterial color="#64C8FF" wireframe transparent opacity={0.15} />
    </mesh>
  );
}

function TorusScene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight color="#64C8FF" position={[2, 3, 2]} intensity={0.6} />
      <BackgroundTorus />
    </>
  );
}

/* ───────────────────────────────────────────
   Contact details data
   ─────────────────────────────────────────── */

const CONTACT_DETAILS = [
  { icon: '📧', text: 'yaswanthrayapureddy810@gmail.com', href: 'mailto:yaswanthrayapureddy810@gmail.com' },
  { icon: '🔗', text: 'linkedin.com/in/yaswanth-rayapureddy', href: 'https://linkedin.com/in/yaswanth-rayapureddy' },
  { icon: '💻', text: 'github.com/yaswanth810', href: 'https://github.com/yaswanth810' },
  { icon: '🔗', text: '0xBE9085f51F17eCecF20407621F7302f9A426c34D', href: undefined },
];

/* ───────────────────────────────────────────
   Contact section
   ─────────────────────────────────────────── */

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null!);

  const [sending, setSending] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  /* ── GSAP scroll animation ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-left',
        { opacity: 0, x: -60 },
        {
          opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.contact-section', start: 'top 75%', toggleActions: 'play none none none' },
        }
      );
      gsap.fromTo('.contact-right',
        { opacity: 0, x: 60 },
        {
          opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.contact-section', start: 'top 75%', toggleActions: 'play none none none' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* ── Form submit ── */
  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_name: 'Yaswanth',
        },
        EMAILJS_PUBLIC_KEY,
      );
      toast.success("Message sent! I'll respond within 24 hours.", {
        style: {
          background: '#0C1020',
          color: '#64C8FF',
          border: '1px solid #1A2A5A',
          fontFamily: 'monospace',
          fontSize: '13px',
        },
        duration: 5000,
      });
      setFormData({ name: '', email: '', message: '' });
    } catch {
      toast.error('Something went wrong. Email me directly.', {
        style: {
          background: '#0C1020',
          color: '#FF6464',
          border: '1px solid #3A1A1A',
          fontFamily: 'monospace',
        },
      });
    } finally {
      setSending(false);
    }
  }, [formData]);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="contact-section relative w-full min-h-screen bg-bg-dark py-24 px-6 md:px-16 lg:px-24 flex items-center"
    >
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* ── Left column ── */}
        <div className="contact-left opacity-0">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-2">
            Let's Build Something
          </h2>
          <div className="w-16 h-0.5 bg-accent-teal mb-4" />
          <p className="text-accent-teal text-sm font-mono mb-10">
            Open to remote blockchain / Web3 internships
          </p>

          {/* contact details */}
          <div className="space-y-4 mb-10">
            {CONTACT_DETAILS.map((d, i) => {
              const inner = (
                <span className="font-mono text-xs sm:text-sm text-text-primary break-all">
                  <span className="mr-2">{d.icon}</span>
                  {d.text}
                </span>
              );

              return (
                <div
                  key={i}
                  className="bg-[#0C1020] border border-[#1A2A5A] rounded-lg px-4 py-3
                             transition-colors hover:border-accent-teal/40"
                >
                  {d.href ? (
                    <a
                      href={d.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="no-underline"
                    >
                      {inner}
                    </a>
                  ) : (
                    inner
                  )}
                </div>
              );
            })}
          </div>

          {/* social buttons */}
          <div className="flex gap-4">
            <a
              href="https://linkedin.com/in/yaswanth-rayapureddy"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-accent-blue/40 text-accent-teal
                         hover:bg-accent-teal/10 hover:border-accent-teal/60
                         font-semibold text-xs px-5 py-2.5 rounded-full transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
            <a
              href="https://github.com/yaswanth810"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-accent-blue/40 text-accent-teal
                         hover:bg-accent-teal/10 hover:border-accent-teal/60
                         font-semibold text-xs px-5 py-2.5 rounded-full transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              GitHub
            </a>
          </div>
        </div>

        {/* ── Right column — form with 3D background ── */}
        <div className="contact-right relative opacity-0">
          {/* background 3D torus */}
          <div className="absolute inset-0 pointer-events-none z-0 rounded-2xl overflow-hidden">
            <Canvas
              camera={{ position: [0, 0, 5], fov: 50 }}
              gl={{ antialias: true, alpha: true }}
              style={{ background: 'transparent' }}
            >
              <TorusScene />
            </Canvas>
          </div>

          {/* form */}
          <form
            onSubmit={handleSubmit}
            className="relative z-10 bg-[#0C1020]/80 backdrop-blur-md border border-[#1A2A5A] rounded-2xl p-8 space-y-5"
          >
            <div>
              <label htmlFor="contact-name" className="block text-text-muted text-xs font-mono mb-1.5">
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                required
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                className="w-full bg-[#0C1020] border border-[#1A2A5A] focus:border-accent-teal
                           rounded-lg p-3 font-mono text-sm text-text-primary
                           outline-none transition-colors placeholder:text-text-muted/40"
              />
            </div>

            <div>
              <label htmlFor="contact-email" className="block text-text-muted text-xs font-mono mb-1.5">
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                required
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                className="w-full bg-[#0C1020] border border-[#1A2A5A] focus:border-accent-teal
                           rounded-lg p-3 font-mono text-sm text-text-primary
                           outline-none transition-colors placeholder:text-text-muted/40"
              />
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-text-muted text-xs font-mono mb-1.5">
                Message
              </label>
              <textarea
                id="contact-message"
                required
                rows={5}
                placeholder="What would you like to build?"
                value={formData.message}
                onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                className="w-full bg-[#0C1020] border border-[#1A2A5A] focus:border-accent-teal
                           rounded-lg p-3 font-mono text-sm text-text-primary resize-none
                           outline-none transition-colors placeholder:text-text-muted/40"
              />
            </div>

            {/* submit */}
            <button
              type="submit"
              disabled={sending}
              className="w-full py-3 rounded-lg font-mono text-sm font-medium
                         bg-accent-teal text-bg-dark hover:bg-accent-teal/90
                         disabled:opacity-50 disabled:cursor-not-allowed
                         transition-all duration-300"
            >
              {sending ? 'Sending...' : 'Send Message →'}
            </button>

            {/* resume download */}
            <a
              href="/Yaswanth_Resume.pdf"
              download="Yaswanth_Rayapureddy_Resume.pdf"
              className="w-full flex items-center justify-center gap-3
                         border border-accent-teal text-accent-teal font-mono text-sm
                         py-3 rounded-lg hover:bg-accent-teal hover:text-bg-dark
                         transition-all duration-300 mt-4"
            >
              ↓ Download Resume
            </a>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;

