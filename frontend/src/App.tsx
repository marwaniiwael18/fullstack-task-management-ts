import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ErrorNotification } from './components/ErrorNotification';
import { useTasks } from './hooks/useTasks';

import styles from './styles/App.module.css';

/**
 * Create QueryClient instance for TanStack Query
 * Configures caching and error handling for the entire app
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Retry failed requests up to 3 times
      retry: 3,
      // Consider data stale after 5 minutes
      staleTime: 5 * 60 * 1000,
      // Keep unused data in cache for 10 minutes
      gcTime: 10 * 60 * 1000,
    },
    mutations: {
      // Retry failed mutations once
      retry: 1,
    },
  },
});

/**
 * Main App Content Component
 * Contains the core application logic and UI
 */
const AppContent: React.FC = () => {
  // Use custom hook to fetch tasks with React Query
  const { data: tasks = [] } = useTasks();

  return (
    <div className={styles.app}>
      {/* Navigation Bar */}
      <nav className={styles.navbar}>
        <div className={styles.navContainer}>
          <div className={styles.navBrand}>
            <img 
              src="/logo.png" 
              alt="Cash Flow Positive Logo" 
              className={styles.navLogo}
            />
            <div className={styles.navCompanyInfo}>
              <h2 className={styles.navCompanyName}>Cash Flow Positive</h2>
              <p className={styles.navCompanyTagline}>Investment & Real Estate Solutions</p>
            </div>
          </div>
          <div className={styles.navTitle}>
            <h1 className={styles.navAppTitle}>📋 Task Management System</h1>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.contentGrid}>
            {/* Left Side - Task Form */}
            <div className={styles.formSection}>
              <TaskForm />
            </div>
            
            {/* Right Side - Task List */}
            <div className={styles.listSection}>
              <TaskList tasks={tasks} />
            </div>
          </div>
        </div>
      </main>
      
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerLeft}>
            <p className={styles.signature}>
              ✨ Developed by <span className={styles.developerName}>Marwani Wael</span>
            </p>
            <p className={styles.techStack}>
              Built with React, TypeScript, Express.js & Modern Web Technologies
            </p>
          </div>
          
          <div className={styles.footerCenter}>
            <div className={styles.contactLinks}>
              <a 
                href="https://www.marwaniwael.me" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.contactLink}
              >
                🌐 Portfolio
              </a>
              <a 
                href="https://www.linkedin.com/in/wael-marwani/" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.contactLink}
              >
                💼 LinkedIn
              </a>
              <a 
                href="https://github.com/marwaniiwael18/" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.contactLink}
              >
                💻 GitHub
              </a>
              <a 
                href="mailto:wael.marwani@esprit.tn" 
                className={styles.contactLink}
              >
                📧 Email
              </a>
            </div>
          </div>
          
          <div className={styles.footerRight}>
            <p className={styles.copyright}>
              © 2025 Marwani Wael
            </p>
          </div>
        </div>
      </footer>

      {/* Global Error Notification */}
      <ErrorNotification />
    </div>
  );
};

/**
 * Main App Component
 * Wraps the application with necessary providers and error boundaries
 */
const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AppContent />
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
