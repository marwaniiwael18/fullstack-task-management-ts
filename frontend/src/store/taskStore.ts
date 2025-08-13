import { create } from 'zustand';
import { Task } from '../types/task';

/**
 * Zustand store for client-side state management
 * Manages UI state, loading states, and error handling
 */

interface TaskStore {
  // UI State
  isLoading: boolean;
  error: string | null;
  
  // Task Management State
  selectedTaskId: string | null;
  
  // Actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSelectedTask: (taskId: string | null) => void;
  clearError: () => void;
}

/**
 * Create Zustand store with TypeScript support
 * Provides centralized state management for the application
 */
export const useTaskStore = create<TaskStore>((set) => ({
  // Initial state
  isLoading: false,
  error: null,
  selectedTaskId: null,

  // Actions to update state
  setLoading: (loading: boolean) => 
    set({ isLoading: loading }),

  setError: (error: string | null) => 
    set({ error }),

  setSelectedTask: (taskId: string | null) => 
    set({ selectedTaskId: taskId }),

  clearError: () => 
    set({ error: null }),
}));
