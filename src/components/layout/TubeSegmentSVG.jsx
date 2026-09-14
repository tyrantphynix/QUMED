import React from 'react';
import styles from './TubeSegmentSVG.module.css';

export default function TubeSegmentSVG({ 
  pathData, 
  position = 'left', 
  viewBox = '0 0 100 600', 
  style,
  port = null // e.g. { cx: 20, cy: 580 }
}) {
  const alignClass = position === 'left' ? styles.leftAlign : styles.rightAlign;

  return (
    <div className={`${styles.wrapper} ${alignClass}`} style={style} aria-hidden="true">
      <svg 
        className={styles.svg} 
        viewBox={viewBox} 
        fill="none" 
        preserveAspectRatio="xMinYMin meet"
      >
        {/* Outer static tube (Plastic shell) */}
        <path 
          d={pathData} 
          stroke="rgba(0, 103, 255, 0.08)" 
          strokeWidth="14" 
          strokeLinecap="round" 
          fill="none"
        />
        {/* Inner static liquid bed (optional for realism) */}
        <path 
          d={pathData} 
          stroke="rgba(0, 103, 255, 0.04)" 
          strokeWidth="8" 
          strokeLinecap="round" 
          fill="none"
        />
        
        {/* Highlight gloss line for subtle glass/plastic effect */}
        <path 
          d={pathData} 
          stroke="rgba(255, 255, 255, 0.4)" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          fill="none"
          style={{ transform: 'translate(-2px, -2px)' }}
        />

        {/* Inner animated flow 1 (Base smooth liquid pulse) */}
        <path 
          d={pathData} 
          stroke="rgba(0, 103, 255, 0.15)" 
          strokeWidth="4" 
          strokeLinecap="round" 
          fill="none"
          className={styles.flowLine1}
        />
        {/* Inner animated flow 2 (Irregular variation overlay) */}
        <path 
          d={pathData} 
          stroke="rgba(0, 103, 255, 0.25)" 
          strokeWidth="2" 
          strokeLinecap="round" 
          fill="none"
          className={styles.flowLine2}
        />
        
        {/* Subtle Connector/Port */}
        {port && (
          <g transform={`translate(${port.cx}, ${port.cy})`}>
            {/* Port base */}
            <rect x="-10" y="-12" width="20" height="24" rx="4" fill="rgba(240, 245, 255, 0.8)" stroke="rgba(0, 103, 255, 0.2)" strokeWidth="2" />
            {/* Inner channel */}
            <line x1="0" y1="-12" x2="0" y2="12" stroke="rgba(0, 103, 255, 0.4)" strokeWidth="4" strokeLinecap="round" />
            {/* Ridges */}
            <line x1="-12" y1="-4" x2="12" y2="-4" stroke="rgba(0, 103, 255, 0.2)" strokeWidth="2" strokeLinecap="round" />
            <line x1="-12" y1="4" x2="12" y2="4" stroke="rgba(0, 103, 255, 0.2)" strokeWidth="2" strokeLinecap="round" />
          </g>
        )}
      </svg>
    </div>
  );
}
