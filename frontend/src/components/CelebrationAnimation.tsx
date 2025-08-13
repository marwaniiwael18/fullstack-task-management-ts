import React, { useEffect, useState } from 'react';
import styles from '../styles/CelebrationAnimation.module.css';

interface CelebrationAnimationProps {
  isVisible: boolean;
  onComplete: () => void;
}

/**
 * Celebration Animation Component
 * 
 * Shows a beautiful celebration animation with confetti and success message
 * when a task is successfully created
 */
export const CelebrationAnimation: React.FC<CelebrationAnimationProps> = ({
  isVisible,
  onComplete
}) => {
  const [particles, setParticles] = useState<Array<{ id: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    if (isVisible) {
      // Generate random particles for confetti effect
      const newParticles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        delay: Math.random() * 0.5,
        duration: 1.5 + Math.random() * 1
      }));
      setParticles(newParticles);

      // Auto-hide after animation completes
      const timer = setTimeout(() => {
        onComplete();
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <div className={styles.celebration}>
      <div className={styles.successMessage}>
        <div className={styles.checkmark}>✅</div>
        <h3 className={styles.title}>Task Created!</h3>
        <p className={styles.subtitle}>Great job staying organized! 🎉</p>
      </div>

      {/* Confetti Particles */}
      <div className={styles.confetti}>
        {particles.map((particle) => (
          <div
            key={particle.id}
            className={styles.particle}
            style={{
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
              left: `${Math.random() * 100}%`,
              backgroundColor: ['#fbbf24', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ef4444'][
                Math.floor(Math.random() * 6)
              ]
            }}
          />
        ))}
      </div>

      {/* Sparkles */}
      <div className={styles.sparkles}>
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={i}
            className={styles.sparkle}
            style={{
              animationDelay: `${i * 0.2}s`,
              left: `${20 + (i * 10)}%`,
              top: `${30 + Math.random() * 40}%`
            }}
          >
            ✨
          </div>
        ))}
      </div>
    </div>
  );
};
