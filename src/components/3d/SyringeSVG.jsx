import React from 'react';

/**
 * SyringeSVG — High-realism 2D vector asset for Mobile & Fallback.
 * Recreates the exact components from the reference image:
 * - Molded white polypropylene plunger with flared thumb disc
 * - Crystal clear glass barrel with black graduation marks & ml labels
 * - Triple-lip black rubber piston stopper
 * - Soft translucent purple-blue fluid inside barrel
 * - Translucent ice-blue luer lock collar
 * - White medical 3-way stopcock T-valve with side-port turn handle
 * - Tapered connector sleeve with fluid core
 * - Dynamic snake tube with animated continuous liquid pulse & scroll expel
 * - Rear tube loop
 */
export default function SyringeSVG({ scrollProgress = 0, className = '', style = {} }) {
  const progress = Math.max(0, Math.min(1, scrollProgress));

  // Stopper travels down as user scrolls:
  // Barrel top y = 80, barrel bottom y = 224 (height = 144)
  // At rest (progress = 0): stopper sits at y = 92
  // At full scroll (progress = 1): stopper moves down to y = 216
  const maxTravel = 124;
  const stopperY = 92 + (progress * maxTravel);

  // Liquid fills between stopper bottom and barrel bottom (y = 224)
  const liquidTop = stopperY + 12;
  const liquidHeight = Math.max(4, 224 - liquidTop);

  // Plunger stem & thumb disc position (linked to stopper)
  const plungerDiscY = stopperY - 56;
  const stemY = stopperY - 50;

  // Flow animation offset tied to scroll
  const flowOffset = (progress * 200) % 60;

  return (
    <svg
      viewBox="0 0 240 370"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        width: '100%',
        height: '100%',
        maxHeight: '190px',
        display: 'block',
        margin: '0 auto',
        ...style
      }}
      aria-hidden="true"
    >
      <defs>
        {/* Crystal Clear Glass Barrel Gradient */}
        <linearGradient id="refGlass" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.5" />
          <stop offset="15%" stopColor="#C7DBF8" stopOpacity="0.12" />
          <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.04" />
          <stop offset="85%" stopColor="#C7DBF8" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.45" />
        </linearGradient>

        {/* Soft Translucent Purple-Blue Medical Fluid (from Reference Image) */}
        <linearGradient id="refLiquid" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#6366F1" stopOpacity="0.9" />
          <stop offset="35%" stopColor="#4F46E5" stopOpacity="0.92" />
          <stop offset="70%" stopColor="#4338CA" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#3730A3" stopOpacity="0.9" />
        </linearGradient>

        {/* Liquid Specular Highlights */}
        <linearGradient id="refLiquidShine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#A5B4FC" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#A5B4FC" stopOpacity="0.1" />
        </linearGradient>

        {/* Molded White Polypropylene Plunger Rod */}
        <linearGradient id="refPlunger" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#F8FAFC" />
          <stop offset="100%" stopColor="#E2E8F0" />
        </linearGradient>

        {/* Triple-lip Dark Rubber Stopper Gradient */}
        <linearGradient id="refStopper" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#18181B" />
          <stop offset="40%" stopColor="#27272A" />
          <stop offset="70%" stopColor="#18181B" />
          <stop offset="100%" stopColor="#09090B" />
        </linearGradient>

        {/* Translucent Ice-Blue Polypropylene Hub */}
        <linearGradient id="refHub" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7DD3FC" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#0284C7" stopOpacity="0.9" />
        </linearGradient>

        {/* Tube Glow Filter */}
        <filter id="refTubeGlow" x="-25%" y="-25%" width="150%" height="150%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* ========================================================
          1. REAR TUBE LOOP (from reference photo, arching top right)
          ======================================================== */}
      <g id="rear-tube-loop">
        {/* Outer clear tube */}
        <path
          d="M 124,100 C 145,70 185,65 198,110 C 205,145 205,250 205,340"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
        />
        {/* Inner fluid hint */}
        <path
          d="M 124,100 C 145,70 185,65 198,110 C 205,145 205,250 205,340"
          stroke="#4F46E5"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          opacity="0.55"
        />
        {/* Tube gloss line */}
        <path
          d="M 126,98 C 146,68 184,64 196,108 C 203,143 203,248 203,338"
          stroke="rgba(255,255,255,0.7)"
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
        />
      </g>

      {/* ========================================================
          2. PLUNGER ASSEMBLY (Moves downward into the barrel)
          ======================================================== */}
      <g id="plunger-assembly">
        {/* Thumb Press Flange Disc (top) */}
        <ellipse
          cx="110"
          cy={plungerDiscY}
          rx="25"
          ry="5"
          fill="url(#refPlunger)"
          stroke="rgba(255,255,255,0.9)"
          strokeWidth="1"
        />
        <rect
          x="87"
          y={plungerDiscY - 1.5}
          width="46"
          height="3"
          rx="1.5"
          fill="#FFFFFF"
          opacity="0.8"
        />

        {/* Flared neck collar */}
        <path
          d={`M 103,${plungerDiscY + 3} L 117,${plungerDiscY + 3} L 113,${stemY + 6} L 107,${stemY + 6} Z`}
          fill="url(#refPlunger)"
        />

        {/* Plunger Cross-Ribbed Shaft (+) */}
        {/* Central vertical rib */}
        <rect
          x="107"
          y={stemY}
          width="6"
          height={stopperY - stemY + 2}
          rx="1"
          fill="url(#refPlunger)"
        />
        {/* Cross wing rib */}
        <rect
          x="97"
          y={stemY + 4}
          width="26"
          height={Math.max(4, stopperY - stemY - 6)}
          rx="1"
          fill="url(#refPlunger)"
          opacity="0.4"
        />

        {/* Triple-lip Dark Rubber Stopper */}
        {/* Ring 1 */}
        <rect
          x="89"
          y={stopperY}
          width="42"
          height="3.5"
          rx="1.5"
          fill="url(#refStopper)"
        />
        {/* Ring 2 */}
        <rect
          x="88.5"
          y={stopperY + 4}
          width="43"
          height="4"
          rx="1.5"
          fill="#09090B"
        />
        {/* Ring 3 */}
        <rect
          x="89"
          y={stopperY + 8.5}
          width="42"
          height="3.5"
          rx="1.5"
          fill="url(#refStopper)"
        />
        {/* Stopper conical nose */}
        <polygon
          points={`98,${stopperY + 12} 122,${stopperY + 12} 110,${stopperY + 16}`}
          fill="#27272A"
        />
      </g>

      {/* ========================================================
          3. TRANSLUCENT PURPLE-BLUE FLUID COLUMN
          ======================================================== */}
      {liquidHeight > 4 && (
        <g id="liquid-column">
          {/* Main liquid body */}
          <rect
            x="89"
            y={liquidTop}
            width="42"
            height={liquidHeight}
            rx="2"
            fill="url(#refLiquid)"
            style={{ transition: 'y 0.1s ease-out, height 0.1s ease-out' }}
          />
          {/* Internal gloss reflection */}
          <rect
            x="91.5"
            y={liquidTop}
            width="4.5"
            height={liquidHeight}
            fill="url(#refLiquidShine)"
            rx="1"
          />
          {/* Meniscus curve */}
          <ellipse
            cx="110"
            cy={liquidTop}
            rx="21"
            ry="2.5"
            fill="#A5B4FC"
            opacity="0.8"
          />
        </g>
      )}

      {/* ========================================================
          4. CRYSTAL CLEAR GLASS BARREL
          ======================================================== */}
      <g id="glass-barrel">
        {/* Main cylindrical glass body */}
        <rect
          x="87"
          y="76"
          width="46"
          height="150"
          rx="4"
          fill="url(#refGlass)"
          stroke="rgba(255,255,255,0.75)"
          strokeWidth="1.2"
        />

        {/* Wide Oval Finger Flange (White plastic collar at top) */}
        <ellipse
          cx="110"
          cy="74"
          rx="34"
          ry="7"
          fill="#F8FAFC"
          stroke="rgba(255,255,255,0.9)"
          strokeWidth="1"
        />
        <ellipse
          cx="110"
          cy="73"
          rx="32"
          ry="5.5"
          fill="#FFFFFF"
          opacity="0.5"
        />

        {/* Specular Highlight Strip (Left side) */}
        <line
          x1="91"
          y1="78"
          x2="91"
          y2="222"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="94"
          y1="80"
          x2="94"
          y2="220"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1"
          strokeLinecap="round"
        />

        {/* Soft Right Reflection */}
        <line
          x1="129"
          y1="80"
          x2="129"
          y2="220"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </g>

      {/* ========================================================
          5. GRADUATION MARKS & NUMBERS (5, 4, 3, 2 ml)
          ======================================================== */}
      <g id="graduations" stroke="#1E293B" strokeWidth="1.2" strokeLinecap="round">
        {/* 5 ml */}
        <line x1="93" y1="98" x2="108" y2="98" strokeWidth="1.5" />
        <line x1="93" y1="110" x2="101" y2="110" strokeWidth="0.8" opacity="0.6" />
        {/* 4 ml */}
        <line x1="93" y1="122" x2="108" y2="122" strokeWidth="1.5" />
        <line x1="93" y1="134" x2="101" y2="134" strokeWidth="0.8" opacity="0.6" />
        {/* 3 ml */}
        <line x1="93" y1="146" x2="108" y2="146" strokeWidth="1.5" />
        <line x1="93" y1="158" x2="101" y2="158" strokeWidth="0.8" opacity="0.6" />
        {/* 2 ml */}
        <line x1="93" y1="170" x2="108" y2="170" strokeWidth="1.5" />
        <line x1="93" y1="182" x2="101" y2="182" strokeWidth="0.8" opacity="0.6" />
        {/* 1 ml */}
        <line x1="93" y1="194" x2="108" y2="194" strokeWidth="1.5" />
      </g>

      {/* Graduation Numeric Labels */}
      <g fill="#1E293B" fontSize="7.5" fontFamily="sans-serif" fontWeight="700" textAnchor="start">
        <text x="111" y="100.5">5</text>
        <text x="111" y="124.5">4</text>
        <text x="111" y="148.5">3</text>
        <text x="111" y="172.5">2</text>
        <text x="111" y="196.5">1 ml</text>
      </g>

      {/* ========================================================
          6. NOZZLE & 3-WAY STOPCOCK VALVE (From Reference Image)
          ======================================================== */}
      <g id="stopcock-assembly">
        {/* Glass taper nozzle */}
        <polygon
          points="93,226 127,226 118,237 102,237"
          fill="url(#refGlass)"
          stroke="rgba(255,255,255,0.7)"
          strokeWidth="1"
        />

        {/* Translucent Ice-Blue Luer Lock Hub */}
        <rect
          x="103"
          y="237"
          width="14"
          height="14"
          rx="2"
          fill="url(#refHub)"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="1"
        />
        {/* Grip ribs on hub */}
        <line x1="106" y1="239" x2="106" y2="249" stroke="#FFFFFF" strokeWidth="1" opacity="0.7" />
        <line x1="110" y1="239" x2="110" y2="249" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.8" />
        <line x1="114" y1="239" x2="114" y2="249" stroke="#FFFFFF" strokeWidth="1" opacity="0.7" />

        {/* White Medical 3-Way Stopcock T-Valve */}
        {/* Main vertical valve body */}
        <rect
          x="104.5"
          y="251"
          width="11"
          height="16"
          rx="2"
          fill="#F8FAFC"
          stroke="#E2E8F0"
          strokeWidth="1"
        />
        {/* Horizontal side port branch pointing right */}
        <rect
          x="115.5"
          y="255"
          width="14"
          height="8"
          rx="1"
          fill="#F8FAFC"
          stroke="#E2E8F0"
          strokeWidth="1"
        />
        {/* White turn handle plug on side port */}
        <rect
          x="129.5"
          y="253"
          width="5"
          height="12"
          rx="1.5"
          fill="#FFFFFF"
          stroke="#CBD5E1"
          strokeWidth="1"
        />
        <polygon
          points="134.5,252 139,255 139,263 134.5,266"
          fill="#F1F5F9"
          stroke="#CBD5E1"
          strokeWidth="1"
        />

        {/* Tapered Translucent Connector Sleeve */}
        <polygon
          points="105,267 115,267 113,290 107,290"
          fill="rgba(248,250,252,0.8)"
          stroke="#E2E8F0"
          strokeWidth="1"
        />
        {/* Purple-blue fluid running through connector core */}
        <line
          x1="110"
          y1="251"
          x2="110"
          y2="290"
          stroke="#4F46E5"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </g>

      {/* ========================================================
          7. ANIMATED SNAKE TUBE FLOWING DOWN ACROSS HERO
          ======================================================== */}
      <g id="snake-tube-flowing">
        {/* Outer Clear Silicone Tube */}
        <path
          d="M 110,290 C 110,312 85,320 62,324 C 36,328 18,342 12,364"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
        />

        {/* Flowing Purple-Blue Fluid Core with active animation */}
        <path
          d="M 110,290 C 110,312 85,320 62,324 C 36,328 18,342 12,364"
          stroke="#4F46E5"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          filter="url(#refTubeGlow)"
          opacity="0.95"
        />

        {/* Dynamic Pulse & Flow Wave inside Tube */}
        <path
          d="M 110,290 C 110,312 85,320 62,324 C 36,328 18,342 12,364"
          stroke="#818CF8"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          strokeDasharray="14 10"
          strokeDashoffset={flowOffset}
          style={{ transition: 'stroke-dashoffset 0.15s ease-out' }}
        />

        {/* Silicone Tube Specular Highlight */}
        <path
          d="M 109,290 C 109,311 84,318 61,322 C 37,326 19,340 13,362"
          stroke="rgba(255,255,255,0.7)"
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
        />
      </g>
    </svg>
  );
}
