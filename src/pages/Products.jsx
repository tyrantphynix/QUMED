import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useGsapReveal } from '../hooks/useGsapReveal';
import { useProductFilter } from '../hooks/useProductFilter';
import products from '../data/products.json';

import ProductCard from '../components/ui/ProductCard';
import styles from './Products.module.css';

const CATALOGUE_URL = 'https://qumed.in/wp-content/uploads/2024/05/QUMED_CATALOUGE.pdf';

const CATEGORY_DESCRIPTIONS = {
  all:             "Our complete range of medical disposables across all specialities.",
  infusion:        "Infusion medical equipment refers to a category of medical devices used to deliver fluids, such as medications or nutrients, into a patient's body in a controlled and precise manner. There are various types of infusion equipment, each designed for a specific purpose and delivery method.",
  anesthesia:      "Interdum exercitation penatibus, praesentium facilisi accusamus fermentum, sagittis.",
  urology:         "Urology is the field of medicine that focuses on the urinary tract (kidneys, ureters, bladder, and urethra) and the male reproductive system (prostate, testes, and epididymis). Urologists use a variety of medical equipment to diagnose and treat urologic conditions.",
  "surgery-suction": "A surgical suction set is a medical device used to remove fluids, blood, and other debris from a surgical site during an operation. It helps maintain a clear operating field and allows the surgeon to have a better view of the surgical area.",
  "critical-care": "Critical care medical equipment is used to diagnose, treat, and monitor patients who are critically ill and require intensive care. This type of equipment is found in intensive care units (ICUs) and other critical care settings.",
};

export default function Products() {
  const { active, setActive, filtered, categories } = useProductFilter();
  const gridRef = useGsapReveal({ stagger: 0.06, y: 20, start: 'top 85%' }, [active]);

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
