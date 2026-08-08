import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { List, X } from '@phosphor-icons/react';
import { gsap } from '../../utils/gsap.config';
import navLinks from '../../data/nav.json';
import styles from './Navbar.module.css';

export default function Navbar() {
  const navRef  = useRef(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // GSAP shrink on scroll
  useEffect(() => {
    gsap.to(navRef.current, {
      paddingTop:    scrolled ? '10px' : '20px',
      paddingBottom: scrolled ? '10px' : '20px',
      duration: 0.3,
      ease: 'power2.out',
    });
  }, [scrolled]);

  return (
    <header ref={navRef} className={[styles.nav, scrolled ? styles.scrolled : ''].join(' ')}>
      <div className={`container ${styles.inner}`}>
        {/* Logo */}
        <Link to="/" className={styles.logo} aria-label="QU-MED Disposable — Home">
          <span className={styles.logoText}>QU-MED</span>
          <span className={styles.logoDivider} aria-hidden="true">|</span>
          <span className={styles.logoSub}>Disposable</span>
        </Link>

        {/* Desktop nav */}
        <nav className={styles.links} aria-label="Main navigation">
          {navLinks.map(({ label, path }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) => [styles.link, isActive ? styles.active : ''].join(' ')}
              end={path === '/'}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop CTA */}
        <a
          href="https://qumed.in/wp-content/uploads/2024/05/QUMED_CATALOUGE.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.cta}
        >
          Download Catalogue
        </a>

        {/* Hamburger */}
        <button
          className={styles.hamburger}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen(o => !o)}
        >
          {open ? <X size={24} weight="bold" /> : <List size={24} weight="bold" />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={[styles.drawer, open ? styles.drawerOpen : ''].join(' ')} aria-hidden={!open}>
        <nav className={styles.drawerLinks} aria-label="Mobile navigation">
          {navLinks.map(({ label, path }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) => [styles.drawerLink, isActive ? styles.active : ''].join(' ')}
              onClick={() => setOpen(false)}
              end={path === '/'}
            >
              {label}
            </NavLink>
          ))}
          <a
            href="https://qumed.in/wp-content/uploads/2024/05/QUMED_CATALOUGE.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.drawerCta}
            onClick={() => setOpen(false)}
          >
            Download Catalogue
          </a>
        </nav>
      </div>
    </header>
  );
}
