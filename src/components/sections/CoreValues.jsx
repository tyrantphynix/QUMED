import { useGsapReveal } from '../../hooks/useGsapReveal';
import SectionHeading from '../ui/SectionHeading';
import styles from './CoreValues.module.css';

const VALUES = [
  {
    icon: '🛡',
    title: 'Unmatched Quality',
    body: 'We utilise cutting-edge technologies and adhere to the strictest standards to ensure the safety and efficacy of every product we manufacture.',
  },
  {
    icon: '🔬',
    title: 'Patient Safety First',
    body: 'Every QU-MED product is designed as a sterile, single-use device — minimising risk of infection and ensuring accuracy in clinical procedures.',
  },
  {
    icon: '❤',
    title: 'Community Responsibility',
    body: 'During the COVID-19 pandemic, we distributed essential medical items free of charge to those who needed them — demonstrating our commitment to giving back when it matters most.',
  },
];

export default function CoreValues() {
  const ref = useGsapReveal({ stagger: 0.12, y: 28 });
  return (
    <section className="section section--white" ref={ref} aria-labelledby="values-heading">
      <div className="container">
        <SectionHeading
          eyebrow="Our Values"
          heading="What drives every decision we make"
          align="center"
          theme="light"
        />
        <div className={styles.grid}>
          {VALUES.map(({ icon, title, body }) => (
            <div key={title} className={`reveal ${styles.card}`}>
              <div className={styles.iconWrap}>{icon}</div>
              <h3 className={styles.title}>{title}</h3>
              <p className={styles.body}>{body}</p>
              <div className={styles.accent} aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
