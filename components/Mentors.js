import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './Mentors.module.css';

export default function Mentors() {
  const [isMobile, setIsMobile] = useState(false);
  const carouselRef = useRef(null);
  const intervalRef = useRef(null);
  const resumeTimeoutRef = useRef(null);
  const directionRef = useRef(1); // 1 = forward, -1 = backward
  const indexRef = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const updateIsMobile = () => {
      setIsMobile(typeof window !== 'undefined' && window.innerWidth <= 768);
    };

    updateIsMobile();
    window.addEventListener('resize', updateIsMobile);

    return () => {
      window.removeEventListener('resize', updateIsMobile);
    };
  }, []);

  const tick = useCallback(() => {
    if (!isMobile) return;
    const container = carouselRef.current;
    if (!container) return;

    const mentorsCount = 3; // total mentor cards
    const nextIndex = (indexRef.current + 1) % mentorsCount;
    setCurrentIndex(nextIndex);
    indexRef.current = nextIndex;
  }, [isMobile]);

  const startAutoScroll = useCallback(() => {
    clearInterval(intervalRef.current);
    if (!isMobile) return;
    intervalRef.current = setInterval(tick, 5000);
  }, [isMobile, tick]);

  useEffect(() => {
    startAutoScroll();

    return () => {
      clearInterval(intervalRef.current);
      clearTimeout(resumeTimeoutRef.current);
    };
  }, [startAutoScroll]);

  const pauseAndResume = useCallback(() => {
    if (!isMobile) return;
    clearInterval(intervalRef.current);
    clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      startAutoScroll();
    }, 4000);
  }, [isMobile, startAutoScroll]);

  const mentors = [
    {
      name: 'Dr. Rajesh Kumar',
      role: 'Cloud Architect',
      company: 'Google',
      bio: '15+ years in cloud computing, Former AWS Solutions Architect',
      image: '👨‍💼',
    },
    {
      name: 'Sarah Williams',
      role: 'AI/ML Lead',
      company: 'Microsoft',
      bio: 'PhD in AI, Published researcher with 50+ papers',
      image: '👩‍💼',
    },
    {
      name: 'Michael Chen',
      role: 'System Design Expert',
      company: 'Amazon',
      bio: 'Built large-scale systems handling 100M+ users',
      image: '👨‍🏫',
    },
  ];

  return (
    <section className={styles.mentors} id="mentors">
      <div className={styles.container}>
        <h2 className={styles.title}>
          Learn from Industry <span className={styles.titleHighlight}>Experts</span>
        </h2>
        <p className={styles.subtitle}>
          Get mentored by professionals from top tech companies
        </p>

        <div
          className={styles.grid}
          ref={carouselRef}
          onTouchStart={pauseAndResume}
          onTouchMove={pauseAndResume}
          onMouseDown={pauseAndResume}
        >
          {mentors.map((mentor, index) => (
            <div
              key={index}
              className={styles.mentorCard}
              style={
                isMobile
                  ? {
                      transform: `translateX(${(index - currentIndex) * 100}%)`,
                      transition: 'transform 0.45s ease-in-out',
                    }
                  : undefined
              }
            >
              <div className={styles.mentorImage}>{mentor.image}</div>
              <h3 className={styles.mentorName}>{mentor.name}</h3>
              <p className={styles.mentorRole}>{mentor.role}</p>
              <p className={styles.mentorCompany}>{mentor.company}</p>
              <p className={styles.mentorBio}>{mentor.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
