import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useGsapReveal } from '../hooks/useGsapReveal';
import SectionHeading from '../components/ui/SectionHeading';
import styles from './About.module.css';

export default function About() {
  const ref1 = useGsapReveal({ stagger: 0.1, y: 24 });
  const ref2 = useGsapReveal({ stagger: 0.1, y: 24 });
  const ref3 = useGsapReveal({ stagger: 0.1, y: 24 });

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className={styles.hero}>
          <div className="container">
            <p className={styles.eyebrow}>About Qu-med Disposable</p>
            <h1 className={styles.heading}>Building a healthier tomorrow,<br />one device at a time.</h1>
          </div>
        </section>

        {/* Who We Are */}
        <section className="section section--white" ref={ref1}>
          <div className={`container ${styles.twoCol}`}>
            <div className="reveal">
              <SectionHeading eyebrow="Who We Are" heading="Quality medical manufacturing since 2012" theme="light" />
              <p className={styles.body}>At Qu-med Disposable, we're committed to providing high-quality medical devices to healthcare providers and patients. Our team has years of experience in the medical device industry, and we're dedicated to utilising that experience to create products that meet the needs of our customers.</p>
              <p className={styles.body}>We manufacture a wide range of products across Infusion, Urology, Anesthesia, Surgery Suction Set, and Critical Care — all designed to meet the highest standards of quality and safety.</p>
            </div>
            <div className={`reveal ${styles.statBox}`}>
              <div className={styles.stat}><span className={styles.statNum}>Est.</span><span className={styles.statLabel}>2012</span></div>
              <div className={styles.stat}><span className={styles.statNum}>5</span><span className={styles.statLabel}>Product Categories</span></div>
              <div className={styles.stat}><span className={styles.statNum}>26+</span><span className={styles.statLabel}>SKUs Manufactured</span></div>
              <div className={styles.stat}><span className={styles.statNum}>1</span><span className={styles.statLabel}>Manufacturing Plant</span></div>
            </div>
          </div>
        </section>

        {/* Founders */}
        <section className={`section section--soft ${styles.founders}`} ref={ref2}>
          <div className="container">
            <SectionHeading eyebrow="Our Story" heading="Started small. Built for purpose." align="center" theme="light" />
            <div className={`reveal ${styles.founderCard}`}>
              <p className={styles.founderText}>
                <strong>Vijay Kumar Soni and KP Singhania</strong> started Qu-med Disposable with a small space and a handful of products. Driven by a vision to create high-quality medical devices that improve the lives of patients worldwide, they built a company now known for its commitment to quality, innovation, and customer service.
              </p>
              <p className={styles.founderText}>
                Today, Qu-med Disposable is a trusted name in the medical device industry, and our products are used by healthcare providers and patients across the globe.
              </p>
            </div>
          </div>
        </section>

        {/* Plants */}
        <section className="section section--white" ref={ref3}>
          <div className="container">
            <SectionHeading eyebrow="Manufacturing" heading="Our plant in Haryana" theme="light" />
            <div className={`reveal ${styles.singlePlantCard}`}>
              <div className={styles.singlePlantImageWrapper}>
                <img src="https://qumed.in/wp-content/uploads/2024/06/Firefly-Inpaint-20230717162755.png" alt="Gurugram Plant" className={styles.singlePlantImage} loading="lazy" />
              </div>
              <div className={styles.singlePlantContent}>
                <h3 className={styles.singlePlantCity}>Gurugram</h3>
                <p className={styles.singlePlantAddr}>Plot No. 38, Udyog Vihar, Phase VI, Sector 37,<br/>Gurugram, Haryana 122001</p>
                
                <div className={styles.singlePlantHighlights}>
                  <div className={styles.highlightItem}>
                    <span className={styles.highlightIcon}>🏭</span>
                    <span>Primary Manufacturing Facility</span>
                  </div>
                  <div className={styles.highlightItem}>
                    <span className={styles.highlightIcon}>✅</span>
                    <span>ISO 13485:2016 Certified</span>
                  </div>
                  <div className={styles.highlightItem}>
                    <span className={styles.highlightIcon}>📦</span>
                    <span>End-to-End In-House Production</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className={`section section--navy ${styles.values}`}>
          <div className="container">
            <SectionHeading eyebrow="Core Values" heading="What we stand for" align="center" theme="dark" />
            <div className={styles.valuesGrid}>
              <div className={styles.valueCard}><h3>Unmatched Quality</h3><p>Cutting-edge technology and the strictest standards in every product we ship.</p></div>
              <div className={styles.valueCard}>
                <h3>Community Responsibility</h3>
                <p>During the COVID-19 pandemic, we distributed essential medical items free of charge to those who needed them — because healthcare is a responsibility, not just a business.</p>
              </div>
              <div className={styles.valueCard}><h3>Patient Safety</h3><p>Sterile, single-use medical devices designed to protect patients and practitioners alike.</p></div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
