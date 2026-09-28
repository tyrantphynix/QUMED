import React from 'react';

export default function StopcockSvg({ x, y, internalProgress = 0 }) {
  const internalLength = 88;
  return (
    <svg x={x} y={y} width="140" height="140" viewBox="0 0 140 140" style={{ overflow: 'visible' }}>
      <defs>
        <filter id="shadow-deep-sc" x="-20%" y="-20%" width="150%" height="150%">
          <feDropShadow dx="4" dy="8" stdDeviation="5" floodColor="#001433" floodOpacity="0.25" />
        </filter>
        <filter id="valve-shadow" x="-20%" y="-20%" width="150%" height="150%">
          <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.35" />
        </filter>

        <linearGradient id="poly-horiz" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6"/>
          <stop offset="10%" stopColor="#ffffff" stopOpacity="0.05"/>
          <stop offset="85%" stopColor="#ffffff" stopOpacity="0.05"/>
          <stop offset="95%" stopColor="#000000" stopOpacity="0.15"/>
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.4"/>
        </linearGradient>

        <linearGradient id="poly-vert" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6"/>
          <stop offset="10%" stopColor="#ffffff" stopOpacity="0.05"/>
          <stop offset="85%" stopColor="#ffffff" stopOpacity="0.05"/>
          <stop offset="95%" stopColor="#000000" stopOpacity="0.15"/>
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.4"/>
        </linearGradient>

        <linearGradient id="blue-valve-base" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e40af"/>
          <stop offset="50%" stopColor="#1d4ed8"/>
          <stop offset="100%" stopColor="#1e3a8a"/>
        </linearGradient>

        <linearGradient id="blue-valve-high" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60a5fa"/>
          <stop offset="40%" stopColor="#3b82f6"/>
          <stop offset="100%" stopColor="#2563eb" stopOpacity="0"/>
        </linearGradient>

        <linearGradient id="white-cap-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff"/>
          <stop offset="20%" stopColor="#f8fafc"/>
          <stop offset="80%" stopColor="#e2e8f0"/>
          <stop offset="100%" stopColor="#94a3b8"/>
        </linearGradient>
      </defs>

      <g filter="url(#shadow-deep-sc)">
        
        <rect x="25" y="60" width="35" height="20" fill="none" stroke="rgba(100,100,100,0.2)" strokeWidth="2" rx="2" />
        <rect x="26" y="61" width="33" height="18" fill="url(#poly-horiz)" rx="1.5" />
        
        <rect x="80" y="60" width="35" height="20" fill="none" stroke="rgba(100,100,100,0.2)" strokeWidth="2" rx="2" />
        <rect x="81" y="61" width="33" height="18" fill="url(#poly-horiz)" rx="1.5" />
        
        <rect x="60" y="25" width="20" height="35" fill="none" stroke="rgba(100,100,100,0.2)" strokeWidth="2" rx="2" />
        <rect x="61" y="26" width="18" height="33" fill="url(#poly-vert)" rx="1.5" />

        <circle cx="70" cy="70" r="22" fill="none" stroke="rgba(100,100,100,0.25)" strokeWidth="2" />
        <circle cx="70" cy="70" r="21" fill="rgba(240,248,255,0.15)" stroke="url(#poly-horiz)" strokeWidth="2" />

        <path id="internal-fluid" 
              d="M 70 26 L 70 70 L 114 70" 
              fill="none" 
              stroke="rgba(100, 170, 255, 0.45)" 
              strokeWidth="10" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeDasharray={`${Math.max(0, internalLength * internalProgress)} ${internalLength}`}
              opacity={internalProgress > 0 ? 1 : 0}
        />

        {/* LEFT PORT: Male Luer Lock */}
        {/* Transparent Threaded Housing */}
        <rect x="5" y="52" width="20" height="36" fill="url(#poly-horiz)" stroke="rgba(100,100,100,0.3)" strokeWidth="1.5" rx="1" />
        <rect x="5" y="53" width="20" height="2" fill="#ffffff" opacity="0.9" />
        {/* Internal Threads */}
        <path d="M 8 52 L 8 88 M 14 52 L 14 88 M 20 52 L 20 88" stroke="#ffffff" strokeWidth="2" opacity="0.5" />
        {/* Opaque White Male Tapered Nozzle */}
        <polygon points="5,62 -25,64 -25,76 5,78" fill="url(#white-cap-grad)" stroke="#94a3b8" strokeWidth="1" strokeLinejoin="round" />
        <rect x="-25" y="64" width="30" height="2.5" fill="#ffffff" opacity="0.7" />

        <rect x="52" y="12" width="36" height="14" fill="url(#white-cap-grad)" stroke="#94a3b8" strokeWidth="1" rx="2" />
        <path d="M 56 12 L 56 26 M 60 12 L 60 26 M 64 12 L 64 26 M 68 12 L 68 26 M 72 12 L 72 26 M 76 12 L 76 26 M 80 12 L 80 26 M 84 12 L 84 26" stroke="#94a3b8" strokeWidth="0.75" />

        <rect x="114" y="52" width="14" height="36" fill="url(#white-cap-grad)" stroke="#94a3b8" strokeWidth="1" rx="2" />
        <path d="M 114 56 L 128 56 M 114 60 L 128 60 M 114 64 L 128 64 M 114 68 L 128 68 M 114 72 L 128 72 M 114 76 L 128 76 M 114 80 L 128 80 M 114 84 L 128 84" stroke="#94a3b8" strokeWidth="0.75" />

        <g transform="rotate(45 70 70)" filter="url(#valve-shadow)">
          <circle cx="70" cy="70" r="16" fill="url(#blue-valve-base)" />
          
          <path d="M 64 70 L 64 25 Q 64 20 70 20 Q 76 20 76 25 L 76 70 Z" fill="url(#blue-valve-base)" />
          <path d="M 64 70 L 64 25 Q 64 20 70 20 Q 76 20 76 25 L 76 70 Z" fill="url(#blue-valve-high)" />
          <polygon points="70,26 66,36 74,36" fill="#1e3a8a" opacity="0.5" />
          <polygon points="70,27 67,36 73,36" fill="#93c5fd" opacity="0.9" />
          
          <path d="M 70 64 L 25 64 Q 20 64 20 70 Q 20 76 25 76 L 70 76 Z" fill="url(#blue-valve-base)" />
          <path d="M 70 64 L 25 64 Q 20 64 20 70 Q 20 76 25 76 L 70 76 Z" fill="url(#blue-valve-high)" />
          <polygon points="26,70 36,66 36,74" fill="#1e3a8a" opacity="0.5" />
          <polygon points="27,70 36,67 36,73" fill="#93c5fd" opacity="0.9" />
          
          <path d="M 76 70 L 76 115 Q 76 120 70 120 Q 64 120 64 115 L 64 70 Z" fill="url(#blue-valve-base)" />
          <path d="M 76 70 L 76 115 Q 76 120 70 120 Q 64 120 64 115 L 64 70 Z" fill="url(#blue-valve-high)" />
          <polygon points="70,114 66,104 74,104" fill="#1e3a8a" opacity="0.5" />
          <polygon points="70,113 67,104 73,104" fill="#93c5fd" opacity="0.9" />

          <circle cx="70" cy="70" r="7" fill="#0f172a" />
          <circle cx="70" cy="70" r="7" fill="none" stroke="#60a5fa" strokeWidth="1.5" opacity="0.8" transform="translate(-0.5, -0.5)" />
          <path d="M 57 60 Q 70 54 83 60" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
          <circle cx="70" cy="70" r="16" fill="none" stroke="#93c5fd" strokeWidth="1" opacity="0.5" />
        </g>
      </g>
    </svg>
  );
}
