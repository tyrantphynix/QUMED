import React from 'react';

/**
 * MedicalSyringe2D — Gemini-generated high-fidelity SVG syringe
 * integrated with scroll-driven plunger compression & fluid expulsion.
 *
 * Props:
 *   scrollProgress {number} 0–1  — drives plunger travel
 *   className      {string}
 *   style          {object}
 */
export default function MedicalSyringe2D({ scrollProgress = 0, className = '', style = {} }) {
  const progress = Math.max(0, Math.min(1, scrollProgress));

  // Piston rests at y=200 (the anchor Gemini placed).
  // At full scroll it travels 254px downward — enough to expel all fluid.
  const restY       = 200;
  const maxTravel   = 254;
  const stopperY    = restY + progress * maxTravel;   // 200 → 454

  // Fluid sits directly below the piston bottom face (piston height = 26px)
  const fluidTop    = stopperY + 26;
  // Fluid bottom is fixed at the taper start (y ≈ 480)
  const fluidBottom = 480;
  const fluidHeight = Math.max(0, fluidBottom - fluidTop);

  // Handle slides down with the piston
  const handleOffsetY = progress * maxTravel;

  return (
    <svg
      viewBox="0 -45 390 810"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        width: '100%',
        height: '100%',
        maxWidth: '480px',
        display: 'block',
        overflow: 'visible',
        ...style
      }}
      aria-label="QU-MED Disposable Medical Syringe"
      role="img"
    >
      <defs>
        <filter id="sg-shadow" x="-50%" y="-20%" width="200%" height="150%">
          <feDropShadow dx="20" dy="25" stdDeviation="15" floodColor="#05001a" floodOpacity="0.35"/>
        </filter>

        <linearGradient id="sg-white-plastic" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#b3b3b3"/>
          <stop offset="15%"  stopColor="#ffffff"/>
          <stop offset="45%"  stopColor="#ececec"/>
          <stop offset="75%"  stopColor="#ffffff"/>
          <stop offset="100%" stopColor="#999999"/>
        </linearGradient>

        <linearGradient id="sg-white-plastic-vert" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#b3b3b3"/>
          <stop offset="25%"  stopColor="#ffffff"/>
          <stop offset="75%"  stopColor="#ffffff"/>
          <stop offset="100%" stopColor="#999999"/>
        </linearGradient>

        <linearGradient id="sg-plunger-fin-left" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#999999"/>
          <stop offset="80%"  stopColor="#f2f2f2"/>
          <stop offset="100%" stopColor="#e6e6e6"/>
        </linearGradient>

        <linearGradient id="sg-plunger-fin-right" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#e6e6e6"/>
          <stop offset="20%"  stopColor="#ffffff"/>
          <stop offset="100%" stopColor="#b3b3b3"/>
        </linearGradient>

        <linearGradient id="sg-glass-back" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#000000" stopOpacity="0.15"/>
          <stop offset="10%"  stopColor="#ffffff"  stopOpacity="0.4"/>
          <stop offset="90%"  stopColor="#ffffff"  stopOpacity="0.3"/>
          <stop offset="100%" stopColor="#000000"  stopOpacity="0.2"/>
        </linearGradient>

        <linearGradient id="sg-glass-front" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.9"/>
          <stop offset="4%"   stopColor="#ffffff" stopOpacity="1"/>
          <stop offset="7%"   stopColor="#ffffff" stopOpacity="0.1"/>
          <stop offset="80%"  stopColor="#ffffff" stopOpacity="0"/>
          <stop offset="88%"  stopColor="#000000" stopOpacity="0.15"/>
          <stop offset="94%"  stopColor="#ffffff" stopOpacity="1"/>
          <stop offset="97%"  stopColor="#ffffff" stopOpacity="0.8"/>
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.4"/>
        </linearGradient>

        <linearGradient id="sg-rubber-base" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#111111"/>
          <stop offset="20%"  stopColor="#4a4a4a"/>
          <stop offset="50%"  stopColor="#1f1f1f"/>
          <stop offset="85%"  stopColor="#3d3d3d"/>
          <stop offset="100%" stopColor="#050505"/>
        </linearGradient>

        <linearGradient id="sg-rubber-ring" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#000000"/>
          <stop offset="15%"  stopColor="#555555"/>
          <stop offset="45%"  stopColor="#111111"/>
          <stop offset="80%"  stopColor="#444444"/>
          <stop offset="100%" stopColor="#000000"/>
        </linearGradient>

        <linearGradient id="sg-fluid-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#4432a8" stopOpacity="0.9"/>
          <stop offset="15%"  stopColor="#6e57eb" stopOpacity="0.95"/>
          <stop offset="45%"  stopColor="#412fa3" stopOpacity="0.9"/>
          <stop offset="85%"  stopColor="#2d1c73" stopOpacity="0.95"/>
          <stop offset="100%" stopColor="#1b104a" stopOpacity="0.9"/>
        </linearGradient>

        <linearGradient id="sg-blue-hub" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#1973b8" stopOpacity="0.85"/>
          <stop offset="25%"  stopColor="#5ab6f2" stopOpacity="0.95"/>
          <stop offset="55%"  stopColor="#176cac" stopOpacity="0.85"/>
          <stop offset="85%"  stopColor="#0c4775" stopOpacity="0.95"/>
          <stop offset="100%" stopColor="#062f52" stopOpacity="0.85"/>
        </linearGradient>
      </defs>

      {/* Master Group with 22° rotation */}
      <g transform="rotate(-22 195 382)" filter="url(#sg-shadow)">

        {/* ================= PLUNGER HANDLE (scrolls down with piston) ================= */}
        <g transform={`translate(0, ${handleOffsetY})`}>
          <ellipse cx="195" cy="-2"  rx="42" ry="14" fill="url(#sg-white-plastic)"/>
          <rect x="153" y="-2" width="84" height="10" fill="url(#sg-white-plastic)"/>
          <ellipse cx="195" cy="8"  rx="42" ry="14"  fill="#cfcfcf"/>

          {/* Cruciform plunger rod — grows to always reach stopper */}
          <rect x="193" y="15" width="4" height={185 + progress * maxTravel} fill="#a0a0a0"/>
          {/* Left Fin */}
          <path
            d={`M173 10 L195 10 L195 ${stopperY} L176 ${stopperY} Z`}
            fill="url(#sg-plunger-fin-left)"
          />
          {/* Right Fin */}
          <path
            d={`M195 10 L217 10 L214 ${stopperY} L195 ${stopperY} Z`}
            fill="url(#sg-plunger-fin-right)"
          />
          {/* Front Fin highlight edge */}
          <rect x="193" y="10" width="4" height={stopperY - 10} fill="#ffffff" opacity="0.9"/>
        </g>

        {/* ================= BARREL FLANGE ================= */}
        <rect x="135" y="145" width="120" height="14" rx="7" fill="url(#sg-glass-back)"/>
        <rect x="135" y="145" width="120" height="14" rx="7" fill="url(#sg-glass-front)"/>
        <path d="M135 152 L255 152" stroke="#ffffff" strokeWidth="2" opacity="0.6"/>

        {/* ================= BARREL BACK (Depth) ================= */}
        <rect x="160" y="152" width="70" height="328" fill="url(#sg-glass-back)"/>
        <path d="M160 480 Q 195 490 230 480 L207 508 L183 508 Z" fill="url(#sg-glass-back)"/>

        {/* ================= PURPLE/BLUE FLUID (shrinks as piston presses) ================= */}
        {fluidHeight > 0 && (
          <>
            <rect x="162" y={fluidTop} width="66" height={fluidHeight} fill="url(#sg-fluid-grad)"/>
            {fluidTop < fluidBottom && (
              <path d="M162 480 Q 195 490 228 480 L205 507 L185 507 Z" fill="url(#sg-fluid-grad)"/>
            )}
          </>
        )}

        {/* ================= RUBBER PISTON (dynamic stopperY) ================= */}
        <rect x="162" y={stopperY}      width="66" height="26" fill="url(#sg-rubber-base)"/>
        <rect x="161" y={stopperY}      width="68" height="6"  rx="2" fill="url(#sg-rubber-ring)"/>
        <rect x="161" y={stopperY + 10} width="68" height="6"  rx="2" fill="url(#sg-rubber-ring)"/>
        <rect x="161" y={stopperY + 20} width="68" height="6"  rx="2" fill="url(#sg-rubber-ring)"/>

        {/* ================= MEASUREMENT MARKINGS ================= */}
        <g fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="14" fill="#0d0d0d">
          <g transform="translate(160, 180)">
            <text x="18" y="5" transform="rotate(90, 18, 5)">5</text>
            <rect x="30" y="0"  width="22" height="1.5"/>
            <rect x="42" y="11" width="10" height="1"/>
            <rect x="42" y="22" width="10" height="1"/>
            <rect x="42" y="33" width="10" height="1"/>
            <rect x="42" y="44" width="10" height="1"/>
          </g>
          <g transform="translate(160, 235)">
            <text x="18" y="5" transform="rotate(90, 18, 5)">4</text>
            <rect x="30" y="0"  width="22" height="1.5"/>
            <rect x="42" y="11" width="10" height="1"/>
            <rect x="42" y="22" width="10" height="1"/>
            <rect x="42" y="33" width="10" height="1"/>
            <rect x="42" y="44" width="10" height="1"/>
          </g>
          <g transform="translate(160, 290)">
            <text x="18" y="5" transform="rotate(90, 18, 5)">3</text>
            <rect x="30" y="0"  width="22" height="1.5"/>
            <rect x="42" y="11" width="10" height="1"/>
            <rect x="42" y="22" width="10" height="1"/>
            <rect x="42" y="33" width="10" height="1"/>
            <rect x="42" y="44" width="10" height="1"/>
          </g>
          <g transform="translate(160, 345)">
            <text x="18" y="5" transform="rotate(90, 18, 5)">2</text>
            <rect x="30" y="0"  width="22" height="1.5"/>
            <rect x="42" y="11" width="10" height="1"/>
            <rect x="42" y="22" width="10" height="1"/>
            <rect x="42" y="33" width="10" height="1"/>
            <rect x="42" y="44" width="10" height="1"/>
          </g>
          <g transform="translate(160, 400)">
            <rect x="30" y="0" width="22" height="1.5"/>
          </g>
        </g>

        {/* ================= BARREL FRONT (Reflections) ================= */}
        <rect x="160" y="152" width="70" height="328" fill="url(#sg-glass-front)"/>
        <path d="M160 480 Q 195 490 230 480 L207 508 L183 508 Z" fill="url(#sg-glass-front)"/>
        <rect x="183" y="508" width="24" height="22" fill="url(#sg-glass-front)"/>

        {/* ================= TRANSLUCENT BLUE NEEDLE HUB ================= */}
        <rect x="175" y="506" width="40" height="12" rx="3" fill="url(#sg-blue-hub)"/>
        <path d="M179 518 L211 518 L203 570 L187 570 Z" fill="url(#sg-blue-hub)"/>
        <path
          d="M187 518 L191 570 M195 518 L195 570 M203 518 L199 570"
          stroke="#ffffff"
          strokeWidth="1.5"
          opacity="0.4"
        />

        {/* ================= WHITE 3-WAY STOPCOCK VALVE ================= */}
        <rect x="185" y="565" width="20" height="35" fill="url(#sg-white-plastic)"/>
        <rect x="180" y="595" width="30" height="34" rx="2" fill="url(#sg-white-plastic)"/>
        <circle cx="195" cy="612" r="15" fill="#fcfcfc" stroke="#d4d4d4" strokeWidth="1.5"/>
        <circle cx="195" cy="612" r="9"  fill="url(#sg-white-plastic)"/>
        <rect x="210" y="602" width="42" height="20" fill="url(#sg-white-plastic-vert)"/>
        <rect x="246" y="594" width="8"  height="36" rx="2" fill="url(#sg-white-plastic)"/>
        <rect x="250" y="598" width="2"  height="28"        fill="#e6e6e6"/>
        <rect x="187" y="629" width="16" height="20" fill="url(#sg-white-plastic)"/>
        <rect x="179" y="649" width="32" height="10" rx="1.5" fill="url(#sg-white-plastic)"/>
        <rect x="183" y="659" width="24" height="14"          fill="url(#sg-white-plastic)"/>
        <rect x="181" y="673" width="28" height="8"  rx="1"   fill="url(#sg-white-plastic)"/>
        <rect x="185" y="681" width="20" height="25"          fill="url(#sg-white-plastic)"/>

      </g>
    </svg>
  );
}
