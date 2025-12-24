import Link from 'next/link';
import styles from '../styles/Auth.module.css';
import AuthLayout from './AuthLayout';

export default function SignInLayout({ heading, subtext, emailBtnText }) {
  return (
    <AuthLayout title="Sign In">
      <h1 className={styles.title}>{heading}</h1>
      <p className={styles.subtitle}>{subtext}</p>

      <div className={styles.inputGroup}>
        <input 
          type="email" 
          placeholder="Email Address" 
          className={styles.input} 
        />
      </div>

      <div className={styles.inputGroup}>
        <input 
          type="password" 
          placeholder="Password" 
          className={styles.input} 
        />
      </div>

      <Link href="#" className={styles.forgotPassword}>
        Forgot Password?
      </Link>

      <button className={styles.primaryButton}>
        {emailBtnText}
      </button>

      <p className={styles.termsText}>
        By signing in, I accept AlmaBetter's{' '}
        <a href="#" className={styles.termsLink}>Terms of Services</a>{' '}and acknowledge the{' '}
        <a href="#" className={styles.termsLink}>Privacy Policy</a>.
      </p>

      <div className={styles.bottomText}>
        <span>Don&#39;t have an account?</span>
        <Link href="/auth/signup" className={styles.outlineButton}>
          Sign Up
        </Link>
      </div>
    </AuthLayout>
  );
}
