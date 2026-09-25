import React, { useEffect, useRef, useState, useMemo } from 'react';
import styles from './TubeOverlay.module.css';

/**
 * TubeOverlay — Gemini's corrected SVG structure (2nd iteration):
 * - Outer dark rim: rgba(80,100,140, 0.25) at 22px
 * - Inner plastic wall: rgba(255,255,255, 0.6) at 18px  ← the refraction bright wall
 * - Lumen: rgba(240,245,255, 0.2) at 12px
 * - Fluid: rgba(100,170,255, 0.45) at 10px (wide enough to fill the channel)
 * - Specular base: rgba(255,255,255, 0.8) at 3.5px with transform translate(-2,-3)
 * - Specular core: #ffffff at 1.2px with transform translate(-3.5,-4.5)
 * The transform offset on specular lines is the cylinder illusion key.
 */
export default function TubeOverlay({ scrollProgress }) {
  const containerRef   = useRef(null);
  const pathMeasureRef = useRef(null);
  const [coords, setCoords]               = useState(null);
  const [pathLength, setPathLength]       = useState(1600);
  const [fluidProgress, setFluidProgress] = useState(0);

  const updateLayout = () => {
    const container = containerRef.current;
    if (!container) return;
    const cr     = container.getBoundingClientRect();
    const width  = cr.width;
    const height = cr.height;

    const syringeEl = document.querySelector('#syringe-tube-anchor');
    let startX = width * 0.62, startY = 660;
    if (syringeEl) {
      const r = syringeEl.getBoundingClientRect();
      startX = r.left - cr.left + r.width  * 0.5;
      startY = r.top  - cr.top  + r.height;
    }

    const cardsEl = document.querySelector('[data-trust-cards]');
    const trustEl = document.querySelector('[data-trust-strip]');
    let cardsCenterY = 820, cardsRight = width * 0.90, cardsLeft = width * 0.10;

    if (cardsEl) {
      const r = cardsEl.getBoundingClientRect();
      cardsCenterY = r.top  + r.height / 2 - cr.top;
      cardsRight   = r.right - cr.left;
      cardsLeft    = r.left  - cr.left;
    } else if (trustEl) {
      const r = trustEl.getBoundingClientRect();
      cardsCenterY = r.top  + r.height / 2 - cr.top;
      cardsRight   = r.right - cr.left - 20;
      cardsLeft    = r.left  - cr.left + 20;
    }

    const sweepX = Math.min(width - 24, cardsRight + 48);
    const turnX  = Math.max(34, cardsLeft - 68);
    const endY   = cardsCenterY + 280;
    const productsEl = document.querySelector('[aria-labelledby="products-heading"]');
    let productsTop = cardsCenterY + 500;
    let productsBottom = cardsCenterY + 1500;
    if (productsEl) {
      const r = productsEl.getBoundingClientRect();
      productsTop = r.top - cr.top;
      productsBottom = r.bottom - cr.top;
    }
    
    const certsEl = document.querySelector('[aria-labelledby="certs-heading"]');
    let certsBottom = productsBottom + 800;
    if (certsEl) {
      const r = certsEl.getBoundingClientRect();
      certsBottom = r.bottom - cr.top;
    }
    
    const cardsTop = cardsCenterY - 55;
    setCoords({ width, height, startX, startY, sweepX, cardsRight, cardsCenterY, cardsTop, cardsLeft, turnX, endY, productsTop, productsBottom, certsBottom });
  };

  useEffect(() => {
    updateLayout();
    const t1 = setTimeout(updateLayout, 100);
    const t2 = setTimeout(updateLayout, 500);
    const onResize = () => updateLayout();
    window.addEventListener('resize', onResize, { passive: true });
    window.addEventListener('orientationchange', onResize, { passive: true });
    let ro;
    if (typeof ResizeObserver !== 'undefined' && containerRef.current) {
      ro = new ResizeObserver(updateLayout);
      ro.observe(containerRef.current);
    }
    return () => {
      clearTimeout(t1); clearTimeout(t2);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
      if (ro) ro.disconnect();
    };
  }, []);

  const pathD = useMemo(() => {
    if (!coords) return '';
    const { width, startX, startY, sweepX, turnX, productsTop, productsBottom, certsBottom } = coords;
    
    // ── Physics-based path matching ONLY the red line exactly ─────────────
    const dx = 0.375, dy = 0.927;
    
    // Syringe exit
    const cp1_x = startX + 150 * dx;
    const cp1_y = startY + 150 * dy;
    
    // Right and Left margins
    const rightMarginX = sweepX;
    const leftMarginX = turnX;
    
    // Top Swoop (Right to Left above Products)
    const sweepTopY = productsTop ? productsTop - 150 : startY + 900;
    const sweepCenterY = productsTop ? productsTop - 30 : startY + 1000;
    const sweepLeftCurveY = productsTop ? productsTop - 80 : startY + 950;
    const dropLeftY = productsTop ? productsTop + 150 : startY + 1150;
    
    // Middle Swoop (Left to Right below Products, into Certs)
    const swoopBottomY = productsBottom ? productsBottom + 50 : dropLeftY + 1000;
    
    // Lower Swoop (Right to Left below Certs, into Manufacturing)
    const certsSweepY = certsBottom ? certsBottom + 80 : swoopBottomY + 800;
    
    return [
      `M ${startX.toFixed(1)} ${startY.toFixed(1)}`,
      
      // 1. Syringe down to the right edge
      `C ${cp1_x.toFixed(1)} ${cp1_y.toFixed(1)}, ` +
      `${(rightMarginX).toFixed(1)} ${(startY + 200).toFixed(1)}, ` +
      `${rightMarginX.toFixed(1)} ${(startY + 400).toFixed(1)}`,
      
      // 2. Straight down the right edge
      `L ${rightMarginX.toFixed(1)} ${sweepTopY.toFixed(1)}`,
      
      // 3. Curve from Right vertical to Center horizontal (dipping slightly)
      `C ${rightMarginX.toFixed(1)} ${(sweepTopY + 100).toFixed(1)}, ` +
      `${(rightMarginX - 100).toFixed(1)} ${sweepCenterY.toFixed(1)}, ` +
      `${(width / 2).toFixed(1)} ${sweepCenterY.toFixed(1)}`,
      
      // 4. Continue from Center to Left, rising slightly to clear the blue wave, then turning DOWN
      `C ${(leftMarginX + 150).toFixed(1)} ${sweepCenterY.toFixed(1)}, ` +
      `${leftMarginX.toFixed(1)} ${sweepLeftCurveY.toFixed(1)}, ` +
      `${leftMarginX.toFixed(1)} ${dropLeftY.toFixed(1)}`,
      
      // 5. Straight drop down the left margin past the product cards
      `L ${leftMarginX.toFixed(1)} ${(swoopBottomY - 200).toFixed(1)}`,
      
      // 6. Swoop from Left vertical to Right vertical (crossing into the certs blue section)
      `C ${leftMarginX.toFixed(1)} ${(swoopBottomY).toFixed(1)}, ` +
      `${(leftMarginX + 200).toFixed(1)} ${(swoopBottomY + 50).toFixed(1)}, ` +
      `${(width / 2).toFixed(1)} ${(swoopBottomY + 50).toFixed(1)}`,
      
      `C ${(rightMarginX - 200).toFixed(1)} ${(swoopBottomY + 50).toFixed(1)}, ` +
      `${rightMarginX.toFixed(1)} ${(swoopBottomY + 100).toFixed(1)}, ` +
      `${rightMarginX.toFixed(1)} ${(swoopBottomY + 300).toFixed(1)}`,
      
      // 7. Straight drop down the right margin through the blue Certs section
      `L ${rightMarginX.toFixed(1)} ${(certsSweepY - 200).toFixed(1)}`,
      
      // 8. Swoop from Right vertical to Left vertical (below certs, into manufacturing)
      `C ${rightMarginX.toFixed(1)} ${certsSweepY.toFixed(1)}, ` +
      `${(rightMarginX - 200).toFixed(1)} ${(certsSweepY + 50).toFixed(1)}, ` +
      `${(width / 2).toFixed(1)} ${(certsSweepY + 50).toFixed(1)}`,
      
      `C ${(leftMarginX + 200).toFixed(1)} ${(certsSweepY + 50).toFixed(1)}, ` +
      `${leftMarginX.toFixed(1)} ${(certsSweepY + 100).toFixed(1)}, ` +
      `${leftMarginX.toFixed(1)} ${(certsSweepY + 300).toFixed(1)}`,
      
      // 9. Final straight drop down the left margin
      `L ${leftMarginX.toFixed(1)} ${(certsSweepY + 1000).toFixed(1)}`
      
    ].join(' ');
  }, [coords]);

  useEffect(() => {
    if (pathMeasureRef.current) {
      try {
        const len = pathMeasureRef.current.getTotalLength();
        if (len > 0) setPathLength(len);
      } catch (_) {}
    }
  }, [pathD]);

  useEffect(() => {
    const onScroll = () => {
      const pathEl = pathMeasureRef.current;
      if (!pathEl) return;
      const totalLength = pathEl.getTotalLength();
      if (totalLength === 0) return;

      const scrollY = window.scrollY;

      // ── Phase 1: First 120px of scroll ──────────────────────────────────────
      // Immediately ramp the fluid from 0 → SEED_PROGRESS so the liquid appears
      // at the tube entrance the instant the user starts scrolling, matching the
      // syringe piston which starts pressing at the same time.
      const SEED_SCROLL   = 120;  // px of scroll to complete the seed phase
      const SEED_PROGRESS = 0.04; // 4% of tube filled as the 'just started' state

      if (scrollY < SEED_SCROLL) {
        setFluidProgress((scrollY / SEED_SCROLL) * SEED_PROGRESS);
        return;
      }

      // ── Phase 2: Beyond seed — binary search locked to viewport center ───────
      const containerTop = containerRef.current
        ? containerRef.current.getBoundingClientRect().top + scrollY
        : 0;
      const targetY = scrollY + (window.innerHeight * 0.5);

      let low = 0;
      let high = totalLength;
      let bestLen = 0;

      for (let i = 0; i < 15; i++) {
        const mid = (low + high) / 2;
        const pt  = pathEl.getPointAtLength(mid);
        const ptPageY = pt.y + containerTop;
        if (ptPageY < targetY) {
          low = mid;
          bestLen = mid;
        } else {
          high = mid;
        }
      }

      // Never let it snap back below seed progress when handing off from phase 1
      const progress = Math.max(SEED_PROGRESS, bestLen / totalLength);
      setFluidProgress(Math.min(1, progress));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const activeProgress   = scrollProgress !== undefined ? scrollProgress : fluidProgress;
  const strokeDashoffset = pathLength * (1 - activeProgress);

  if (!coords || !pathD) {
    return <div ref={containerRef} className={styles.overlayContainer} aria-hidden="true" />;
  }

  return (
    <div ref={containerRef} className={styles.overlayContainer} aria-hidden="true">
      <svg
        className={styles.svg}
        viewBox={`0 0 ${coords.width} ${coords.height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* The single shared path — all layers reference this via <use> */}
          <path id="tube-path" d={pathD} />

          {/* Realistic depth shadow — stronger than before per Gemini */}
          <filter id="tube-shadow" x="-20%" y="-20%" width="150%" height="150%">
            <feDropShadow dx="3" dy="8" stdDeviation="6"
              floodColor="#001433" floodOpacity="0.15" />
          </filter>
        </defs>

        {/* Hidden measure path (must be a real path element for getTotalLength) */}
        <path ref={pathMeasureRef} d={pathD} fill="none" opacity="0" pointerEvents="none" />

        <g filter="url(#tube-shadow)">

          {/* 1. Outer Dark Rim
              Defines the 22px physical boundary of the tube.
              rgba(80,100,140, 0.25) — a cooler-toned blue-grey at low opacity. */}
          <use href="#tube-path" fill="none"
            stroke="rgba(80, 100, 140, 0.25)"
            strokeWidth="22"
            strokeLinecap="butt"
          />

          {/* 2. Inner Plastic Wall — THE KEY LAYER (Gemini's insight)
              rgba(255,255,255, 0.6) at 18px.
              This bright white layer inside the dark rim creates the refraction
              of the tube wall — exactly how light behaves through PVC/glass.
              Dark edge → sudden bright wall → hollow centre = cylinder illusion. */}
          <use href="#tube-path" fill="none"
            stroke="rgba(255, 255, 255, 0.6)"
            strokeWidth="18"
            strokeLinecap="butt"
          />

          {/* 3. Lumen / Hollow Core
              Slightly milky centre at 20% opacity.
              The inside of the tube — hollow air channel. */}
          <use href="#tube-path" fill="none"
            stroke="rgba(240, 245, 255, 0.2)"
            strokeWidth="12"
            strokeLinecap="butt"
          />

          {/* 4. Animated Liquid Fill
              10px wide — fills the lumen properly, not a thin wire.
              Scroll-driven via strokeDashoffset. */}
          <use href="#tube-path" fill="none"
            stroke="rgba(100, 170, 255, 0.45)"
            strokeWidth="10"
            strokeLinecap="butt"
            strokeDasharray={`${pathLength} ${pathLength}`}
            strokeDashoffset={strokeDashoffset}
          />

          {/* 5. Specular Glare Base
              Soft wide white line OFFSET upper-left by translate(-2,-3).
              The offset is what creates the cylinder illusion — light hitting from top-left.
              Without offset = flat. With offset = round 3D tube. */}
          <use href="#tube-path" fill="none"
            stroke="rgba(255, 255, 255, 0.8)"
            strokeWidth="3.5"
            strokeLinecap="butt"
            transform="translate(-2, -3)"
          />

          {/* 6. Specular Glare Core
              Sharp thin white at full opacity, offset further (-3.5,-4.5).
              The crisp rim glint — the brightest point of the highlight. */}
          <use href="#tube-path" fill="none"
            stroke="#ffffff"
            strokeWidth="1.2"
            strokeLinecap="butt"
            transform="translate(-3.5, -4.5)"
          />

        </g>

        
      </svg>
    </div>
  );
}
