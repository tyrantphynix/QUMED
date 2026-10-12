import React, { useState, useEffect } from "react";
import styles from "./Preloader.module.css";

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Lock scroll during preloader to prevent browser from restoring past scroll offset
    document.body.style.overflow = "hidden";
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    const fadeTimer = setTimeout(() => {
      setVisible(false);
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, 1100);

    const unmountTimer = setTimeout(() => {
      setShouldRender(false);
      document.body.style.overflow = "";
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, 1650);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(unmountTimer);
      document.body.style.overflow = "";
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <div className={styles.overlay + " " + (!visible ? styles.fadeOut : "")} aria-hidden={!visible}>
      <div className={styles.ambientGlow} />

      <div className={styles.content}>
        {/* Heartbeat pulse rings & Logo */}
        <div className={styles.logoWrapper}>
          <div className={styles.pulseRing} />
          <div className={styles.pulseRing + " " + styles.pulseRingDelay} />
          <div className={styles.logoBadge}>
            <img src="/favicon.png" alt="Qu-med" className={styles.logoImg} />
          </div>
        </div>

        {/* Brand Name */}
        <div className={styles.brandTextGroup}>
          <h1 className={styles.brandName}>QU-MED</h1>
          <span className={styles.brandSub}>DISPOSABLE</span>
        </div>

        {/* Animated ECG Heartbeat waveform */}
        <div className={styles.ecgTrack}>
          <svg
            className={styles.ecgSvg}
            viewBox="0 0 200 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className={styles.ecgPath}
              d="M0 20 H60 L68 10 L76 30 L84 4 L92 36 L100 20 L108 20 L114 14 L120 26 L126 20 H200"
              stroke="#0067FF"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <p className={styles.tagline}>ISO 13485:2016 Certified Medical Devices</p>
      </div>
    </div>
  );
}
