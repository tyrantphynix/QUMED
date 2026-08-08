import Badge from './Badge';
import styles from './ProductCard.module.css';

const CATEGORY_META = {
  infusion:         { color: '#0067FF', label: 'Infusion',         watermark: 'INFUSION' },
  anesthesia:       { color: '#25498F', label: 'Anesthesia',       watermark: 'ANESTHESIA' },
  urology:          { color: '#0891B2', label: 'Urology',          watermark: 'UROLOGY' },
  'surgery-suction':{ color: '#0E7490', label: 'Surgery Suction',  watermark: 'SUCTION' },
  'critical-care':  { color: '#1A3468', label: 'Critical Care',    watermark: 'CRITICAL CARE' },
};

/**
 * ProductCard — image-ready design.
 * When product.productImage is provided, shows photo in 4:3 slot.
 * When null, shows a structured clinical placeholder with category watermark.
 */
export default function ProductCard({ product }) {
  const { brandName, genericName, category, refNo, specs = [], productImage } = product;
  const meta = CATEGORY_META[category] || CATEGORY_META.infusion;

  return (
    <article className={styles.card}>

      {/* ── Image slot (4:3) ── */}
      <div className={styles.imageSlot}>
        {productImage ? (
          <img
            src={productImage}
            alt={`${brandName} — ${genericName}`}
            className={styles.image}
            loading="lazy"
          />
        ) : (
          /* Structured placeholder — no emoji */
          <div className={styles.placeholder}>
            <div className={styles.accentBar} style={{ background: meta.color }} />
            {/* Medical cross */}
            <svg className={styles.crossSvg} viewBox="0 0 40 40" fill="none" aria-hidden="true">
              <rect x="17" y="5"  width="6" height="30" rx="2" fill="white" opacity="0.18"/>
              <rect x="5"  y="17" width="30" height="6"  rx="2" fill="white" opacity="0.18"/>
            </svg>
            {/* Category watermark */}
            <span className={styles.watermark}>{meta.watermark}</span>
          </div>
        )}

        {/* Category badge always visible */}
        <div className={styles.categoryBadge} style={{ borderColor: meta.color }}>
          <span className={styles.categoryDot} style={{ background: meta.color }} />
          {meta.label}
        </div>
      </div>

      {/* ── Card body ── */}
      <div className={styles.body}>
        <p className={styles.brand}>{brandName}</p>
        <p className={styles.generic}>{genericName}</p>

        {specs.length > 0 && (
          <div className={styles.specs}>
            {specs.map(s => <Badge key={s} variant="spec">{s}</Badge>)}
          </div>
        )}

        {refNo && (
          <p className={styles.ref}>
            Ref: <span className={styles.refCode}>{refNo}</span>
          </p>
        )}
      </div>

      {/* ── Hover CTA ── */}
      <div className={styles.hover}>
        <span>View Details →</span>
      </div>
    </article>
  );
}
