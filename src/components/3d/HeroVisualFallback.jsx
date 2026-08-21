import React from 'react';

export default function HeroVisualFallback() {
  return (
    <svg 
      width="100%" 
      height="100%" 
      viewBox="0 0 400 400" 
      fill="none" 
      preserveAspectRatio="xMidYMid meet"
      style={{ opacity: 0.6 }}
      aria-hidden="true"
    >
      {/* Abstract Medical Tube / Flow Visualization */}
      <path 
        d="M 350,50 C 350,150 150,150 150,250 C 150,350 50,350 50,450" 
        stroke="rgba(199,219,248,0.2)" 
        strokeWidth="24" 
        strokeLinecap="round" 
        fill="none"
      />
      <path 
        d="M 350,50 C 350,150 150,150 150,250 C 150,350 50,350 50,450" 
        stroke="rgba(0,103,255,0.4)" 
        strokeWidth="8" 
        strokeLinecap="round" 
        fill="none"
      />
      <circle cx="350" cy="50" r="12" fill="rgba(0,103,255,0.6)" />
      <circle cx="150" cy="250" r="6" fill="rgba(0,103,255,0.8)" />
    </svg>
  );
}
