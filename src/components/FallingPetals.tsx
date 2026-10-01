import React, { useMemo } from 'react';

interface FallingPetalsProps {
  enabled: boolean;
}

export const FallingPetals: React.FC<FallingPetalsProps> = ({ enabled }) => {
  const petals = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: `${(i * 5.5 + Math.random() * 5) % 98}%`,
      delay: `${(i * 0.7).toFixed(1)}s`,
      duration: `${(10 + (i % 5) * 2).toFixed(1)}s`,
      size: `${14 + (i % 4) * 5}px`,
      color: i % 3 === 0 ? '#fbcfe8' : i % 3 === 1 ? '#fda4af' : '#ffe4e6',
      opacity: 0.5 + (i % 4) * 0.1,
    }));
  }, []);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden" aria-hidden="true">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute -top-8 animate-petal will-change-transform"
          style={{
            left: petal.left,
            animationDelay: petal.delay,
            animationDuration: petal.duration,
            width: petal.size,
            height: petal.size,
          }}
        >
          <svg
            viewBox="0 0 30 30"
            fill="none"
            className="w-full h-full drop-shadow-sm"
            style={{ opacity: petal.opacity }}
          >
            <path
              d="M15 2 C22 2 28 8 28 15 C28 22 20 28 15 28 C10 28 2 22 2 15 C2 8 8 2 15 2 Z"
              fill={petal.color}
            />
            <path
              d="M15 5 C17 12 17 18 15 25"
              stroke="#fb7185"
              strokeWidth="0.8"
              strokeLinecap="round"
              opacity="0.6"
            />
          </svg>
        </div>
      ))}
    </div>
  );
};
