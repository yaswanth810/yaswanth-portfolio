import { useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';

interface PageLoaderProps {
  onComplete: () => void;
}

export default function PageLoader({ onComplete }: PageLoaderProps) {
  const [progress, setProgress] = useState(0);

  const handleComplete = useCallback(() => {
    gsap.to('.page-loader', {
      yPercent: -100,
      duration: 0.8,
      ease: 'power3.inOut',
      onComplete,
    });
  }, [onComplete]);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return Math.min(p + Math.random() * 15, 100);
      });
    }, 100);

    // After 1.8s, animate out
    const timeout = setTimeout(handleComplete, 1800);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [handleComplete]);

  return (
    <div className="page-loader fixed inset-0 bg-[#080A12] z-[99999]
                    flex flex-col items-center justify-center">
      {/* Logo */}
      <div className="font-mono font-bold text-5xl text-accent-teal mb-8 tracking-widest">
        YR
      </div>

      {/* Loading bar */}
      <div className="w-48 h-px bg-[#1A2A5A] relative overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-accent-teal transition-all duration-100"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>

      {/* Loading percentage */}
      <p className="font-mono text-xs text-text-muted mt-4">
        {Math.min(Math.floor(progress), 100)}%
      </p>

      {/* Blockchain flavor text */}
      <p className="font-mono text-xs text-[#1A2A5A] mt-2">
        Initializing blockchain context...
      </p>
    </div>
  );
}
