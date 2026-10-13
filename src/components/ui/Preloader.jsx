import React, { useState, useEffect } from "react";
import { warmUpSite } from "../../utils/warmup";
import styles from "./Preloader.module.css";

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);
  const [lifted, setLifted] = useState(false);

  useEffect(() => {
    // 1. Lock scroll during preloader
    document.body.style.overflow = "hidden";
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    // 2. Trigger smooth upward glide shortly after mount so it transitions seamlessly from dead center
    const liftTimer = setTimeout(() => {
      setLifted(true);
    }, 60);

    // 3. Trigger async warmup in background
    const warmupPromise = warmUpSite();
    const minTimePromise = new Promise((resolve) => setTimeout(resolve, 1900));

    Promise.all([warmupPromise, minTimePromise]).then(() => {
      setVisible(false);
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    });

    const unmountTimer = setTimeout(() => {
      setShouldRender(false);
      document.body.style.overflow = "";
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, 2500);

    return () => {
      clearTimeout(liftTimer);
      clearTimeout(unmountTimer);
      document.body.style.overflow = "";
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <div className={styles.overlay + " " + (!visible ? styles.fadeOut : "")} aria-hidden={!visible}>
      <div className={styles.ambientGlow} />

      <div className={styles.content}>
        {/* Full Brand Logo: starts at dead center and smoothly glides up */}
        <div className={`${styles.logoWrapper} ${lifted ? styles.logoLifted : ""}`}>
          <div className={styles.logoPulseInner}>
            <img
              src="/images/White-Logo.png"
              alt="Qu-med Disposable"
              className={styles.fullLogoImg}
            />
          </div>
        </div>

        {/* Animated ECG Heartbeat waveform: gracefully fades in */}
        <div className={`${styles.ecgTrack} ${lifted ? styles.revealed : ""}`}>
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

        <p className={`${styles.tagline} ${lifted ? styles.revealed : ""}`}>
          ISO 13485:2016 Certified Medical Devices
        </p>

        {/* Mobile-only experience note */}
        <p className={`${styles.mobileNotice} ${lifted ? styles.revealed : ""}`}>
          Best experienced on desktop
        </p>
      </div>
    </div>
  );
}
