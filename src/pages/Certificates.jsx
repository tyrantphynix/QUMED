import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useGsapReveal } from '../hooks/useGsapReveal';
import SectionHeading from '../components/ui/SectionHeading';
import CertCard from '../components/ui/CertCard';
import certifications from '../data/certifications.json';
import styles from './Certificates.module.css';

export default function Certificates() {
  const ref = useGsapReveal({ stagger: 0.1, y: 24 });

  // CE marked products list
  const ceCert = certifications.find(c => c.id === 'ce-marking');

  return (
    <>
      <Navbar />
      <main>
        <section className={styles.hero}>
          <div className="container">
            <p className={styles.eyebrow}>Compliance</p>
            <h1 className={styles.heading}>Certifications & Regulatory Compliance</h1>
            <p className={styles.sub}>Every certificate below has been issued by a recognised regulatory body and is on record for QU-MED Disposable, Gurugram, Haryana.</p>
          </div>
        </section>

        <section className="section section--brand" ref={ref}>
          <div className="container">
            <SectionHeading
              eyebrow="Our Certifications"
              heading="Six regulatory credentials"
              sub="International and national certifications covering quality systems, product safety, trade, and brand protection."
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
          </div>
        </section>

        {/* CE Products accordion */}
        {ceCert && ceCert.products.length > 0 && (
          <section className="section section--white">
            <div className="container">
              <SectionHeading
                eyebrow="CE Marked Products"
                heading="Products covered under CE Marking"
                sub={`Certificate No. ${ceCert.refNo} — Issued by ${ceCert.issuer}`}
                theme="light"
              />
              <details className={styles.accordion}>
                <summary className={styles.summary}>View all {ceCert.products.length} CE marked products</summary>
                <ul className={styles.ceList}>
                  {ceCert.products.map(p => <li key={p} className={styles.ceItem}>{p}</li>)}
                </ul>
              </details>

              <div className={styles.enquiryCta}>
                <p>Need compliance documentation for procurement?</p>
                <a href="/contact" className={styles.ctaBtn}>Request Documents</a>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
