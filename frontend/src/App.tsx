import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ErrorNotification } from './components/ErrorNotification';
import { useTasks } from './hooks/useTasks';
import { Task } from './types/task';
import './styles/App.css';

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
  const { data: tasks = [], isLoading, error } = useTasks();

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <h1 className="app-title">Task Management</h1>
        <p className="app-subtitle">
          Organize your work efficiently with our modern task management system
        </p>
      </header>

      {/* Main Content */}
      <main className="app-main">
        <div className="app-container">
          {/* Task Creation Form */}
          <TaskForm />
          
          {/* Task List Display */}
          <TaskList tasks={tasks as Task[]} isLoading={isLoading} />
        </div>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>Built with React, TypeScript, and modern web technologies</p>
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
