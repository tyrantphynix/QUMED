import styles from './Button.module.css';

/**
 * @param {'primary'|'outline'|'ghost'} variant
 * @param {'sm'|'md'|'lg'} size
 */
export default function Button({ children, variant = 'primary', size = 'md', as: Tag = 'button', href, onClick, className = '', ...props }) {
  const cls = [styles.btn, styles[variant], styles[size], className].filter(Boolean).join(' ');
  if (Tag === 'a' || href) {
    return <a href={href} className={cls} {...props}>{children}</a>;
  }
  return <Tag className={cls} onClick={onClick} {...props}>{children}</Tag>;
}
