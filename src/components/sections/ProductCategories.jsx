import { Link } from 'react-router-dom';
import { useGsapReveal } from '../../hooks/useGsapReveal';
import { useProductFilter } from '../../hooks/useProductFilter';
import products from '../../data/products.json';
import SectionHeading from '../ui/SectionHeading';
import ProductCard from '../ui/ProductCard';
import styles from './ProductCategories.module.css';

const CATALOGUE_URL = 'https://qumed.in/wp-content/uploads/2024/05/QUMED_CATALOUGE.pdf';

export default function ProductCategories() {
  const { active, setActive, filtered, categories } = useProductFilter();
  const gridRef = useGsapReveal({ stagger: 0.07, y: 24, start: 'top 80%' });

  // Smart slice: 6 for 'all', 3 for specific category to avoid duplicates
  const displayed = active === 'all' ? filtered.slice(0, 6) : filtered.slice(0, 3);

  // Helper for variant counts
  const getCountLabel = (catId) => {
    const count = catId === 'all' ? products.length : products.filter(p => p.category === catId).length;
    if (catId === 'all') return `(${count})`;
    if (['surgery-suction', 'critical-care', 'urology'].includes(catId)) return `(${count} variants)`;
    return `(${count})`;
  };

  return (
    <section className="section section--white" aria-labelledby="products-heading">
      <div className="container">
        <div className={styles.header}>
          <SectionHeading
            eyebrow="Our Products"
            heading="Clinical-grade disposables for every care setting"
            sub="Manufactured in-house at our ISO 13485:2016 certified plant in Gurugram. Five categories · 26 product SKUs."
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
              onClick={() => {
                setActive(cat.id);
                // Scroll tab into view on narrow screens
                const target = document.getElementById(`tab-${cat.id}`);
                if (target && window.innerWidth < 600) {
                  target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                }
              }}
              id={`tab-${cat.id}`}
            >
              {cat.label} <span className={styles.tabCount}>{getCountLabel(cat.id)}</span>
            </button>
          ))}
        </div>

        {/* Grid */}
        <div ref={gridRef} className={styles.grid} key={active}>
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
