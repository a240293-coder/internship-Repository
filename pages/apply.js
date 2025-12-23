import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useMemo, useState, useEffect } from "react";
import styles from "../styles/Apply.module.css";

const initialValues = {
  name: "",
  email: "",
  phone: "",
  experience: "",
};

export default function ApplyPage() {
  const [formValues, setFormValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const reassuranceText = useMemo(
    () => "Takes less than 2 minutes · No payment required",
    []
  );

  useEffect(() => {
    document.body.classList.add("apply-theme");
    return () => document.body.classList.remove("apply-theme");
  }, []);

  const handleBrandReload = useCallback(() => {
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  }, []);

  const metaDetails = useMemo(
    () => [
      { label: "Next cohort", value: "20 January 2026" },
      { label: "Mode", value: "Hybrid · Bengaluru + Remote" },
      { label: "Seats", value: "Limited to 120" },
    ],
    []
  );

  const highlightDetails = useMemo(
    () => [
      {
        title: "Personalized mentorship",
        description:
          "Dedicated industry mentors keep you accountable with 1:1 guidance and career planning.",
      },
      {
        title: "Interview preparation",
        description:
          "Hands-on portfolio projects, mock interviews, and ATS-ready resume support.",
      },
      {
        title: "Scholarship assistance",
        description:
          "Merit-based tuition support plus zero-cost EMI guidance from our finance desk.",
      },
    ],
    []
  );

  const statsDetails = useMemo(
    () => [
      { value: "97%", label: "Placement rate" },
      { value: "4800+", label: "Hiring partners" },
      { value: "INR 32 LPA", label: "Top package 2024" },
    ],
    []
  );

  const handleFieldChange = useCallback((field) => (event) => {
    const { value } = event.target;
    setFormValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  }, []);

  const validate = useCallback(() => {
    const nextErrors = {};

    const sanitizedName = formValues.name.trim();

    if (!sanitizedName) {
      nextErrors.name = "Please enter your full name.";
    } else if (/\d/.test(sanitizedName)) {
      nextErrors.name = "Full name cannot contain numbers.";
    } else if (sanitizedName.length < 3) {
      nextErrors.name = "Full name should be at least 3 characters.";
    } else if (sanitizedName.split(/\s+/).length < 2) {
      nextErrors.name = "Include first and last name.";
    }

    if (!formValues.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(formValues.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!formValues.phone.trim()) {
      nextErrors.phone = "Phone number is required.";
    } else if (!/^[+]?([0-9][ -]?){7,15}$/.test(formValues.phone.trim())) {
      nextErrors.phone = "Enter a valid phone number.";
    }

    if (formValues.experience && formValues.experience.length > 120) {
      nextErrors.experience = "Keep experience summary under 120 characters.";
    }

    return nextErrors;
  }, [formValues]);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      if (isSubmitting) return;

      const validationErrors = validate();
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length > 0) {
        return;
      }

      setIsSubmitting(true);
      try {
        // Placeholder async task to mimic form handling latency
        await new Promise((resolve) => setTimeout(resolve, 600));
        setIsSubmitted(true);
        setFormValues(initialValues);
      } finally {
        setIsSubmitting(false);
      }
    },
    [isSubmitting, validate]
  );

  return (
    <>
      <Head>
        <title>Apply Now | LearnBetter</title>
      </Head>
      <header className={styles.siteHeader}>
        <div className={styles.headerContent}>
          <button type="button" className={`${styles.brand} ${styles.brandButton}`} onClick={handleBrandReload} aria-label="Reload LearnBetter">
            <span className={styles.brandLogo}>
              <Image src="/favicon.jpg" alt="LearnBetter logo" width={40} height={40} priority />
            </span>
            <span className={styles.brandText}>
              <span className={styles.brandTextPrimary}>Learn</span>
              <span className={styles.brandTextAccent}>Better</span>
            </span>
          </button>
          <nav className={styles.headerNav} aria-label="Apply page navigation">
            <Link href="/" className={styles.navLink}>
              Back to homepage
            </Link>
            <Link href="/auth/signup" className={styles.navLinkPrimary}>
              Student login
            </Link>
          </nav>
        </div>
      </header>
      <main className={styles.page}>
        <section className={styles.panel}>
          <header className={styles.header}>
            <h1 className={styles.title}>MS in Computer Science Application</h1>
            <p className={styles.subtitle}>{reassuranceText}</p>
          </header>

          <div className={styles.metaSection}>
            <span className={styles.badge}>Priority admissions window</span>
            <div className={styles.metaList}>
              {metaDetails.map((item) => (
                <span key={item.label} className={styles.metaItem}>
                  <strong>{item.label}:</strong> {item.value}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.highlights}>
            {highlightDetails.map((card) => (
              <article key={card.title} className={styles.highlightCard}>
                <span className={styles.highlightTag}>Included</span>
                <h3 className={styles.highlightTitle}>{card.title}</h3>
                <p className={styles.highlightDescription}>{card.description}</p>
              </article>
            ))}
          </div>

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.fieldGroup}>
              <label htmlFor="apply-name" className={styles.label}>
                Full name
              </label>
              <input
                id="apply-name"
                name="name"
                type="text"
                value={formValues.name}
                onChange={handleFieldChange("name")}
                placeholder="E.g. Priya Sharma"
                className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
                aria-invalid={errors.name ? "true" : "false"}
                aria-describedby={errors.name ? "apply-name-error" : undefined}
                autoComplete="name"
                required
              />
              {errors.name ? (
                <p id="apply-name-error" className={styles.errorText} role="alert">
                  {errors.name}
                </p>
              ) : null}
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="apply-email" className={styles.label}>
                Email address
              </label>
              <input
                id="apply-email"
                name="email"
                type="email"
                value={formValues.email}
                onChange={handleFieldChange("email")}
                placeholder="E.g. you@example.com"
                className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby={errors.email ? "apply-email-error" : undefined}
                autoComplete="email"
                required
              />
              {errors.email ? (
                <p id="apply-email-error" className={styles.errorText} role="alert">
                  {errors.email}
                </p>
              ) : null}
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="apply-phone" className={styles.label}>
                Phone number
              </label>
              <input
                id="apply-phone"
                name="phone"
                type="tel"
                value={formValues.phone}
                onChange={handleFieldChange("phone")}
                placeholder="E.g. +91 98765 43210"
                className={`${styles.input} ${errors.phone ? styles.inputError : ""}`}
                aria-invalid={errors.phone ? "true" : "false"}
                aria-describedby={errors.phone ? "apply-phone-error" : undefined}
                autoComplete="tel"
                required
              />
              {errors.phone ? (
                <p id="apply-phone-error" className={styles.errorText} role="alert">
                  {errors.phone}
                </p>
              ) : null}
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="apply-experience" className={styles.label}>
                Experience (optional)
              </label>
              <textarea
                id="apply-experience"
                name="experience"
                value={formValues.experience}
                onChange={handleFieldChange("experience")}
                placeholder="Tell us briefly about your background"
                className={`${styles.textArea} ${errors.experience ? styles.inputError : ""}`}
                rows={3}
                aria-describedby={
                  errors.experience ? "apply-experience-error" : undefined
                }
              />
              {errors.experience ? (
                <p id="apply-experience-error" className={styles.errorText} role="alert">
                  {errors.experience}
                </p>
              ) : null}
            </div>

            <button
              type="submit"
              className={`${styles.submitBtn} ${isSubmitting ? styles.submitBtnLoading : ""}`}
              disabled={isSubmitting}
              aria-busy={isSubmitting ? "true" : "false"}
            >
              {isSubmitting ? "Submitting…" : "Submit Application"}
            </button>

            {isSubmitted && !isSubmitting ? (
              <p className={styles.successMessage} role="status">
                Thanks! Our admissions team will reach out shortly.
              </p>
            ) : null}
          </form>

          <div className={styles.statsStrip}>
            {statsDetails.map((item) => (
              <div key={item.label} className={styles.statsItem}>
                <span className={styles.statsValue}>{item.value}</span>
                <span className={styles.statsLabel}>{item.label}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer className={styles.siteFooter}>
        <div className={styles.footerInner}>
          <div className={styles.footerBranding}>
            <Link href="/" className={styles.brand}>
              <span className={styles.brandLogo}>
                <Image src="/favicon.jpg" alt="LearnBetter logo" width={40} height={40} />
              </span>
              <span className={styles.brandText}>
                <span className={styles.brandTextPrimary}>Learn</span>
                <span className={styles.brandTextAccent}>Better</span>
              </span>
            </Link>
            <p className={styles.footerCopy}>© {new Date().getFullYear()} learnBetter Labs Pvt. Ltd.</p>
          </div>
          <div className={styles.footerLinks}>
            <Link href="/project-summary" className={styles.footerLink}>
              Program brochure
            </Link>
            <Link href="mailto:admissions@learnbetter.com" className={styles.footerLink}>
              admissions@learnbetter.com
            </Link>
            <span className={styles.footerLink}>+91 80471 32187</span>
          </div>
        </div>
      </footer>
    </>
  );
}
