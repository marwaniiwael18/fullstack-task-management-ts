import React, { Component, ErrorInfo, ReactNode } from 'react';
import styles from '../styles/ErrorBoundary.module.css';

/**
 * ErrorBoundary Component
 * Catches JavaScript errors anywhere in the child component tree
 * Provides a fallback UI instead of crashing the entire application
 */

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  /**
   * Static method called when an error is thrown
   * Updates state to show error UI
   */
  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  /**
   * Called when an error is caught
   * Logs error details for debugging
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  /**
   * Reset error state to retry rendering
   */
  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.errorContainer}>
          <div className={styles.errorContent}>
            <h2 className={styles.errorTitle}>Something went wrong</h2>
            <p className={styles.errorMessage}>
              An unexpected error occurred. Please try refreshing the page.
            </p>
            {this.state.error && (
              <details className={styles.errorDetails}>
                <summary>Error Details</summary>
                <pre className={styles.errorStack}>
                  {this.state.error.message}
                </pre>
              </details>
            )}
            <div className={styles.errorActions}>
              <button 
                onClick={this.handleReset}
                className={styles.retryButton}
              >
                Try Again
              </button>
              <button 
                onClick={() => window.location.reload()}
                className={styles.refreshButton}
              >
                Refresh Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
