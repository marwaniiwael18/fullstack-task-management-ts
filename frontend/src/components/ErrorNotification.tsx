import React from 'react';
import { useTaskStore } from '../store/taskStore';
import styles from '../styles/ErrorNotification.module.css';

/**
 * ErrorNotification Component
 * Displays error messages from the global state
 * Provides user-friendly error feedback with dismiss functionality
 */

export const ErrorNotification: React.FC = () => {
  const { error, clearError } = useTaskStore();

  // Don't render if no error
  if (!error) {
    return null;
  }

  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorContent}>
        <span className={styles.errorIcon}>⚠️</span>
        <span className={styles.errorMessage}>{error}</span>
        <button
          onClick={clearError}
          className={styles.dismissButton}
          title="Dismiss error"
        >
          ✕
        </button>
      </div>
    </div>
  );
};
