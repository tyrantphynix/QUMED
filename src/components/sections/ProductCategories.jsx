import { Link } from 'react-router-dom';
import { useGsapReveal } from '../../hooks/useGsapReveal';
import { useProductFilter } from '../../hooks/useProductFilter';
import SectionHeading from '../ui/SectionHeading';
import ProductCard from '../ui/ProductCard';
import styles from './ProductCategories.module.css';

const CATALOGUE_URL = 'https://qumed.in/wp-content/uploads/2024/05/QUMED_CATALOUGE.pdf';

export default function ProductCategories() {
  const { active, setActive, filtered, categories } = useProductFilter();
  const gridRef = useGsapReveal({ stagger: 0.07, y: 24, start: 'top 80%' });

  // Show max 6 on homepage
  const displayed = filtered.slice(0, 6);

  return (
    <section className="section section--white" aria-labelledby="products-heading">
      <div className="container">
        <div className={styles.header}>
          <SectionHeading
            eyebrow="Our Products"
            heading="Comprehensive medical disposables"
            sub="Five specialised categories covering the full spectrum of hospital and clinical needs."
            theme="light"
          />
          <Link to="/products" className={styles.viewAll}>View All Products →</Link>
        </div>

        {/* Category tabs */}
        <div className={styles.tabs} role="tablist" aria-label="Product categories">
          {categories.map(cat => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={active === cat.id}
              className={[styles.tab, active === cat.id ? styles.tabActive : ''].join(' ')}
              onClick={() => setActive(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div ref={gridRef} className={styles.grid}>
          {displayed.map(p => (
            <div key={p.id} className="reveal">
              <ProductCard product={p} />
            </div>
          ))}
        </div>

        {/* Catalogue CTA */}
        <div className={styles.catalogueCta}>
          <a href={CATALOGUE_URL} target="_blank" rel="noopener noreferrer" className={styles.ctaBtn}>
            Download Full Catalogue (PDF)
          </a>
        </div>
      </div>
    </section>
  );
}
