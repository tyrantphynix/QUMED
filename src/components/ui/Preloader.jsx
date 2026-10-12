import React, { useState, useEffect } from "react";
import { warmUpSite } from "../../utils/warmup";
import styles from "./Preloader.module.css";

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // 1. Lock scroll during preloader to prevent browser from restoring past scroll offset
    document.body.style.overflow = "hidden";
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    // 2. Trigger async warmup in the background (decoding images, preloading video, refreshing ScrollTrigger)
    const warmupPromise = warmUpSite();

    // 3. Keep preloader visible for at least 1.8s for a polished entrance and smooth layout settling
    const minTimePromise = new Promise((resolve) => setTimeout(resolve, 1800));

    Promise.all([warmupPromise, minTimePromise]).then(() => {
      setVisible(false);
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    });

    const unmountTimer = setTimeout(() => {
      setShouldRender(false);
      document.body.style.overflow = "";
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, 2400);

    return () => {
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
