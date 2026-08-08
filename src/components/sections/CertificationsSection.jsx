import { Link } from 'react-router-dom';
import { useGsapReveal } from '../../hooks/useGsapReveal';
import SectionHeading from '../ui/SectionHeading';
import CertCard from '../ui/CertCard';
import certifications from '../../data/certifications.json';
import styles from './CertificationsSection.module.css';

export default function CertificationsSection() {
  const ref = useGsapReveal({ stagger: 0.1, y: 20, start: 'top 80%' });
  return (
    <section className={`section section--brand ${styles.section}`} ref={ref} aria-labelledby="certs-heading">
      <div className={`container ${styles.inner}`}>
        <SectionHeading
          eyebrow="Certifications & Compliance"
          heading="Globally certified. Locally accountable."
          sub="Every product we manufacture meets stringent international and national regulatory standards."
          align="center"
          theme="dark"
        />
        <div className={styles.grid}>
          {certifications.map(cert => (
            <div key={cert.id} className="reveal">
              <CertCard cert={cert} />
            </div>
          ))}
        </div>
        <div className={styles.cta}>
          <Link to="/certificates" className={styles.ctaBtn}>View All Certificates →</Link>
        </div>
      </div>
    </section>
  );
}
