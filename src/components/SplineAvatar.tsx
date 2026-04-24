import Spline from '@splinetool/react-spline';
import { Suspense } from 'react';

function SplineScene() {
  return (
    <Spline scene="https://prod.spline.design/IBPyK3TvwSJ-z8-N/scene.splinecode" />
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
      <SplineScene />
    </Suspense>
  );
}
