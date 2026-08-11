import { useGsapReveal } from '../../hooks/useGsapReveal';
import SectionHeading from '../ui/SectionHeading';
import styles from './ManufacturingSection.module.css';

const PILLARS = [
  { icon: '🏭', title: 'Cleanroom Manufacturing', body: 'Our facilities maintain controlled sterile environments essential for medical device production, ensuring every product is free from contamination.' },
  { icon: '🔄', title: 'In-House End-to-End Production', body: 'From raw materials to sterile final packaging — all manufacturing is performed in-house across our Gurugram and Bawal plants.' },
  { icon: '✅', title: 'ISO 13485:2016 Quality Assurance', body: 'Every stage of production is governed by our certified Medical Device Quality Management System, ensuring consistent safety and efficacy.' },
];

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
            At QU-MED Disposable, our manufacturing plant in Gurugram, Haryana, is a hub of
            innovation. Renowned for the diversity of our product range, our highly skilled team
            utilises cutting-edge technology to produce a comprehensive line of medical disposables.
          </p>
          <p className={styles.body}>
            Our second facility in Bawal extends our production capacity, enabling us to serve
            the growing needs of healthcare professionals with consistency and speed.
          </p>
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

        {/* Visual placeholder — replace with client photo */}
        <div className={`reveal ${styles.visual}`} aria-hidden="true">
          <div className={styles.visualInner}>
            <div className={styles.visualIcon}>🏗</div>
            <p className={styles.visualLabel}>Gurugram Manufacturing Plant</p>
            <p className={styles.visualSub}>Udyog Vihar, Phase VI, Sector 37</p>
          </div>
        </div>
      </div>
    </section>
  );
}
