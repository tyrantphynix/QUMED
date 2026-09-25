import React, { useRef, useEffect, useCallback } from 'react';

// ─── Lightweight Perlin-style noise (no library needed) ──────────────────────
// Based on Ken Perlin's improved noise algorithm, simplified for 2D.
const permutation = (() => {
  const p = [];
  for (let i = 0; i < 256; i++) p.push(i);
  // Deterministic shuffle (seed 42) so the cloudiness looks the same every render
  for (let i = 255; i > 0; i--) {
    const j = Math.floor((((i * 1664525 + 1013904223) & 0xffffffff) >>> 0) % (i + 1));
    [p[i], p[j]] = [p[j], p[i]];
  }
  return [...p, ...p]; // double it
})();

function fade(t) { return t * t * t * (t * (t * 6 - 15) + 10); }
function lerp(a, b, t) { return a + t * (b - a); }
function grad(hash, x, y) {
  const h = hash & 3;
  const u = h < 2 ? x : y;
  const v = h < 2 ? y : x;
  return ((h & 1) ? -u : u) + ((h & 2) ? -v : v);
}

function noise2D(x, y) {
  const X = Math.floor(x) & 255;
  const Y = Math.floor(y) & 255;
  const xf = x - Math.floor(x);
  const yf = y - Math.floor(y);
  const u = fade(xf);
  const v = fade(yf);
  const aa = permutation[permutation[X    ] + Y    ];
  const ab = permutation[permutation[X    ] + Y + 1];
  const ba = permutation[permutation[X + 1] + Y    ];
  const bb = permutation[permutation[X + 1] + Y + 1];
  return lerp(
    lerp(grad(aa, xf, yf), grad(ba, xf - 1, yf), u),
    lerp(grad(ab, xf, yf - 1), grad(bb, xf - 1, yf - 1), u),
    v
  );
}

// Maps noise from [-1,1] to [0,1]
function noise(x, y) { return (noise2D(x, y) + 1) / 2; }

// ─── Main Component ──────────────────────────────────────────────────────────
export default function Option3Canvas({ progress }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    // ── Resize canvas to match physical pixels (fixes blurriness on Retina) ──
    const rect = canvas.getBoundingClientRect();
    const W = rect.width;
    const H = rect.height;
    if (canvas.width !== Math.round(W * dpr) || canvas.height !== Math.round(H * dpr)) {
      canvas.width  = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.scale(dpr, dpr);
    }

    ctx.clearRect(0, 0, W, H);

    // ── Build SVG path to sample points from ────────────────────────────────
    const svgNS = 'http://www.w3.org/2000/svg';
    const pathEl = document.createElementNS(svgNS, 'path');
    pathEl.setAttribute('d', 'M 160 80 C 300 80, 300 260, 160 260 C 20 260, 20 440, 160 440');
    const totalLength = pathEl.getTotalLength();

    const NUM_POINTS = 400;
    const TUBE_RADIUS = 14;   // Outer radius of the tube in CSS pixels
    const NOISE_SCALE = 0.08; // How zoomed-in the Perlin noise is (lower = larger blobs)
    const fluidLimit = Math.floor(progress * NUM_POINTS);

    // ── PASS 1: Drop shadow (draw blurred dark oval beneath the tube) ─────────
    // We draw this on a temporary canvas to blur it
    ctx.save();
    ctx.globalAlpha = 0.10;
    ctx.filter = 'blur(4px)';
    for (let i = 0; i <= NUM_POINTS; i += 3) { // every 3rd point is enough for shadow
      const pt = pathEl.getPointAtLength((i / NUM_POINTS) * totalLength);
      ctx.beginPath();
      ctx.ellipse(pt.x + 2, pt.y + 6, TUBE_RADIUS * 0.9, TUBE_RADIUS * 0.45, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(10, 25, 70, 1)';
      ctx.fill();
    }
    ctx.filter = 'none';
    ctx.globalAlpha = 1;
    ctx.restore();

    // ── PASS 2: Tube body (radial gradient cross-sections + Perlin cloudiness) ─
    for (let i = 0; i <= NUM_POINTS; i++) {
      const pt = pathEl.getPointAtLength((i / NUM_POINTS) * totalLength);
      const x = pt.x;
      const y = pt.y;

      // Get two independent noise values for this point:
      // n1 = base opacity variation (the "cloudiness")
      // n2 = a secondary, faster variation (the random darker patches)
      const n1 = noise(x * NOISE_SCALE, y * NOISE_SCALE);           // slow blobs
      const n2 = noise(x * NOISE_SCALE * 3.5, y * NOISE_SCALE * 3.5); // fast patches

      // Combine: mostly slow blob, sprinkle of fast patch
      const cloudiness = 0.55 + n1 * 0.30 + n2 * 0.15;

      // Draw the radial gradient cross-section circle
      const grad = ctx.createRadialGradient(
        x - TUBE_RADIUS * 0.3, // Offset the inner circle slightly up-left for glare
        y - TUBE_RADIUS * 0.3,
        0,
        x, y,
        TUBE_RADIUS
      );

      // From center outward:
      // Nearly transparent tube — clear medical PVC/silicone look
      // Center: bright white (hollow lumen, light passes straight through)
      grad.addColorStop(0.00, `rgba(248, 252, 255, ${cloudiness * 0.85})`); // bright white center
      grad.addColorStop(0.20, `rgba(230, 240, 255, ${cloudiness * 0.55})`); // very pale blue — almost clear
      grad.addColorStop(0.50, `rgba(180, 200, 235, ${cloudiness * 0.40})`); // soft blue-lavender tint
      grad.addColorStop(0.75, `rgba(110, 135, 190, ${cloudiness * 0.45})`); // slightly deeper approaching rim
      grad.addColorStop(0.88, `rgba(55,  75,  140, ${cloudiness * 0.55})`); // dark charcoal rim edge
      grad.addColorStop(1.00, `rgba(20,  35,   80, 0)`);                      // transparent outer edge

      ctx.beginPath();
      ctx.arc(x, y, TUBE_RADIUS, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
    }

    // ── PASS 3: Inner fluid (animated by progress) ────────────────────────────
    // Only draw up to fluidLimit
    ctx.save();
    ctx.globalAlpha = 0.85;
    for (let i = 0; i <= fluidLimit; i++) {
      const pt = pathEl.getPointAtLength((i / NUM_POINTS) * totalLength);
      const x = pt.x;
      const y = pt.y;
      const FLUID_RADIUS = TUBE_RADIUS * 0.52;

      const fluidGrad = ctx.createRadialGradient(
        x - FLUID_RADIUS * 0.25,
        y - FLUID_RADIUS * 0.25,
        0,
        x, y,
        FLUID_RADIUS
      );
      fluidGrad.addColorStop(0.00, 'rgba(200, 240, 255, 0.95)'); // bright white-blue core
      fluidGrad.addColorStop(0.40, 'rgba(40, 160, 255, 0.85)');  // vivid saline blue
      fluidGrad.addColorStop(0.80, 'rgba(10, 80, 200, 0.75)');   // deep blue edge
      fluidGrad.addColorStop(1.00, 'rgba(0, 40, 140, 0.0)');     // transparent falloff

      ctx.beginPath();
      ctx.arc(x, y, FLUID_RADIUS, 0, Math.PI * 2);
      ctx.fillStyle = fluidGrad;
      ctx.fill();
    }
    ctx.restore();

    // ── PASS 4: Specular highlight line along top rim of tube ─────────────────
    // This is the single most important line for making it look like a cylinder.
    // We draw it as a separate, slightly offset, very thin bright stroke.
    for (let i = 0; i <= NUM_POINTS; i += 2) { // every other point is enough
      const pt = pathEl.getPointAtLength((i / NUM_POINTS) * totalLength);
      const x = pt.x - TUBE_RADIUS * 0.55; // offset to upper-left rim
      const y = pt.y - TUBE_RADIUS * 0.55;

      // Vary the specular brightness slightly using noise for a natural glare
      const specNoise = 0.6 + noise(x * 0.06, y * 0.06) * 0.4;

      const specGrad = ctx.createRadialGradient(x, y, 0, x, y, TUBE_RADIUS * 0.18);
      specGrad.addColorStop(0, `rgba(255, 255, 255, ${specNoise * 1.0})`); // max brightness for clear tube
      specGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.beginPath();
      ctx.arc(x, y, TUBE_RADIUS * 0.18, 0, Math.PI * 2);
      ctx.fillStyle = specGrad;
      ctx.fill();
    }

  }, [progress]);

  // Initial draw and redraw on progress change
  useEffect(() => {
    // Use rAF for smooth updates
    if (animRef.current) cancelAnimationFrame(animRef.current);
    animRef.current = requestAnimationFrame(draw);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [draw]);

  // Handle resize
  useEffect(() => {
    const ro = new ResizeObserver(() => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      animRef.current = requestAnimationFrame(draw);
    });
    if (canvasRef.current) ro.observe(canvasRef.current);
    return () => ro.disconnect();
  }, [draw]);

  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute' }}>
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', display: 'block' }}
      />
    </div>
  );
}
