import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useGsapReveal } from '../hooks/useGsapReveal';
import { useProductFilter } from '../hooks/useProductFilter';
import products from '../data/products.json';
import SectionHeading from '../components/ui/SectionHeading';
import ProductCard from '../components/ui/ProductCard';
import styles from './Products.module.css';

const CATALOGUE_URL = 'https://qumed.in/wp-content/uploads/2024/05/QUMED_CATALOUGE.pdf';

const CATEGORY_DESCRIPTIONS = {
  all:             'Our complete range of medical disposables across all specialities.',
  infusion:        'Sterile, single-use infusion devices for precise intravenous fluid and medication delivery.',
  anesthesia:      'A comprehensive range of respiratory and anesthetic accessories for patient safety and comfort during procedures.',
  urology:         'Sterile urology collection devices for accurate urinary monitoring and management.',
  'surgery-suction': 'Surgical suction sets designed for clear operative fields during procedures.',
  'critical-care': 'Ventilator circuits and critical care accessories for ICU and intensive monitoring environments.',
};

export default function Products() {
  const { active, setActive, filtered, categories } = useProductFilter();
  const gridRef = useGsapReveal({ stagger: 0.06, y: 20, start: 'top 85%' });

  // Helper for variant counts
  const getCountLabel = (catId) => {
    const count = catId === 'all' ? products.length : products.filter(p => p.category === catId).length;
    if (catId === 'all') return `(${count})`;
    if (['surgery-suction', 'critical-care', 'urology'].includes(catId)) return `(${count} variants)`;
    return `(${count})`;
  };

  return (
    <>
      <Navbar />
      <main>
        {/* Page hero */}
        <section className={styles.pageHero}>
          <div className="container">
            <p className={styles.eyebrow}>Our Products</p>
            <h1 className={styles.heading}>Medical Disposables for Every Clinical Need</h1>
            <p className={styles.sub}>26 product SKUs across 5 specialised categories — all manufactured in-house in Gurugram, Haryana.</p>
          </div>
        </section>

        <section className="section section--white">
          <div className="container">
            {/* Tabs */}
            <div className={styles.tabs} role="tablist">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={active === cat.id}
                  className={[styles.tab, active === cat.id ? styles.tabActive : ''].join(' ')}
                  onClick={() => {
                    setActive(cat.id);
                    const target = document.getElementById(`prod-tab-${cat.id}`);
                    if (target && window.innerWidth < 600) {
                      target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                    }
                  }}
                  id={`prod-tab-${cat.id}`}
                >
                  {cat.label}
                  <span className={styles.count}>{getCountLabel(cat.id)}</span>
                </button>
              ))}
            </div>

            <p className={styles.catDesc}>{CATEGORY_DESCRIPTIONS[active]}</p>

            <div ref={gridRef} className={styles.grid} key={active}>
              {filtered.map(p => (
                <div key={p.id} className="reveal">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>

            <div className={styles.cta}>
              <a href={CATALOGUE_URL} target="_blank" rel="noopener noreferrer" className={styles.ctaBtn}>
                Download Full Catalogue (PDF)
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
