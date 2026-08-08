import styles from './ImageSlot.module.css';

/**
 * Reusable image slot — renders a real image when src is provided,
 * or a structured clinical placeholder when src is null.
 * Drop-in ready for facility photos, product photos, founder photos.
 *
 * @param {string|null} src          - image URL; null shows placeholder
 * @param {string}      alt          - image alt text
 * @param {'16:9'|'4:3'|'1:1'} ratio - aspect ratio of the slot
 * @param {string|null} badge        - overlay badge text (e.g. "Cleanroom Facility")
 * @param {string|null} caption      - text shown below the slot
 * @param {string}      categoryColor - accent colour for placeholder left bar
 * @param {'sm'|'md'|'lg'} rounded   - border-radius size
 * @param {string}      placeholderLabel - label shown inside placeholder
 */
export default function ImageSlot({
  src = null,
  alt = '',
  ratio = '4:3',
  badge = null,
  caption = null,
  categoryColor = 'var(--clr-brand)',
  rounded = 'lg',
  placeholderLabel = 'Photo Coming Soon',
  className = '',
}) {
  const ratioClass = {
    '16:9': styles.ratio_16_9,
    '4:3':  styles.ratio_4_3,
    '1:1':  styles.ratio_1_1,
  }[ratio] || styles.ratio_4_3;

  const roundedClass = {
    sm: styles.rounded_sm,
    md: styles.rounded_md,
    lg: styles.rounded_lg,
  }[rounded] || styles.rounded_lg;

  return (
    <figure className={[styles.figure, className].filter(Boolean).join(' ')}>
      <div className={[styles.slot, ratioClass, roundedClass].join(' ')}>
        {src ? (
          <img src={src} alt={alt} className={styles.image} loading="lazy" />
        ) : (
          <div className={styles.placeholder}>
            {/* Accent bar */}
            <div className={styles.accentBar} style={{ background: categoryColor }} />

            {/* Medical cross SVG — clinical, minimal */}
            <svg className={styles.crossIcon} viewBox="0 0 48 48" fill="none" aria-hidden="true">
              <rect x="20" y="6"  width="8" height="36" rx="2" fill="white" opacity="0.15"/>
              <rect x="6"  y="20" width="36" height="8"  rx="2" fill="white" opacity="0.15"/>
            </svg>

            {/* Label */}
            <p className={styles.placeholderLabel}>{placeholderLabel}</p>

            {/* Dev hint chip */}
            <span className={styles.devHint}>📷 Client photo pending</span>
          </div>
        )}

        {/* Badge overlay */}
        {badge && (
          <div className={styles.badge}>
            <span className={styles.badgeDot} style={{ background: categoryColor }} />
            {badge}
          </div>
        )}
      </div>

      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}
