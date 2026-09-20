import React from 'react';
import SyringeSVG from './SyringeSVG';

export default function HeroVisualFallback() {
  return (
    <div 
      style={{ 
        width: '100%', 
        height: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        opacity: 0.85,
        padding: '20px'
      }}
      aria-hidden="true"
    >
      <SyringeSVG scrollProgress={0} />
    </div>
  );
}
