import Badge from './Badge';
import styles from './CertCard.module.css';

const STATUS_ICONS = { active: '✓', pending: '↻', expired: '⚠' };
const TYPE_ICONS   = { International: '🌐', National: '🇮🇳', State: '🏛' };

export default function CertCard({ cert }) {
  const { name, type, issuer, directive, refNo, issued, expiry, status } = cert;
  const hideExpiry = import.meta.env.VITE_HIDE_EXPIRED_CERTS === 'true';
  if (hideExpiry && status === 'expired') return null;

  const issuedYear = issued ? new Date(issued).getFullYear() : null;
  const expiryFmt  = expiry
    ? new Date(expiry).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
    : null;

  return (
    <article className={styles.card}>
      <div className={styles.top}>
        <span className={styles.typeIcon} title={type}>{TYPE_ICONS[type] || '📋'}</span>
        <Badge variant={status}>
          {STATUS_ICONS[status]} {status === 'active' ? 'Active' : status === 'pending' ? 'Renewal in Progress' : 'Expired'}
        </Badge>
      </div>

      <h3 className={styles.name}>{name}</h3>
      <p  className={styles.issuer}>{issuer}</p>
      <p  className={styles.directive}>{directive}</p>

      <div className={styles.meta}>
        {refNo && <span className={styles.ref}>{refNo}</span>}
        {issuedYear && <span className={styles.year}>Issued {issuedYear}</span>}
        {expiryFmt && status !== 'expired' && <span className={styles.expiry}>Valid to {expiryFmt}</span>}
      </div>
    </article>
  );
}
