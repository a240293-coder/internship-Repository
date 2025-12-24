import Link from 'next/link';
import styles from '../../styles/Auth.module.css';
import AuthLayout from '../../components/AuthLayout';

export default function SignUp() {
  const title = "Welcome to LearnBetter ✨";
  const subtitle = "Sign up today to kickstart your learning and land your dream job!";

  return (
    <AuthLayout title="Sign Up">
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.subtitle}>{subtitle}</p>

      <div className={styles.fadeDown}>
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
        <button className={styles.primaryButton}>
          Sign Up
        </button>
      </div>

      {/* Bottom Toggle Text */}
      <div className={styles.bottomText}>
        <span><strong>Already have an account?</strong></span>
        <Link 
          href="/auth/signin"
          className={styles.outlineButton}
        >
          Sign In
        </Link>
      </div>
    </AuthLayout>
  );
}
