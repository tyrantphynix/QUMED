import { useGsapReveal } from '../../hooks/useGsapReveal';
import TubeSegmentSVG from '../layout/TubeSegmentSVG';
import styles from './TrustStrip.module.css';

const CERTS = [
  { label: 'ISO 13485:2016', sub: 'Medical Device QMS' },
  { label: 'CE Marked', sub: 'Class I Medical Devices' },
  { label: 'IEC Registered', sub: 'Govt of India' },
  { label: 'Registered Trademark', sub: 'Class 10 — Medical' },
  { label: 'MSME Registered', sub: 'Small Enterprise' },
  { label: 'Est. 2012', sub: 'Over a decade of manufacturing' },
];

export default function TrustStrip() {
  const ref = useGsapReveal({ stagger: 0.08, y: 16, start: 'top 95%' });
  return (
    <section className={styles.strip} ref={ref} aria-label="Trust signals">
      <TubeSegmentSVG 
        position="right" 
        viewBox="0 0 100 200"
        pathData="M 60 -20 C 60 80, 30 120, 30 220" 
        style={{ opacity: 0.2, right: '-60px' }} 
      />
      <div className={`container ${styles.inner}`}>
        {CERTS.map(({ label, sub }) => (
          <div key={label} className={`reveal ${styles.item}`}>
            <p className={styles.label}>{label}</p>
            <p className={styles.sub}>{sub}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
