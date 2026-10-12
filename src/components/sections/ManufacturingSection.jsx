import { useEffect, useRef } from "react";
import { useGsapReveal } from "../../hooks/useGsapReveal";
import SectionHeading from "../ui/SectionHeading";
import styles from "./ManufacturingSection.module.css";

const PILLARS = [
  { icon: "🏭", title: "Cleanroom Manufacturing", body: "Our facilities maintain controlled sterile environments essential for medical device production, ensuring every product is free from contamination." },
  { icon: "🔄", title: "In-House End-to-End Production", body: "From raw materials to sterile final packaging — all manufacturing is performed in-house at our Gurugram plant." },
  { icon: "✅", title: "ISO 13485:2016 Quality Assurance", body: "Every stage of production is governed by our certified Medical Device Quality Management System, ensuring consistent safety and efficacy." },
];

function PlantVideo() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        video.muted = true;
        video.play().catch(() => {});
      });
    }
  }, []);

  return (
    <div className={styles.videoWrapper}>
      <video
        ref={videoRef}
        src="/videos/plant-tour.mp4"
        poster="/images/plant-gurugram.jpg"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className={styles.videoPlayer}
      />
    </div>
  );
}

export default function ManufacturingSection() {
  const ref = useGsapReveal({ stagger: 0.1, y: 24 });
  return (
    <section className="section section--soft" ref={ref} aria-labelledby="mfg-heading">
      <div className={"container " + styles.grid}>
        {/* Text */}
        <div className={styles.textCol}>
          <SectionHeading
            eyebrow="Our Manufacturing"
            heading="State-of-the-art plant in Haryana"
            theme="light"
          />
          <p className={styles.body}>
            At Qu-med Disposable, our manufacturing plant in Gurugram, Haryana, is a hub of
            innovation. Renowned for the diversity of our product range, our highly skilled team
            utilises cutting-edge technology to produce a comprehensive line of medical disposables.
          </p>
          <div className={styles.pillars}>
            {PILLARS.map(({ icon, title, body }) => (
              <div key={title} className={"reveal " + styles.pillar}>
                <span className={styles.pillarIcon}>{icon}</span>
                <div>
                  <p className={styles.pillarTitle}>{title}</p>
                  <p className={styles.pillarBody}>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Video — cleanly loops without pause buttons */}
        <div className={"reveal " + styles.visual} aria-label="Manufacturing plant video">
          <PlantVideo />
        </div>
      </div>
    </section>
  );
}
