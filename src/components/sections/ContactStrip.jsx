import { useRef } from 'react';
import { useGsapReveal } from '../../hooks/useGsapReveal';
import styles from './ContactStrip.module.css';

const USE_MAP_EMBED = import.meta.env.VITE_USE_MAP_EMBED === 'true';
const MAPS_URL = 'https://maps.google.com/?q=Qu-med+Disposable,+Sector+37,+Gurugram,+Haryana';

function ContactForm() {
  const endpoint = import.meta.env.VITE_FORM_ENDPOINT;
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const payload = Object.fromEntries(data);
    if (accessKey) payload.access_key = accessKey;
    try {
      await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      e.target.reset();
      alert('Message sent! We will get back to you shortly.');
    } catch {
      alert('Something went wrong. Please email us at info.qumed@yahoo.in');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="name" className={styles.label}>Your Name</label>
          <input id="name" name="name" type="text" required placeholder="Full name" className={styles.input} />
        </div>
        <div className={styles.field}>
          <label htmlFor="email" className={styles.label}>Email Address</label>
          <input id="email" name="email" type="email" required placeholder="you@example.com" className={styles.input} />
        </div>
      </div>
      <div className={styles.field}>
        <label htmlFor="message" className={styles.label}>Message</label>
        <textarea id="message" name="message" required placeholder="How can we help?" rows={5} className={styles.input} />
      </div>
      <button type="submit" className={styles.submit}>Send Message</button>
    </form>
  );
}

export default function ContactStrip() {
  const ref = useGsapReveal({ stagger: 0.1, y: 24 });
  return (
    <section className={`section section--navy ${styles.section}`} ref={ref} aria-labelledby="contact-heading">
      <div className={`container ${styles.grid}`}>
        {/* Left: form */}
        <div className="reveal">
          <p className={styles.eyebrow}>Contact Us</p>
          <h2 id="contact-heading" className={styles.heading}>We're ready. Let's talk.</h2>
          <p className={styles.sub}>Reach out for product enquiries, bulk orders, or catalogue requests.</p>
          <ContactForm />
        </div>

        {/* Right: info + map */}
        <div className={`reveal ${styles.infoCol}`}>
          <div className={styles.contactInfo}>
            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>📍</span>
              <div>
                <p className={styles.infoLabel}>Address</p>
                <p className={styles.infoText}>Plot No. 38, Udyog Vihar, Phase VI,<br />Sector 37, Gurugram, Haryana 122001</p>
              </div>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>📞</span>
              <div>
                <p className={styles.infoLabel}>Phone</p>
                <a href="tel:01244014139" className={styles.infoLink}>0124-4014139</a>
              </div>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>✉</span>
              <div>
                <p className={styles.infoLabel}>Email</p>
                <a href="mailto:info.qumed@yahoo.in" className={styles.infoLink}>info.qumed@yahoo.in</a>
              </div>
            </div>
          </div>

          {/* Map block */}
          <div className={styles.mapBlock}>
            {USE_MAP_EMBED ? (
              <iframe
                title="QU-MED Disposable location"
                src="https://maps.google.com/maps?q=Qu-med+Disposable,+Sector+37,+Gurugram&output=embed"
                width="100%" height="220"
                style={{ border: 0, borderRadius: 'var(--radius-md)' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className={styles.mapLink}>
                <div className={styles.mapStatic}>
                  <span className={styles.mapPin}>📍</span>
                  <span className={styles.mapText}>View on Google Maps →</span>
                  <span className={styles.mapAddr}>Gurugram, Haryana</span>
                </div>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
