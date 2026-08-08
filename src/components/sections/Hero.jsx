import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from '../../utils/gsap.config';
import styles from './Hero.module.css';

const CATALOGUE_URL = 'https://qumed.in/wp-content/uploads/2024/05/QUMED_CATALOUGE.pdf';

// Product chips shown under the right-panel visual — becomes real thumbnails later
const PRODUCT_CHIPS = [
  { label: 'IV Cannula',         code: 'QU-FLON' },
  { label: 'Oxygen Mask',        code: 'QU-MASK' },
  { label: 'Ventilator Circuit', code: 'QU-TUBI' },
];

export default function Hero() {
  const headlineRef  = useRef(null);
  const subRef       = useRef(null);
  const ctaRef       = useRef(null);
  const badgeRef     = useRef(null);
  const rightPanelRef= useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    tl.fromTo(badgeRef.current,     { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 })
      .fromTo(headlineRef.current,  { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.3')
      .fromTo(subRef.current,       { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.5')
      .fromTo(ctaRef.current,       { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
      .fromTo(rightPanelRef.current,{ opacity: 0, x: 32 }, { opacity: 1, x: 0,  duration: 0.9 }, '-=0.8');
  }, []);

  return (
    <section className={styles.hero} aria-label="QU-MED Disposable — Hero">

      {/* ── Background: IV tube path SVG (replaces generic circles) ── */}
      <div className={styles.bg} aria-hidden="true">
        <svg className={styles.bgSvg} viewBox="0 0 1400 800" fill="none" preserveAspectRatio="xMidYMid slice">
          {/* IV tube path — suggestive, very faint */}
          <path
            d="M -40 780 Q 180 560 420 420 T 820 200 T 1200 60 T 1440 20"
            stroke="rgba(199,219,248,0.06)" strokeWidth="2.5" fill="none"
            strokeLinecap="round"
          />
          <path
            d="M -40 800 Q 180 580 420 440 T 820 220 T 1200 80 T 1440 40"
            stroke="rgba(199,219,248,0.04)" strokeWidth="1.5" fill="none"
            strokeLinecap="round"
          />
          {/* Drip chamber hint — circle at midpoint */}
          <circle cx="420" cy="420" r="18" stroke="rgba(199,219,248,0.07)" strokeWidth="1.5" fill="none"/>
          <circle cx="420" cy="420" r="8"  fill="rgba(199,219,248,0.05)"/>
        </svg>
      </div>

      {/* ── 2-col layout ── */}
      <div className={`container ${styles.layout}`}>

        {/* LEFT: Content column */}
        <div className={styles.contentCol}>
          {/* Cert badge */}
          <div ref={badgeRef} className={styles.badge} style={{ opacity: 0 }}>
            <span className={styles.badgeDot} />
            ISO 13485:2016 · CE Marked · IEC Registered · Est. 2012
          </div>

          {/* Headline */}
          <h1 ref={headlineRef} className={styles.headline} style={{ opacity: 0 }}>
            Precision is a lifeline.<br />
            <span className={styles.accent}>We manufacture it.</span>
          </h1>

          {/* Product specificity line */}
          <div ref={subRef} style={{ opacity: 0 }}>
            <p className={styles.sub}>
              From IV sets to ventilator circuits — QU-MED Disposable delivers sterile,
              quality-assured medical disposables crafted in Gurugram, India.
            </p>
            {/* Inline product domain cues */}
            <div className={styles.productCues}>
              {['IV Cannula', 'Oxygen Mask', 'Ventilator Circuit', 'Urobag', 'Spirometer'].map(p => (
                <span key={p} className={styles.productCue}>{p}</span>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div ref={ctaRef} className={styles.ctas} style={{ opacity: 0 }}>
            <Link to="/products" className={styles.ctaPrimary}>Explore Products</Link>
            <a href={CATALOGUE_URL} target="_blank" rel="noopener noreferrer" className={styles.ctaOutline}>
              Download Catalogue
            </a>
          </div>

          {/* Scroll cue */}
          <div className={styles.scrollCue} aria-hidden="true">
            <span className={styles.scrollLine} />
            <span className={styles.scrollLabel}>Scroll</span>
          </div>
        </div>

        {/* RIGHT: Visual panel */}
        <div ref={rightPanelRef} className={styles.visualCol} style={{ opacity: 0 }}>

          {/* Main visual slot — Three.js mounts here */}
          <div className={styles.visualPanel} id="hero-visual-slot">
            {/* Three.js canvas — reserved, mounts as absolute overlay */}
            <div id="hero-canvas" className={styles.threeCanvas} aria-hidden="true" />

            {/* Clinical placeholder visible until Three.js mounts */}
            <div className={styles.visualPlaceholder} aria-hidden="true">
              {/* IV drip line illustration — CSS + SVG */}
              <svg viewBox="0 0 200 260" fill="none" className={styles.medSvg}>
                {/* Drip bag outline */}
                <rect x="55" y="12" width="90" height="70" rx="12"
                  stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" fill="rgba(255,255,255,0.04)"/>
                {/* Bag liquid level */}
                <rect x="58" y="45" width="84" height="34" rx="8"
                  fill="rgba(199,219,248,0.12)"/>
                {/* Drip chamber */}
                <rect x="85" y="82" width="30" height="42" rx="6"
                  stroke="rgba(255,255,255,0.20)" strokeWidth="1.5" fill="rgba(255,255,255,0.05)"/>
                {/* Drip drop */}
                <ellipse cx="100" cy="110" rx="4" ry="6" fill="rgba(199,219,248,0.3)"/>
                {/* Tube going down */}
                <line x1="100" y1="124" x2="100" y2="200"
                  stroke="rgba(255,255,255,0.20)" strokeWidth="1.5"/>
                {/* IV connector */}
                <rect x="88" y="195" width="24" height="14" rx="4"
                  stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" fill="rgba(255,255,255,0.06)"/>
                {/* Cannula tip */}
                <path d="M88 209 L112 209 L118 216 L82 216 Z"
                  fill="rgba(0,103,255,0.4)" stroke="rgba(0,103,255,0.6)" strokeWidth="1"/>
                {/* Animated drip dot */}
                <circle cx="100" cy="150" r="3" fill="rgba(199,219,248,0.5)" className="drip-dot"/>
              </svg>

              {/* Label */}
              <p className={styles.visualLabel}>
                Sterile · Single-Use · ISO-Certified
              </p>
            </div>

            {/* "Product photo" overlay text for dev clarity */}
            <span className={styles.slotHint}>Hero visual / Three.js mount</span>
          </div>

          {/* Product chips below the panel */}
          <div className={styles.productChips}>
            {PRODUCT_CHIPS.map(({ label, code }) => (
              <div key={code} className={styles.chip}>
                <span className={styles.chipCode}>{code}</span>
                <span className={styles.chipLabel}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
