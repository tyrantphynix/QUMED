import React, { useRef, useEffect, useState } from 'react';

export default function Option2SVGFilters({ progress }) {
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
          <filter id="tube3D" x="-20%" y="-20%" width="140%" height="140%">
            {/* Create a soft height map from the stroke */}
            <feGaussianBlur in="SourceAlpha" stdDeviation="6" result="blur" />
            
            {/* Diffuse lighting for round cylindrical shape */}
            <feDiffuseLighting in="blur" surfaceScale="5" diffuseConstant="1" lightingColor="#ffffff" result="diffuse">
              <fePointLight x="100" y="50" z="50" />
            </feDiffuseLighting>
            
            {/* Specular lighting for the bright glare */}
            <feSpecularLighting in="blur" surfaceScale="5" specularConstant="1.5" specularExponent="40" lightingColor="#ffffff" result="specular">
              <fePointLight x="50" y="0" z="80" />
            </feSpecularLighting>
            
            {/* Combine lighting with the original semi-transparent tube color */}
            <feComposite in="diffuse" in2="SourceGraphic" operator="in" result="litTube" />
            <feComposite in="specular" in2="litTube" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" />
          </filter>
        </defs>

        {/* Outer Glass Tube with 3D filter */}
        <path
          d={pathD}
          stroke="rgba(200, 220, 255, 0.5)"
          strokeWidth="24"
          fill="none"
          strokeLinecap="round"
          filter="url(#tube3D)"
        />

        {/* Hidden path just to measure length */}
        <path
          ref={pathRef}
          d={pathD}
          stroke="none"
          fill="none"
        />

        {/* Inner Fluid */}
        <path
          d={pathD}
          stroke="rgba(0, 180, 255, 0.75)"
          strokeWidth="14"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${pathLength} ${pathLength}`}
          strokeDashoffset={strokeDashoffset}
        />
        
        {/* Simple white specular line on the fluid to give it its own depth */}
        <path
          d={pathD}
          stroke="rgba(255, 255, 255, 0.5)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${pathLength} ${pathLength}`}
          strokeDashoffset={strokeDashoffset}
          style={{ transform: 'translate(-3px, -2px)' }}
        />
      </svg>
    </div>
  );
}
