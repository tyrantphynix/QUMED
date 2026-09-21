import React from 'react';

/**
 * MedicalSyringe2D — Pure 2D vector asset replicating the reference image:
 * - 22° diagonal posture
 * - Flared white molded plunger handle & thumb push-disc
 * - Wide oval finger flange on the glass barrel
 * - Crystal-clear glass barrel with black graduation ticks & numbers
 * - Triple-lip black rubber piston stopper
 * - Soft translucent purple-blue fluid inside the barrel
 * - Translucent ice-blue luer lock collar
 * - White medical 3-way stopcock T-valve with horizontal side port and turn handle
 * - Tapered connector sleeve with fluid core
 * - Rear tube loop with IV drip chamber
 * - Smooth scroll-driven plunger compression & fluid expulsion
 */
export default function MedicalSyringe2D({ scrollProgress = 0, className = '', style = {} }) {
  const progress = Math.max(0, Math.min(1, scrollProgress));

  // Barrel coordinates (in straight 0 0 340 680 system):
  // Barrel top y = 160, barrel bottom nozzle y = 430 (barrel height = 270)
  // At rest (progress = 0): stopper rests at y = 200 (approx 4ml mark)
  // At full scroll (progress = 1): stopper travels down to y = 415 (travel = 215px)
  const maxTravel = 215;
  const stopperTravel = progress * maxTravel;
  const stopperY = 200 + stopperTravel;

  // Liquid fills from bottom of stopper down to nozzle (y = 428)
  const liquidTop = stopperY + 22;
  const liquidHeight = Math.max(6, 428 - liquidTop);

  // Plunger stem & thumb disc position (tied directly to stopper)
  const plungerDiscY = stopperY - 115;
  const stemY = stopperY - 100;

  return (
    <svg
      viewBox="0 0 380 760"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        width: '100%',
        height: '100%',
        maxWidth: '480px',
        display: 'block',
        filter: 'drop-shadow(-12px 18px 36px rgba(15, 23, 42, 0.45))',
        ...style
      }}
      aria-label="QU-MED Disposable Medical Syringe"
      role="img"
    >
      <defs>
        {/* Crystal Clear Glass Barrel Gradient */}
        <linearGradient id="glassBarrelGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.55" />
          <stop offset="12%" stopColor="#E2E8F0" stopOpacity="0.16" />
          <stop offset="48%" stopColor="#FFFFFF" stopOpacity="0.04" />
          <stop offset="84%" stopColor="#C7DBF8" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.45" />
        </linearGradient>

        {/* Soft Translucent Purple-Blue Fluid (from Reference Image) */}
        <linearGradient id="fluidGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#6366F1" stopOpacity="0.88" />
          <stop offset="30%" stopColor="#4F46E5" stopOpacity="0.94" />
          <stop offset="70%" stopColor="#4338CA" stopOpacity="0.96" />
          <stop offset="100%" stopColor="#3730A3" stopOpacity="0.90" />
        </linearGradient>

        {/* Fluid Specular Highlight */}
        <linearGradient id="fluidGloss" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#C7D2FE" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#C7D2FE" stopOpacity="0.05" />
        </linearGradient>

        {/* Molded White Polypropylene Plunger Rod */}
        <linearGradient id="plungerWhite" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="35%" stopColor="#F8FAFC" />
          <stop offset="70%" stopColor="#F1F5F9" />
          <stop offset="100%" stopColor="#CBD5E1" />
        </linearGradient>

        {/* Molded Plastic Shadow */}
        <linearGradient id="plungerShadow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#E2E8F0" />
          <stop offset="100%" stopColor="#94A3B8" />
        </linearGradient>

        {/* Triple-lip Dark Rubber Stopper Gradient */}
        <linearGradient id="rubberStopperGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#27272A" />
          <stop offset="25%" stopColor="#3F3F46" />
          <stop offset="60%" stopColor="#18181B" />
          <stop offset="100%" stopColor="#09090B" />
        </linearGradient>

        {/* Translucent Ice-Blue Polypropylene Hub */}
        <linearGradient id="iceBlueHub" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#BAE6FD" stopOpacity="0.92" />
          <stop offset="35%" stopColor="#38BDF8" stopOpacity="0.96" />
          <stop offset="75%" stopColor="#0284C7" stopOpacity="0.96" />
          <stop offset="100%" stopColor="#0369A1" stopOpacity="0.92" />
        </linearGradient>

        {/* Glow for Fluid Stream */}
        <filter id="fluidGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* ========================================================
          2. MAIN SYRINGE ASSEMBLY (Rotated -22° like Reference Image)
          ======================================================== */}
      <g id="syringe-tilted-group" transform="rotate(-22 220 380)">

        {/* ---------------- A. PLUNGER ASSEMBLY ---------------- */}
        <g id="plunger-group">
          {/* Top Thumb Press Flange Disc */}
          <ellipse
            cx="220"
            cy={plungerDiscY}
            rx="46"
            ry="9"
            fill="url(#plungerWhite)"
            stroke="rgba(255,255,255,0.95)"
            strokeWidth="1.5"
          />
          <ellipse
            cx="220"
            cy={plungerDiscY - 2}
            rx="42"
            ry="7"
            fill="#FFFFFF"
            opacity="0.8"
          />
          {/* Flange edge thickness */}
          <rect
            x="174"
            y={plungerDiscY - 2}
            width="92"
            height="5"
            rx="2.5"
            fill="#F8FAFC"
            stroke="#CBD5E1"
            strokeWidth="0.8"
          />

          {/* Flared Plunger Shaft Neck */}
          <path
            d={`M 206,${plungerDiscY + 4} L 234,${plungerDiscY + 4} L 226,${stemY + 12} L 214,${stemY + 12} Z`}
            fill="url(#plungerWhite)"
          />

          {/* Cross-Ribbed Shaft (+) */}
          {/* Central main vertical column */}
          <rect
            x="214"
            y={stemY}
            width="12"
            height={stopperY - stemY + 4}
            rx="2"
            fill="url(#plungerWhite)"
          />
          {/* Horizontal cross wings for structural rib */}
          <rect
            x="195"
            y={stemY + 6}
            width="50"
            height={Math.max(6, stopperY - stemY - 10)}
            rx="2"
            fill="url(#plungerWhite)"
            opacity="0.38"
          />
          {/* Inner shadow rib lines */}
          <line
            x1="214"
            y1={stemY + 8}
            x2="214"
            y2={stopperY}
            stroke="#94A3B8"
            strokeWidth="1"
            opacity="0.5"
          />
          <line
            x1="226"
            y1={stemY + 8}
            x2="226"
            y2={stopperY}
            stroke="#94A3B8"
            strokeWidth="1"
            opacity="0.5"
          />

          {/* Triple-Lip Dark Rubber Stopper */}
          {/* Ring 1 (top) */}
          <rect
            x="180"
            y={stopperY}
            width="80"
            height="7"
            rx="3"
            fill="url(#rubberStopperGrad)"
          />
          {/* Groove 1 */}
          <rect x="183" y={stopperY + 6.5} width="74" height="2" fill="#09090B" />
          {/* Ring 2 (middle) */}
          <rect
            x="179"
            y={stopperY + 8}
            width="82"
            height="7.5"
            rx="3"
            fill="url(#rubberStopperGrad)"
          />
          {/* Groove 2 */}
          <rect x="183" y={stopperY + 15} width="74" height="2" fill="#09090B" />
          {/* Ring 3 (bottom) */}
          <rect
            x="180"
            y={stopperY + 16.5}
            width="80"
            height="7"
            rx="3"
            fill="url(#rubberStopperGrad)"
          />
          {/* Conical rubber nose */}
          <polygon
            points={`196,${stopperY + 23} 244,${stopperY + 23} 220,${stopperY + 30}`}
            fill="#18181B"
          />
        </g>

        {/* ---------------- B. LIQUID COLUMN ---------------- */}
        {liquidHeight > 6 && (
          <g id="fluid-column">
            {/* Main fluid body */}
            <rect
              x="181"
              y={liquidTop}
              width="78"
              height={liquidHeight}
              rx="3"
              fill="url(#fluidGrad)"
              style={{ transition: 'y 0.12s ease-out, height 0.12s ease-out' }}
            />
            {/* Inner refraction luminescence */}
            <rect
              x="185"
              y={liquidTop}
              width="9"
              height={liquidHeight}
              fill="url(#fluidGloss)"
              rx="2"
            />
            {/* Top meniscus curve under stopper */}
            <ellipse
              cx="220"
              cy={liquidTop}
              rx="39"
              ry="5"
              fill="#A5B4FC"
              opacity="0.85"
            />
          </g>
        )}

        {/* ---------------- C. GLASS BARREL ---------------- */}
        <g id="glass-barrel">
          {/* Main transparent glass cylinder */}
          <rect
            x="177"
            y="155"
            width="86"
            height="275"
            rx="6"
            fill="url(#glassBarrelGrad)"
            stroke="rgba(255,255,255,0.85)"
            strokeWidth="2"
          />

          {/* Wide Oval Finger Flange (White molded plastic at top) */}
          <ellipse
            cx="220"
            cy="153"
            rx="62"
            ry="13"
            fill="#F8FAFC"
            stroke="rgba(255,255,255,0.95)"
            strokeWidth="1.8"
          />
          <ellipse
            cx="220"
            cy="151"
            rx="58"
            ry="10"
            fill="#FFFFFF"
            opacity="0.6"
          />
          <ellipse
            cx="220"
            cy="153"
            rx="43"
            ry="8"
            fill="none"
            stroke="#CBD5E1"
            strokeWidth="1"
            opacity="0.5"
          />

          {/* Cylindrical Specular Highlight Strips */}
          {/* Sharp Primary Left Reflection */}
          <line
            x1="185"
            y1="160"
            x2="185"
            y2="422"
            stroke="rgba(255,255,255,0.92)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <line
            x1="190"
            y1="165"
            x2="190"
            y2="418"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Soft Rim Right Reflection */}
          <line
            x1="256"
            y1="162"
            x2="256"
            y2="420"
            stroke="rgba(255,255,255,0.45)"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </g>

        {/* ---------------- D. GRADUATION MEASUREMENT MARKS ---------------- */}
        <g id="graduation-marks" stroke="#0F172A" strokeWidth="2" strokeLinecap="round">
          {/* 5 ml */}
          <line x1="188" y1="195" x2="218" y2="195" strokeWidth="2.4" />
          <line x1="188" y1="216" x2="204" y2="216" strokeWidth="1.2" opacity="0.6" />
          {/* 4 ml */}
          <line x1="188" y1="237" x2="218" y2="237" strokeWidth="2.4" />
          <line x1="188" y1="258" x2="204" y2="258" strokeWidth="1.2" opacity="0.6" />
          {/* 3 ml */}
          <line x1="188" y1="279" x2="218" y2="279" strokeWidth="2.4" />
          <line x1="188" y1="300" x2="204" y2="300" strokeWidth="1.2" opacity="0.6" />
          {/* 2 ml */}
          <line x1="188" y1="321" x2="218" y2="321" strokeWidth="2.4" />
          <line x1="188" y1="342" x2="204" y2="342" strokeWidth="1.2" opacity="0.6" />
          {/* 1 ml */}
          <line x1="188" y1="363" x2="218" y2="363" strokeWidth="2.4" />
        </g>

        {/* Graduation Numeric Labels */}
        <g fill="#0F172A" fontSize="13" fontFamily="'Inter', sans-serif" fontWeight="700" textAnchor="start">
          <text x="224" y="200">5</text>
          <text x="224" y="242">4</text>
          <text x="224" y="284">3</text>
          <text x="224" y="326">2</text>
          <text x="224" y="368">1 ml</text>
        </g>

        {/* ---------------- E. 3-WAY STOPCOCK & CONNECTOR SLEEVE ---------------- */}
        <g id="stopcock-assembly">
          {/* Glass conical nozzle */}
          <polygon
            points="188,430 252,430 236,452 204,452"
            fill="url(#glassBarrelGrad)"
            stroke="rgba(255,255,255,0.75)"
            strokeWidth="1.5"
          />

          {/* Translucent Ice-Blue Luer Lock Hub */}
          <rect
            x="206"
            y="452"
            width="28"
            height="28"
            rx="3"
            fill="url(#iceBlueHub)"
            stroke="rgba(255,255,255,0.7)"
            strokeWidth="1.5"
          />
          {/* Hub grip ribs */}
          <line x1="212" y1="456" x2="212" y2="476" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.8" />
          <line x1="220" y1="456" x2="220" y2="476" stroke="#FFFFFF" strokeWidth="1.8" opacity="0.9" />
          <line x1="228" y1="456" x2="228" y2="476" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.8" />

          {/* White Medical 3-Way Stopcock Valve */}
          {/* Main vertical valve body */}
          <rect
            x="209"
            y="480"
            width="22"
            height="32"
            rx="3"
            fill="#F8FAFC"
            stroke="#CBD5E1"
            strokeWidth="1.5"
          />
          {/* Horizontal side port branch pointing right */}
          <rect
            x="231"
            y="488"
            width="28"
            height="16"
            rx="2"
            fill="#F8FAFC"
            stroke="#CBD5E1"
            strokeWidth="1.5"
          />
          {/* Winged white valve turn handle / plug */}
          <rect
            x="259"
            y="484"
            width="10"
            height="24"
            rx="3"
            fill="#FFFFFF"
            stroke="#94A3B8"
            strokeWidth="1.2"
          />
          <polygon
            points="269,482 278,487 278,505 269,510"
            fill="#F1F5F9"
            stroke="#94A3B8"
            strokeWidth="1.2"
          />

          {/* Tapered Translucent Connector Sleeve */}
          <polygon
            points="210,512 230,512 226,558 214,558"
            fill="rgba(248,250,252,0.85)"
            stroke="#CBD5E1"
            strokeWidth="1.5"
          />
          {/* Fluid running through core of connector */}
          <line
            x1="220"
            y1="480"
            x2="220"
            y2="558"
            stroke="#4F46E5"
            strokeWidth="6"
            strokeLinecap="round"
          />

          {/* Metallic tube collar clamp */}
          <rect
            x="212"
            y="558"
            width="16"
            height="8"
            rx="2"
            fill="#94A3B8"
            stroke="#64748B"
            strokeWidth="0.8"
          />
        </g>

        {/* ---------------- F. FRONT SNAKE TUBE START ---------------- */}
        <g id="snake-tube-start">
          {/* Outer silicone tube wall */}
          <path
            d="M 220,566 C 220,610 170,626 124,635 C 72,645 36,674 24,720"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="14"
            strokeLinecap="round"
            fill="none"
          />
          {/* Purple-blue fluid core */}
          <path
            d="M 220,566 C 220,610 170,626 124,635 C 72,645 36,674 24,720"
            stroke="#4F46E5"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
            filter="url(#fluidGlow)"
            opacity="0.95"
          />
          {/* Flow wave highlight */}
          <path
            d="M 220,566 C 220,610 170,626 124,635 C 72,645 36,674 24,720"
            stroke="#A5B4FC"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            strokeDasharray="20 14"
            strokeDashoffset={(progress * 300) % 68}
          />
          {/* Specular tube shine */}
          <path
            d="M 218,566 C 218,608 168,623 122,632 C 70,642 34,671 22,717"
            stroke="rgba(255,255,255,0.75)"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
          />
        </g>

      </g>
    </svg>
  );
}
