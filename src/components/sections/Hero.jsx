import React, { useEffect, useRef, useState, Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from '../../utils/gsap.config';
import styles from './Hero.module.css';
import HeroVisualFallback from '../3d/HeroVisualFallback';
import SyringeSVG from '../3d/SyringeSVG';

const HeroScene = lazy(() => import('../3d/HeroScene'));

const CATALOGUE_URL = 'https://qumed.in/wp-content/uploads/2024/05/QUMED_CATALOUGE.pdf';

export default function Hero({ scrollProgress = 0 }) {
  const headlineRef = useRef(null);
  const subRef      = useRef(null);
  const ctaRef      = useRef(null);
  const badgeRef    = useRef(null);
  const heroRef     = useRef(null);

  const [localProgress, setLocalProgress] = useState(0);

  // Scroll listener for hero-specific progress if external scrollProgress not passed
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const heroHeight = heroRef.current.offsetHeight || window.innerHeight;
      const currentScroll = window.scrollY;
      const prog = Math.max(0, Math.min(1, currentScroll / heroHeight));
      setLocalProgress(prog);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeProgress = scrollProgress || localProgress;

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    tl.fromTo(badgeRef.current,    { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 })
      .fromTo(headlineRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.3')
      .fromTo(subRef.current,      { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.5')
      .fromTo(ctaRef.current,      { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4');
  }, []);

  return (
    <section ref={heroRef} className={styles.hero} aria-label="QU-MED Disposable — Hero">
      {/* Background geometric lines */}
      <div className={styles.bg} aria-hidden="true">
        <svg className={styles.bgSvg} viewBox="0 0 1200 700" fill="none" preserveAspectRatio="xMidYMid slice">
          <circle cx="900" cy="150" r="300" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
          <circle cx="900" cy="150" r="200" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
          <circle cx="900" cy="150" r="100" stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>
          <line x1="0" y1="500" x2="600" y2="200" stroke="rgba(199,219,248,0.06)" strokeWidth="1"/>
          <line x1="200" y1="700" x2="700" y2="100" stroke="rgba(199,219,248,0.04)" strokeWidth="1"/>
        </svg>

        {/* Three.js 3D Syringe slot (desktop & tablet) */}
        <div id="hero-visual-slot" className={styles.visualSlot} aria-hidden="true">
          <Suspense fallback={<HeroVisualFallback />}>
            <HeroScene scrollProgress={activeProgress} fallback={<HeroVisualFallback />} />
          </Suspense>
        </div>
      </div>

      <div className={`container ${styles.content}`}>
        {/* Mobile Syringe Display (visible < 768px above headline) */}
        <div className={styles.mobileSyringeSlot} aria-hidden="true">
          <SyringeSVG scrollProgress={activeProgress} />
        </div>

        {/* Badge */}
        <div ref={badgeRef} className={styles.badge} style={{ opacity: 0 }}>
          <span className={styles.badgeDot} />
          ISO 13485:2016 · CE Marked · IEC Registered · Est. 2012
        </div>

        {/* Headline */}
        <h1 ref={headlineRef} className={styles.headline} style={{ opacity: 0 }}>
          Precision is a lifeline.<br />
          <span className={styles.accent}>We manufacture it.</span>
        </h1>

        {/* Subtext */}
        <p ref={subRef} className={styles.sub} style={{ opacity: 0 }}>
          From IV sets to ventilator circuits — QU-MED Disposable delivers sterile,
          quality-assured medical disposables crafted in Gurugram, India.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className={styles.ctas} style={{ opacity: 0 }}>
          <Link to="/products" className={styles.ctaPrimary}>Explore Products</Link>
          <a
            href={CATALOGUE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaOutline}
          >
            Download Catalogue
          </a>
        </div>

        {/* Scroll cue */}
        <div className={styles.scrollCue} aria-hidden="true">
          <span className={styles.scrollLine} />
          <span className={styles.scrollLabel}>Scroll</span>
        </div>
      </div>
    </section>
  );
}
