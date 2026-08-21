import Badge from './Badge';
import styles from './ProductCard.module.css';

const CATEGORY_META = {
  infusion:        { color: '#0067FF', label: 'Infusion' },
  anesthesia:      { color: '#25498F', label: 'Anesthesia' },
  urology:         { color: '#0891B2', label: 'Urology' },
  'surgery-suction':{ color: '#0E7490', label: 'Surgery Suction' },
  'critical-care': { color: '#1A3468', label: 'Critical Care' },
};

const CategoryIcon = ({ category }) => {
  const props = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#D0DEF5",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: styles.catSvg
  };
  switch (category) {
    case 'infusion':
      return (
        <svg {...props}>
          <path d="M8 4h8v8a4 4 0 0 1-8 0V4z" />
          <path d="M12 2v2M12 12v10M10 22h4" />
        </svg>
      );
    case 'anesthesia':
      return (
        <svg {...props}>
          <path d="M10 4c-3 0-5 3-5 7a7 7 0 0 0 14 0c0-4-2-7-5-7" />
          <path d="M5 11l-3 3M19 11l3 3M12 4v-2M10 2h4" />
        </svg>
      );
    case 'urology':
      return (
        <svg {...props}>
          <rect x="6" y="6" width="12" height="14" rx="2" />
          <path d="M12 6V2M10 2h4M12 20v2" />
        </svg>
      );
    case 'surgery-suction':
      return (
        <svg {...props}>
          <path d="M4 22C4 12 10 12 10 2v10c0 10-6 10-6 20z" />
          <path d="M8 2h4M9 2v4" />
        </svg>
      );
    case 'critical-care':
      return (
        <svg {...props}>
          <path d="M12 2v8M12 10l-6 6v6M12 10l6 6v6" />
          <path d="M10 2h4M4 22h4M16 22h4" />
        </svg>
      );
    default:
      return (
        <svg {...props}>
          <rect x="4" y="4" width="16" height="16" rx="2" />
        </svg>
      );
  }
};

export default function ProductCard({ product }) {
  const { brandName, genericName, category, refNo, imageUrl, specs = [], ceMarked, isSterile, isSingleUse } = product;
  const meta = CATEGORY_META[category] || CATEGORY_META.infusion;

  return (
    <article className={styles.card}>
      {/* Image slot */}
      <div className={styles.imageSlot} style={{ borderLeftColor: meta.color }}>
        {imageUrl ? (
          <img src={imageUrl} alt={brandName} className={styles.image} loading="lazy" />
        ) : (
          <CategoryIcon category={category} />
        )}
      </div>

      <div className={styles.body}>
        {/* Header row */}
        <div className={styles.headerRow}>
          <Badge variant="category">{meta.label}</Badge>
          {ceMarked && <span className={styles.ceBadge}>CE</span>}
        </div>

        {/* Brand & Generic */}
        <p className={styles.brand}>{brandName}</p>
        <p className={styles.generic}>{genericName}</p>

        {/* Specs row */}
        {specs.length > 0 && (
          <div className={styles.specs}>
            {specs.slice(0, 2).map(s => <Badge key={s} variant="spec">{s}</Badge>)}
          </div>
        )}
      </div>

      {/* Footer trust line */}
      <div className={styles.footer}>
        <div className={styles.trustGroup}>
          <span className={styles.trustDot} aria-hidden="true" />
          <span className={styles.trustText}>
            {isSterile ? 'Sterile' : 'Non-Sterile'} &middot; {isSingleUse ? 'Single Use' : 'Reusable'}
          </span>
        </div>
        {refNo && (
          <div className={styles.refCode}>{refNo}</div>
        )}
      </div>
    </article>
  );
}
