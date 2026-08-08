import { Factory, ArrowsClockwise, Certificate } from '@phosphor-icons/react';
import { useGsapReveal } from '../../hooks/useGsapReveal';
import SectionHeading from '../ui/SectionHeading';
import ImageSlot from '../ui/ImageSlot';
import styles from './ManufacturingSection.module.css';

const PILLARS = [
  {
    Icon: Factory,
    title: 'Cleanroom Manufacturing',
    body: 'Our facilities maintain controlled sterile environments essential for medical device production, ensuring every product is free from contamination.',
  },
  {
    Icon: ArrowsClockwise,
    title: 'In-House End-to-End Production',
    body: 'From raw materials to sterile final packaging — all manufacturing is performed in-house across our Gurugram and Bawal plants.',
  },
  {
    Icon: Certificate,
    title: 'ISO 13485:2016 Quality Assurance',
    body: 'Every stage of production is governed by our certified Medical Device Quality Management System, ensuring consistent safety and efficacy.',
  },
];

/**
 * Client image integration:
 * - Replace primarySrc with "/images/facility/gurugram-plant.webp"
 * - Replace secondarySrc with "/images/facility/cleanroom.webp"
 * Place images in /public/images/facility/
 */
const primarySrc  = null; // → "/images/facility/gurugram-plant.webp"
const secondarySrc= null; // → "/images/facility/cleanroom.webp"

export default function ManufacturingSection() {
  const ref = useGsapReveal({ stagger: 0.1, y: 24 });

  return (
    <section className="section section--soft" ref={ref} aria-labelledby="mfg-heading">
      <div className={`container ${styles.grid}`}>

        {/* ── LEFT: Text + pillars ── */}
        <div className={styles.textCol}>
          <SectionHeading
            eyebrow="Our Manufacturing"
            heading="State-of-the-art plants in Haryana"
            theme="light"
          />
          <p className={styles.body}>
            At QU-MED Disposable, our manufacturing plant in Gurugram, Haryana, is a hub of
            innovation. Renowned for the diversity of our product range, our highly skilled team
            utilises cutting-edge technology to produce a comprehensive line of medical disposables.
          </p>
          <p className={styles.body}>
            Our second facility in Bawal extends our production capacity, enabling us to serve
            the growing needs of healthcare professionals with consistency and speed.
          </p>

          <div className={styles.pillars}>
            {PILLARS.map(({ Icon, title, body }) => (
              <div key={title} className={`reveal ${styles.pillar}`}>
                <div className={styles.pillarIconWrap}>
                  <Icon size={22} weight="duotone" color="var(--clr-action)" />
                </div>
                <div>
                  <p className={styles.pillarTitle}>{title}</p>
                  <p className={styles.pillarBody}>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Stacked facility image slots ── */}
        <div className={`reveal ${styles.imageCol}`}>
          {/* Primary — main facility photo */}
          <ImageSlot
            src={primarySrc}
            alt="QU-MED Disposable manufacturing plant, Gurugram"
            ratio="4:3"
            badge="Gurugram Plant"
            caption="Udyog Vihar, Phase VI, Sector 37, Gurugram 122001"
            placeholderLabel="Primary Facility Photo"
            rounded="lg"
            className={styles.primarySlot}
          />

          {/* Secondary — smaller cleanroom photo, offset overlap */}
          <div className={styles.secondaryWrap}>
            <ImageSlot
              src={secondarySrc}
              alt="Cleanroom manufacturing environment"
              ratio="1:1"
              badge="Cleanroom"
              placeholderLabel="Cleanroom Photo"
              rounded="md"
              className={styles.secondarySlot}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
