import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

/* ───────────────────────────────────────────
   Mouse tracking (shared across scene)
   ─────────────────────────────────────────── */

const mouse = { x: 0, y: 0 };

function useMouseTrack() {
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);
}

/* ───────────────────────────────────────────
   Main wireframe icosahedron
   ─────────────────────────────────────────── */

function MainIcosahedron() {
  const ref = useRef<THREE.Mesh>(null!);
  const targetRotX = useRef(0);
  const targetRotY = useRef(0);

  useFrame(() => {
    // slow constant Y rotation
    ref.current.rotation.y += 0.003;

    // mouse-driven tilt (lerp)
    targetRotX.current = mouse.y * 0.3;
    targetRotY.current = mouse.x * 0.3;
    ref.current.rotation.x += (targetRotX.current - ref.current.rotation.x) * 0.05;
    // add mouse Y influence on top of constant rotation
    const currentY = ref.current.rotation.y;
    ref.current.rotation.y = currentY + (targetRotY.current - (currentY % (Math.PI * 2))) * 0.01;
  });

  return (
    <mesh ref={ref} position={[1.5, 0, 0]}>
      <icosahedronGeometry args={[1.8, 1]} />
      <meshStandardMaterial color="#64C8FF" wireframe />
    </mesh>
  );
}

/* ───────────────────────────────────────────
   Orbiting octahedron
   ─────────────────────────────────────────── */

function OrbitingOctahedron() {
  const groupRef = useRef<THREE.Group>(null!);
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.5;
    // orbit around main icosahedron position (1.5, 0, 0)
    groupRef.current.position.set(
      1.5 + Math.cos(t) * 3,
      Math.sin(t * 0.7) * 1.5,
      Math.sin(t) * 3,
    );
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.015;
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        <octahedronGeometry args={[0.6, 0]} />
        <meshStandardMaterial color="#3C78DC" wireframe />
      </mesh>
    </group>
  );
}

/* ───────────────────────────────────────────
   500 particles in sphere radius 12
   ─────────────────────────────────────────── */

function Particles() {
  const ref = useRef<THREE.Points>(null!);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const count = 500;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 12 * Math.cbrt(Math.random());
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    geo.setAttribute('position', new THREE.BufferAttribute(arr, 3));
    return geo;
  }, []);

  useFrame((_, delta) => {
    ref.current.rotation.y += delta * 0.02;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        color="#3C78DC"
        size={0.015}
        sizeAttenuation
        transparent
        opacity={0.8}
      />
    </points>
  );
}

/* ───────────────────────────────────────────
   Camera controller (resize-safe)
   ─────────────────────────────────────────── */

function CameraSetup() {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 0, 5);
    (camera as THREE.PerspectiveCamera).fov = 75;
    (camera as THREE.PerspectiveCamera).updateProjectionMatrix();
  }, [camera]);

  return null;
}

/* ───────────────────────────────────────────
   Complete scene
   ─────────────────────────────────────────── */

function Scene() {
  useMouseTrack();

  return (
    <>
      <CameraSetup />
      <ambientLight color="#ffffff" intensity={0.8} />
      <pointLight color="#64C8FF" intensity={2} distance={10} position={[3, 3, 3]} />
      <pointLight color="#3C78DC" intensity={1.5} position={[-3, -2, 2]} />

      <MainIcosahedron />
      <OrbitingOctahedron />
      <Particles />
    </>
  );
}

/* ───────────────────────────────────────────
   Overlay (HTML)
   ─────────────────────────────────────────── */

const TAGS = ['Solidity', 'Ethereum', 'Polygon', 'IPFS', 'ethers.js', 'React'];

function HeroOverlay() {
  const containerRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-title',
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      );
      gsap.fromTo('.hero-sub',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: 'power3.out' }
      );
      gsap.fromTo('.hero-tags span',
        { opacity: 0, y: 20, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.08, delay: 0.6, ease: 'back.out(1.7)' }
      );
      gsap.fromTo('.hero-btns',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 1.0 }
      );
      gsap.fromTo('.hero-stats',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, delay: 1.2 }
      );
      gsap.fromTo('.hero-wallet',
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, delay: 0.1 }
      );
      gsap.fromTo('.hero-divider',
        { opacity: 0, scaleX: 0 },
        { opacity: 1, scaleX: 1, duration: 0.6, delay: 0.5, ease: 'power2.out' }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative z-10 flex flex-col items-center justify-center h-full pointer-events-none select-none px-4"
    >
      {/* wallet address */}
      <p className="hero-wallet font-mono text-text-muted text-xs sm:text-sm tracking-wider mb-6 opacity-0">
        0xBE9085f51F17eCecF20407621F7302f9A426c34D
      </p>

      {/* name */}
      <h1
        className="hero-title font-mono font-bold text-white leading-none tracking-tight text-center opacity-0"
        style={{ fontSize: 'clamp(40px, 8vw, 72px)' }}
      >
        YASWANTH
      </h1>

      {/* surname */}
      <h2
        className="hero-sub font-mono text-accent-teal leading-none tracking-tight text-center mt-1 opacity-0"
        style={{ fontSize: 'clamp(26px, 5vw, 44px)' }}
      >
        RAYAPUREDDY
      </h2>

      {/* divider */}
      <div className="hero-divider w-24 h-px bg-accent-blue my-5 opacity-0" />

      {/* role */}
      <p className="hero-sub text-text-primary text-base sm:text-xl font-sans opacity-0">
        Blockchain &amp; Web3 Developer
      </p>

      {/* tags */}
      <div className="hero-tags flex flex-wrap justify-center gap-2 mt-5">
        {TAGS.map((tag) => (
          <span
            key={tag}
            className="border border-accent-blue bg-bg-dark/50 text-accent-teal font-mono text-xs px-3 py-1 rounded-full backdrop-blur-sm opacity-0"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* CTA buttons */}
      <div className="hero-btns flex gap-4 mt-8 pointer-events-auto opacity-0">
        <a
          href="#projects"
          className="bg-accent-teal hover:bg-accent-teal/80 text-bg-dark font-semibold text-sm px-6 py-2.5 rounded-full transition-colors"
        >
          View Projects
        </a>
        <a
          href="https://github.com/yaswanth810"
          target="_blank"
          rel="noopener noreferrer"
          className="border border-accent-teal text-accent-teal hover:bg-accent-teal/10 font-semibold text-sm px-6 py-2.5 rounded-full transition-colors"
        >
          GitHub
        </a>
      </div>

      {/* stats */}
      <p className="hero-stats font-mono text-text-muted text-xs sm:text-sm mt-10 tracking-wide opacity-0">
        4x Hackathon Winner · 100+ Testnets · CGPA 8.75
      </p>
    </div>
  );
}

/* ───────────────────────────────────────────
   Hero — exported default
   ─────────────────────────────────────────── */

const Hero = () => {
  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden bg-bg-dark">
      {/* 3D canvas — absolute fill */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <Canvas
          gl={{ antialias: true, alpha: false }}
          style={{ background: '#080A12', width: '100%', height: '100%' }}
        >
          <Scene />
        </Canvas>
      </div>

      {/* radial gradient overlay — fades edges to dark */}
      <div
        className="absolute top-0 left-0 w-full h-full z-[5] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, #080A12 100%)',
        }}
      />

      {/* text overlay */}
      <HeroOverlay />

      {/* block ticker marquee */}
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
