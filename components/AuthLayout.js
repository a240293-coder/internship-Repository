import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Auth.module.css';
import TestimonialCard from './TestimonialCard';

const AuthLayout = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title ? `${title} | LearnBetter` : 'LearnBetter'}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <div className={styles.container}>
        {/* Logo group - includes logo and Home link */}
        <div className={styles.logoGroup}>
          <button
            type="button"
            className={styles.logoWrapper}
            aria-label="Reload page"
            onClick={() => {
              if (typeof window !== 'undefined') {
                try {
                  window.location.reload();
                } catch (e) {
                  // fallback: navigate to same path
                  window.location.href = window.location.href;
                }
              }
            }}
          >
            <span className={styles.logoTextMain}>Learn</span>
            <span className={styles.logoTextHighlight}>Better</span>
          </button>

          <Link href="/" aria-label="Go to Home" className={styles.homeButtonLogo}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
              <path d="M3 11.5L12 4l9 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9 21V12h6v9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        {/* Left Side - Testimonial */}
        <TestimonialCard />

        {/* Right Side - Form */}
        <div className={styles.rightSection}>
          <div className={styles.formContainer}>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
