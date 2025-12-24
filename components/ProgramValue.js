import Image from 'next/image';
import styles from './ProgramValue.module.css';

export default function ProgramValue() {
  return (
    <section className={styles.programValue}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          Unlock Global Opportunities with Woolf + learnBetter
        </h2>

        <div className={styles.content}>
          <div className={styles.visual}>
            <div className={styles.visualPlaceholder}>
              <Image
                src="/img.jpg"
                alt="Global recognition illustration"
                className={styles.visualImage}
                width={840}
                height={560}
                sizes="(max-width: 768px) 100vw, 40vw"
                priority
              />
            </div>
          </div>

          <div className={styles.description}>
            <h3 className={styles.descTitle}>
              Globally Accredited Masters Degree
            </h3>
            <p className={styles.descText}>
              Our Masters in Computer Science program is globally accredited through our partnership with Woolf University, 
              giving you credentials that are recognized worldwide. This accreditation ensures that your degree holds the 
              same value as traditional university programs while offering the flexibility of online learning.
            </p>
            <p className={styles.descText}>
              Graduates from our program have successfully secured positions at top tech companies across the globe, 
              with roles in cloud architecture, AI engineering, and system design. The combination of practical skills, 
              industry mentorship, and global accreditation makes you stand out in the competitive job market.
            </p>
            <ul className={styles.benefitsList}>
              <li>✓ Recognized by employers worldwide</li>
              <li>✓ Equivalent to traditional university degrees</li>
              <li>✓ Open doors to international opportunities</li>
              <li>✓ Enhanced career mobility and growth</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
