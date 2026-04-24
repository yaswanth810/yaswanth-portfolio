import { useState, useEffect } from 'react';

const PageLoader = () => {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFading(true), 400);
    const remove = setTimeout(() => setVisible(false), 1400);
    return () => {
      clearTimeout(timer);
      clearTimeout(remove);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[10000] bg-[#080A12] flex items-center justify-center transition-opacity duration-1000 ${
        fading ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <span className="font-mono text-accent-teal text-4xl font-bold animate-pulse">
        YR
      </span>
    </div>
  );
};

export default PageLoader;
