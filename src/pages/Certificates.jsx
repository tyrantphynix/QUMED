import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useGsapReveal } from '../hooks/useGsapReveal';
import SectionHeading from '../components/ui/SectionHeading';
import CertCard from '../components/ui/CertCard';
import certifications from '../data/certifications.json';
import styles from './Certificates.module.css';

export default function Certificates() {
  const ref = useGsapReveal({ stagger: 0.1, y: 24 });

  return (
    <>
      <Navbar />
      <main>
        <section className={styles.hero}>
          <div className="container">
            <p className={styles.eyebrow}>Compliance</p>
            <h1 className={styles.heading}>Certifications & Regulatory Compliance</h1>
            <p className={styles.sub}>Every certificate below has been issued by a recognised regulatory body and is on record for Qu-med Disposable, Gurugram, Haryana.</p>
          </div>
        </section>

        <section className="section section--brand" ref={ref}>
          <div className="container">
            <SectionHeading
              eyebrow="Our Certifications"
              heading="Regulatory compliance credentials"
              sub="International and national certifications covering quality systems, product safety, trade, and brand protection."
              align="center"
              theme="dark"
            />
            <div className={styles.grid}>
              {certifications.map(cert => (
                <div key={cert.id} className="reveal" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                  <CertCard cert={cert} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
