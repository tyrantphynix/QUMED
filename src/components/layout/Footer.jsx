import { Link } from 'react-router-dom';
import navLinks from '../../data/nav.json';
import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        {/* Brand */}
        <div className={styles.brand}>
          <p className={styles.name}>QU-MED <span>Disposable</span></p>
          <p className={styles.tagline}>Precision. Purity. Purpose.</p>
          <p className={styles.addr}>
            Plot No. 38, Udyog Vihar, Phase VI,<br />
            Sector 37, Gurugram, Haryana 122001
          </p>
        </div>

        {/* Nav */}
        <div>
          <p className={styles.colTitle}>Navigation</p>
          <ul className={styles.linkList}>
            {navLinks.map(({ label, path }) => (
              <li key={path}><Link to={path} className={styles.footLink}>{label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className={styles.colTitle}>Contact</p>
          <ul className={styles.contactList}>
            <li><a href="tel:01244014139" className={styles.footLink}>0124-4014139</a></li>
            <li><a href="mailto:info.qumed@yahoo.in" className={styles.footLink}>info.qumed@yahoo.in</a></li>
            <li>
              <a
                href="https://qumed.in/wp-content/uploads/2024/05/QUMED_CATALOUGE.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footLink}
              >
                Download Catalogue
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p className={styles.copy}>© {year} QU-MED Disposable. All rights reserved.</p>
        <p className={styles.legal}>MSME · UDYAM-HR-05-0016518 · ISO 13485:2016 · CE Marked</p>
      </div>
    </footer>
  );
}
