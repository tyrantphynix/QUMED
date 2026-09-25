const fs = require('fs');
const file = 'src/components/tube/TubeOverlay.jsx';
let content = fs.readFileSync(file, 'utf8');

const prefix = `{/* ================= 1. NUMBER 2 TUBE CASING (from TubeSegmentSVG) ================= */}`;
const startIdx = content.indexOf(prefix);
const endIdx = content.lastIndexOf('</svg>');

if (startIdx === -1 || endIdx === -1) {
  console.log("Not found");
  process.exit(1);
}

const replacement = `        {/* ================= 1. GEMINI HYPER-REALISTIC TUBE ================= */}
        
        {/* 1. Left/Bottom Dark Wall Rim (for physical thickness & depth shadow) */}
        <path
          d={pathD}
          strokeWidth="18px"
          stroke="rgba(30, 58, 138, 0.35)"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 2. Outer Tube Shell (the clear transparent plastic body) */}
        <path
          d={pathD}
          strokeWidth="14px"
          stroke="rgba(200, 220, 255, 0.35)"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 3. Inner Hollow / Lumen (the open central channel) */}
        <path
          d={pathD}
          strokeWidth="8px"
          stroke="rgba(255, 255, 255, 0.12)"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 4. Saline Water Fill (for animation with stroke-dasharray) */}
        <path
          d={pathD}
          strokeWidth="5px"
          stroke="rgba(125, 200, 252, 0.55)"
          fill="none"
          strokeDasharray={\`\${pathLength} \${pathLength}\`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 5. Specular Highlight Glare (running along the top edge for cylindrical realism) */}
        <path
          d={pathD}
          strokeWidth="1.8px"
          stroke="rgba(255, 255, 255, 0.90)"
          fill="none"
          style={{ transform: 'translate(-2.5px, -3px)' }}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* ================= 2. SLEEVED SOCK CUFF AT SYRINGE CONNECTOR ================= */}
        {/* Rolled silicone cuff where tube is pulled over the connector nozzle like a sock */}
        <g transform={\`translate(\${coords.startX}, \${coords.startY}) rotate(-22)\`}>
          <ellipse cx="0" cy="0" rx="9" ry="3" fill="rgba(200, 220, 255, 0.35)" stroke="rgba(30, 58, 138, 0.35)" strokeWidth="1.5" />
          <line x1="-9" y1="3.5" x2="9" y2="3.5" stroke="rgba(255, 255, 255, 0.90)" strokeWidth="1" />
        </g>
      `;

const newContent = content.slice(0, startIdx) + replacement + content.slice(endIdx);
fs.writeFileSync(file, newContent);
console.log("Success");
