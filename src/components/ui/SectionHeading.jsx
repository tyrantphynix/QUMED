import styles from './SectionHeading.module.css';

/**
 * @param {string} eyebrow  - small label above the heading
 * @param {string} heading  - main H2/H3 text
 * @param {string} sub      - optional subtext below heading
 * @param {'left'|'center'} align
 * @param {'light'|'dark'} theme  - 'dark' on colored sections
 */
export default function SectionHeading({ eyebrow, heading, sub, align = 'left', theme = 'light' }) {
  return (
    <div className={[styles.wrap, styles[align], styles[theme]].join(' ')}>
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      <h2 className={styles.heading}>{heading}</h2>
      {sub && <p className={styles.sub}>{sub}</p>}
    </div>
  );
}
