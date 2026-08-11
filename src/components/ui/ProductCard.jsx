import Badge from './Badge';
import styles from './ProductCard.module.css';

const CATEGORY_META = {
  infusion:        { color: '#0067FF', label: 'Infusion',        icon: '💧' },
  anesthesia:      { color: '#25498F', label: 'Anesthesia',      icon: '😷' },
  urology:         { color: '#0891B2', label: 'Urology',         icon: '🔬' },
  'surgery-suction':{ color: '#0E7490', label: 'Surgery Suction', icon: '🩺' },
  'critical-care': { color: '#1A3468', label: 'Critical Care',   icon: '🫁' },
};

export default function ProductCard({ product }) {
  const { brandName, genericName, category, refNo, specs = [] } = product;
  const meta = CATEGORY_META[category] || CATEGORY_META.infusion;

  return (
    <article className={styles.card}>
      {/* Category colour band */}
      <div className={styles.band} style={{ background: meta.color }}>
        <span className={styles.bandIcon} aria-hidden="true">{meta.icon}</span>
        <Badge variant="category">{meta.label}</Badge>
      </div>

      <div className={styles.body}>
        <p className={styles.brand}>{brandName}</p>
        <p className={styles.generic}>{genericName}</p>

        {specs.length > 0 && (
          <div className={styles.specs}>
            {specs.map(s => <Badge key={s} variant="spec">{s}</Badge>)}
          </div>
        )}

        {refNo && (
          <p className={styles.ref}>Ref: <span className={styles.refCode}>{refNo}</span></p>
        )}
      </div>

      <div className={styles.hover}>
        <span>View Details →</span>
      </div>
    </article>
  );
}
