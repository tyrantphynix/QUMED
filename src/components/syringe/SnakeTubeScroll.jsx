import React, { useEffect, useRef, useState } from 'react';

/**
 * SnakeTubeScroll — Continuous medical silicone tube snaking through the website.
 * Originates from the syringe in Hero and weaves like a snake past all sections.
 * The purple-blue medical fluid flows dynamically in sync with page scroll.
 */
export default function SnakeTubeScroll() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [pageHeight, setPageHeight] = useState(4000);
  const [pageWidth, setPageWidth] = useState(1200);

  const pathRef = useRef(null);
  const [pathLength, setPathLength] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const progress = Math.max(0, Math.min(1, window.scrollY / docHeight));
      setScrollProgress(progress);
    };

    const handleResize = () => {
      const main = document.querySelector('main');
      if (main) {
        setPageHeight(main.offsetHeight || 4000);
      }
      setPageWidth(window.innerWidth);
      if (pathRef.current) {
        setPathLength(pathRef.current.getTotalLength());
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    handleScroll();
    handleResize();

    // Re-measure after images and fonts load
    const timer = setTimeout(handleResize, 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, [pageHeight, pageWidth]);

  const isMobile = pageWidth < 768;

  // Generate responsive snake path points through the website:
  // Starts near Hero syringe, waves left, right, left, right down through sections.
  const pathD = isMobile
    ? `M ${pageWidth * 0.5},180 
       C ${pageWidth * 0.1},350 ${pageWidth * 0.05},550 ${pageWidth * 0.4},750
       C ${pageWidth * 0.85},950 ${pageWidth * 0.95},1200 ${pageWidth * 0.5},1450
       C ${pageWidth * 0.05},1700 ${pageWidth * 0.1},1950 ${pageWidth * 0.6},2250
       C ${pageWidth * 0.9},2550 ${pageWidth * 0.85},2850 ${pageWidth * 0.3},3150
       C ${pageWidth * 0.1},3400 ${pageWidth * 0.3},3700 ${pageWidth * 0.5},${pageHeight - 200}`
    : `M ${pageWidth * 0.72},460 
       C ${pageWidth * 0.45},600 ${pageWidth * 0.15},700 ${pageWidth * 0.12},950
       C ${pageWidth * 0.08},1200 ${pageWidth * 0.35},1350 ${pageWidth * 0.75},1550
       C ${pageWidth * 0.92},1750 ${pageWidth * 0.88},2050 ${pageWidth * 0.45},2250
       C ${pageWidth * 0.12},2450 ${pageWidth * 0.15},2750 ${pageWidth * 0.65},3050
       C ${pageWidth * 0.90},3300 ${pageWidth * 0.75},3600 ${pageWidth * 0.35},${pageHeight - 350}`;

  // Fluid fills from start to end as user scrolls
  const fillProgress = Math.min(1, 0.15 + (scrollProgress * 0.88));
  const strokeDashoffset = pathLength > 0 ? pathLength * (1 - fillProgress) : 0;
  const pulseOffset = (scrollProgress * 600) % 80;

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: `${pageHeight}px`,
        pointerEvents: 'none',
        zIndex: 2,
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      <svg
        width={pageWidth}
        height={pageHeight}
        viewBox={`0 0 ${pageWidth} ${pageHeight}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        <defs>
          {/* Glowing Filter for Medical Fluid Stream */}
          <filter id="snakeFluidGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Fluid Stream Gradient */}
          <linearGradient id="snakeFluidGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="30%" stopColor="#4F46E5" />
            <stop offset="70%" stopColor="#4338CA" />
            <stop offset="100%" stopColor="#3730A3" />
          </linearGradient>
        </defs>

        {/* 1. Outer Transparent Silicone Medical Tube */}
        <path
          d={pathD}
          stroke="rgba(255, 255, 255, 0.22)"
          strokeWidth={isMobile ? 10 : 16}
          strokeLinecap="round"
          fill="none"
        />

        {/* 2. Silicone Tube Gloss Highlight */}
        <path
          d={pathD}
          stroke="rgba(255, 255, 255, 0.55)"
          strokeWidth={isMobile ? 1.5 : 2.5}
          strokeLinecap="round"
          fill="none"
        />

        {/* 3. Real-Time Flowing Liquid Stream (Advances with Scroll) */}
        <path
          ref={pathRef}
          d={pathD}
          stroke="url(#snakeFluidGradient)"
          strokeWidth={isMobile ? 5 : 8}
          strokeLinecap="round"
          fill="none"
          filter="url(#snakeFluidGlow)"
          strokeDasharray={pathLength || 6000}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: 'stroke-dashoffset 0.12s ease-out' }}
        />

        {/* 4. Fluid Pulse & Flow Wave inside the Stream */}
        <path
          d={pathD}
          stroke="#A5B4FC"
          strokeWidth={isMobile ? 2.5 : 3.5}
          strokeLinecap="round"
          fill="none"
          strokeDasharray="24 16"
          strokeDashoffset={pulseOffset}
          opacity={0.85}
          style={{
            strokeDasharray: '24 16',
            transition: 'stroke-dashoffset 0.08s ease-out',
          }}
        />
      </svg>
    </div>
  );
}
