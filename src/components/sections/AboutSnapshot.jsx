import { Link } from 'react-router-dom';
import { useGsapReveal } from '../../hooks/useGsapReveal';
import SectionHeading from '../ui/SectionHeading';
import styles from './AboutSnapshot.module.css';

export default function AboutSnapshot() {
  const ref = useGsapReveal({ stagger: 0.1, y: 28 });
  return (
    <section className={`section section--soft ${styles.section}`} ref={ref} aria-labelledby="about-heading">
      
      <div className={`container ${styles.grid}`}>
        {/* Pull-quote col */}
        <div className={`reveal ${styles.quoteCol}`}>
          <blockquote className={styles.quote}>
            "Medical equipment isn't just technology — it's the foundation for a healthier tomorrow."
          </blockquote>
          <cite className={styles.cite}>— QU-MED Disposable</cite>
        </div>

        {/* Content col */}
        <div className={`reveal ${styles.contentCol}`}>
          <SectionHeading
            eyebrow="Who We Are"
            heading="Committed to quality medical manufacturing"
            theme="light"
          />
          <p className={styles.para}>
            At QU-MED Disposable, we manufacture a wide range of medical devices across
            Infusion, Urology, Anesthesia, Surgery Suction, and Critical Care — all designed
            to meet the highest standards of quality and patient safety.
          </p>
          <p className={styles.para}>
            Founded by KP Singhania and Vijay Kumar Soni, we began with a small space and
            a handful of products. Today, our state-of-the-art plants in Gurugram and Bawal,
            Haryana, produce a comprehensive line of sterile medical disposables used by
            healthcare providers worldwide.
          </p>
          <Link to="/about" className={styles.link}>
            Our Full Story →
          </Link>
        </div>
      </div>
    </section>
  );
}
