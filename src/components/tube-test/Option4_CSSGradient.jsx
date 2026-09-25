import React, { useRef, useEffect, useState } from 'react';

export default function Option4CSSGradient({ progress }) {
  const pathD = "M 160 80 C 300 80, 300 260, 160 260 C 20 260, 20 440, 160 440";
  const pathRef = useRef(null);
  const [pathLength, setPathLength] = useState(1000);

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, []);

  const strokeDashoffset = pathLength * (1 - progress);

  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute' }}>
      <svg width="100%" height="100%" viewBox="0 0 350 500">
        <defs>
          <linearGradient id="fluidCrossSection" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(100, 200, 255, 0.9)" />
            <stop offset="50%" stopColor="rgba(0, 120, 255, 0.7)" />
            <stop offset="100%" stopColor="rgba(0, 60, 180, 0.9)" />
          </linearGradient>
        </defs>

        {/* 1. Base Shadow/Rim (Visible on light backgrounds) */}
        <path
          d={pathD}
          stroke="rgba(20, 45, 90, 0.25)"
          strokeWidth="20"
          fill="none"
          strokeLinecap="round"
        />

        {/* 2. Outer Glass Tube Body */}
        <path
          d={pathD}
          stroke="rgba(220, 235, 255, 0.45)"
          strokeWidth="16"
          fill="none"
          strokeLinecap="round"
        />

        {/* 3. Inner Lumen/Hollow */}
        <path
          d={pathD}
          stroke="rgba(255, 255, 255, 0.25)"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
        />

        {/* Hidden path just to measure length */}
        <path
          ref={pathRef}
          d={pathD}
          stroke="none"
          fill="none"
        />

        {/* 4. Inner Fluid (Animated) */}
        <path
          d={pathD}
          stroke="url(#fluidCrossSection)"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${pathLength} ${pathLength}`}
          strokeDashoffset={strokeDashoffset}
        />
        
        {/* 5. Fluid Core Highlight (gives the fluid depth) */}
        <path
          d={pathD}
          stroke="rgba(255, 255, 255, 0.6)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${pathLength} ${pathLength}`}
          strokeDashoffset={strokeDashoffset}
        />

        {/* 6. Specular line (Outer Tube Glare) */}
        <path
          d={pathD}
          stroke="rgba(255, 255, 255, 0.95)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          style={{ transform: 'translate(-3px, -2px)' }}
        />
      </svg>
    </div>
  );
}
