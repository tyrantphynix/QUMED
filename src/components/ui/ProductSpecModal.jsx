import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import styles from './ProductSpecModal.module.css';

const CATALOGUE_URL = 'https://qumed.in/wp-content/uploads/2024/05/QUMED_CATALOUGE.pdf';

const CATEGORY_META = {
  infusion:        { label: 'Infusion' },
  anesthesia:      { label: 'Anesthesia' },
  urology:         { label: 'Urology' },
  'surgery-suction':{ label: 'Surgery Suction' },
  'critical-care': { label: 'Critical Care' },
};

export default function ProductSpecModal({ product, onClose }) {
  if (!product) return null;

  const { brandName, genericName, category, imageUrl, images, specTable, ceMarked, isSterile, isSingleUse } = product;
  const imageList = images && images.length > 0 ? images : (imageUrl ? [imageUrl] : []);
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);

  // Close on Escape & freeze body scroll
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [onClose]);

  const activeImage = imageList[selectedImgIndex] || imageUrl;
  const meta = CATEGORY_META[category] || { label: 'Medical Device' };

  const modalContent = (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.modalHeader}>
          <div className={styles.headerLeft}>
            <span className={styles.categoryPill}>{meta.label}</span>
            {ceMarked && <span className={styles.cePill}>CE Certified</span>}
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
            &times;
          </button>
        </div>

        {/* Content Body */}
        <div className={styles.modalBody}>
          {/* Left Column: Media & Highlights */}
          <div className={styles.visualColumn}>
            <div className={styles.visualMedia}>
              <div className={styles.mainImageWrapper}>
              {activeImage ? (
                <img src={activeImage} alt={brandName} className={styles.mainImage} />
              ) : (
                <div style={{ color: '#94A3B8', fontSize: '0.9rem' }}>No image preview</div>
              )}
              <img src="/gem-logo.png" alt="GeM Approved" className={styles.gemBadge} />
            </div>

            {/* Thumbnail Gallery (for multi-image products like Yankaur & QU-TUBI) */}
            {imageList.length > 1 && (
              <div className={styles.thumbStrip}>
                {imageList.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={[styles.thumbBtn, selectedImgIndex === idx ? styles.thumbActive : ''].join(' ')}
                    onClick={() => setSelectedImgIndex(idx)}
                    title={`View angle ${idx + 1}`}
                  >
                    <img src={img} alt={`${brandName} angle ${idx + 1}`} className={styles.thumbImg} />
                  </button>
                ))}
              </div>
            )}
            </div>

            <div className={styles.visualMeta}>
              {/* Trust Badges */}
              <div className={styles.trustPills}>
              <span className={styles.trustPill}>
                <span className={styles.greenDot} />
                {isSterile ? 'Sterile' : 'Non-Sterile'}
              </span>
              <span className={styles.trustPill}>
                <span className={styles.blueDot} />
                {isSingleUse ? 'Single Patient Use' : 'Reusable'}
              </span>
              <span className={styles.trustPill}>
                🏭 ISO 13485:2016
              </span>
            </div>

            {/* Quick Actions */}
            <div className={styles.actionCta}>
              <Link 
                to={`/contact?product=${encodeURIComponent(brandName)}`} 
                className={styles.inquireBtn}
                onClick={onClose}
              >
                Inquire For Bulk Supply
              </Link>
              <a 
                href={CATALOGUE_URL} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.catalogueLink}
              >
                Download PDF Catalogue
              </a>
            </div>
            </div>
          </div>

          {/* Right Column: Titles & Technical Specs */}
          <div className={styles.detailsColumn}>
            <div className={styles.titleArea}>
              <h2 id="modal-title" className={styles.brandTitle}>{brandName}</h2>
              <p className={styles.genericTitle}>{genericName}</p>
            </div>

            <div className={styles.specsSectionTitle}>
              <div className={styles.specsTitleLeft}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0067FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
                <span>Technical Specifications</span>
              </div>
              <span className={styles.mobileScrollHint}>Swipe table &rarr;</span>
            </div>

            {/* Spec Table */}
            {specTable && specTable.headers && specTable.rows ? (
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      {specTable.headers.map((h, i) => (
                        <th key={i}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {specTable.rows.map((row, rIdx) => (
                      <tr key={rIdx}>
                        {row.map((cell, cIdx) => (
                          <td key={cIdx}>
                            {cIdx === 0 && row.length > 2 ? (
                              <strong style={{ color: '#0F172A' }}>{cell}</strong>
                            ) : (
                              cell
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className={styles.noSpecsText} style={{ color: '#64748B', fontSize: '0.9rem' }}>Detailed specifications available in the product catalogue.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
