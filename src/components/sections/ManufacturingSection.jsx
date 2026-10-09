import { useEffect, useRef } from 'react';
import { useGsapReveal } from '../../hooks/useGsapReveal';
import SectionHeading from '../ui/SectionHeading';
import styles from './ManufacturingSection.module.css';

const VIDEO_ID = 'bag8kIPXjM8';
const THUMBNAIL = `https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`;

const PILLARS = [
  { icon: '🏭', title: 'Cleanroom Manufacturing', body: 'Our facilities maintain controlled sterile environments essential for medical device production, ensuring every product is free from contamination.' },
  { icon: '🔄', title: 'In-House End-to-End Production', body: 'From raw materials to sterile final packaging — all manufacturing is performed in-house at our Gurugram plant.' },
  { icon: '✅', title: 'ISO 13485:2016 Quality Assurance', body: 'Every stage of production is governed by our certified Medical Device Quality Management System, ensuring consistent safety and efficacy.' },
];

function YoutubeShort({ videoId }) {
  const containerRef = useRef(null);
  const iframeInjected = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !iframeInjected.current) {
            iframeInjected.current = true;
            const iframe = document.createElement('iframe');
            iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&rel=0&modestbranding=1&playsinline=1&vq=hd1080`;
            iframe.title = 'QU-MED Manufacturing Plant Video';
            iframe.allow = 'autoplay; encrypted-media';
            iframe.allowFullscreen = true;
            iframe.className = styles.videoIframe;
            const thumb = container.querySelector('img');
            if (thumb) {
              thumb.style.transition = 'opacity 0.6s ease';
              thumb.style.opacity = '0';
              setTimeout(() => thumb.remove(), 700);
            }
            container.appendChild(iframe);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [videoId]);

  return (
    <div className={styles.videoWrapper} ref={containerRef}>
      <img
        src={THUMBNAIL}
        alt="QU-MED Manufacturing Facility"
        className={styles.videoThumb}
        loading="lazy"
      />
    </div>
  );
}

export default function ManufacturingSection() {
  const ref = useGsapReveal({ stagger: 0.1, y: 24 });
  return (
    <section className="section section--soft" ref={ref} aria-labelledby="mfg-heading">
      <div className={`container ${styles.grid}`}>
        {/* Text */}
        <div className={styles.textCol}>
          <SectionHeading
            eyebrow="Our Manufacturing"
            heading="State-of-the-art plants in Haryana"
            theme="light"
          />
          <p className={styles.body}>
            At Qu-med Disposable, our manufacturing plant in Gurugram, Haryana, is a hub of
            innovation. Renowned for the diversity of our product range, our highly skilled team
            utilises cutting-edge technology to produce a comprehensive line of medical disposables.
          </p>The client askd
          <div className={styles.pillars}>
            {PILLARS.map(({ icon, title, body }) => (
              <div key={title} className={`reveal ${styles.pillar}`}>
                <span className={styles.pillarIcon}>{icon}</span>
                <div>
                  <p className={styles.pillarTitle}>{title}</p>
                  <p className={styles.pillarBody}>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Video — autoplay on scroll, portrait 9:16 */}
        <div className={`reveal ${styles.visual}`} aria-label="Manufacturing plant video">
          <YoutubeShort videoId={VIDEO_ID} />
        </div>
      </div>
    </section>
  );
}
