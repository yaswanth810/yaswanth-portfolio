import Spline from '@splinetool/react-spline';
import { Suspense } from 'react';

function SplineScene() {
  return (
    <Spline scene="https://prod.spline.design/jC0soc8RiMJinpJD/scene.splinecode" />
  );
}

export default function HeroVisual() {
  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-16 h-16 border-2 border-accent-teal border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      {/* Clip the bottom 40px to hide "Built with Spline" watermark */}
      <div className="relative w-full h-full overflow-hidden">
        <div className="absolute inset-0" style={{ bottom: '-60px' }}>
          <SplineScene />
        </div>
      </div>
    </Suspense>
  );
}
