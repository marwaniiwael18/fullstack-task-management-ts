import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { TaskService } from '../services/taskService';
import { Task, CreateTaskInput, UpdateTaskInput } from '../types/task';
import { useTaskStore } from '../store/taskStore';

/**
 * Custom hooks using TanStack Query for server state management
 * Provides caching, background updates, and optimistic updates
 */

// Query keys for consistent cache management
export const QUERY_KEYS = {
  TASKS: ['tasks'] as const,
  TASK: (id: string) => ['tasks', id] as const,
};

/**
 * Hook to fetch all tasks with caching and background updates
 * @returns Query result with tasks data, loading state, and error
 */
export const useTasks = () => {
  return useQuery({
    queryKey: QUERY_KEYS.TASKS,
    queryFn: TaskService.getAllTasks,
    // Refetch data every 30 seconds in the background
    refetchInterval: 30000,
    // Keep data fresh for 5 minutes
    staleTime: 5 * 60 * 1000,
  });
};

/**
 * Hook to create a new task with optimistic updates
 * @returns Mutation function and state
 */
export const useCreateTask = () => {
  const queryClient = useQueryClient();
  const { setError, clearError } = useTaskStore();

  return useMutation({
    mutationFn: TaskService.createTask,
    onMutate: async (newTask: CreateTaskInput) => {
      // Clear any previous errors
      clearError();
      
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.TASKS });

      // Snapshot the previous value
      const previousTasks = queryClient.getQueryData<Task[]>(QUERY_KEYS.TASKS);

      // Optimistically update the cache
      if (previousTasks) {
        const optimisticTask: Task = {
          id: `temp-${Date.now()}`, // Temporary ID
          ...newTask,
        };
        queryClient.setQueryData<Task[]>(QUERY_KEYS.TASKS, [...previousTasks, optimisticTask]);
      }

      return { previousTasks };
    },
    onError: (error: Error, newTask, context) => {
      // Rollback on error
      if (context?.previousTasks) {
        queryClient.setQueryData(QUERY_KEYS.TASKS, context.previousTasks);
      }
      setError(error.message);
    },
    onSuccess: () => {
      // Invalidate and refetch tasks to get the real data
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TASKS });
    },
  });
};

/**
 * Hook to delete a task with optimistic updates
 * @returns Mutation function and state
 */
export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  const { setError, clearError } = useTaskStore();

  return useMutation({
    mutationFn: TaskService.deleteTask,
    onMutate: async (taskId: string) => {
      // Clear any previous errors
      clearError();
      
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.TASKS });

      // Snapshot the previous value
      const previousTasks = queryClient.getQueryData<Task[]>(QUERY_KEYS.TASKS);

      // Optimistically remove the task from cache
      if (previousTasks) {
        const updatedTasks = previousTasks.filter(task => task.id !== taskId);
        queryClient.setQueryData<Task[]>(QUERY_KEYS.TASKS, updatedTasks);
      }

      return { previousTasks };
    },
    onError: (error: Error, taskId, context) => {
      // Rollback on error
      if (context?.previousTasks) {
        queryClient.setQueryData(QUERY_KEYS.TASKS, context.previousTasks);
      }
      setError(error.message);
    },
    onSuccess: () => {
      // Invalidate and refetch to ensure consistency
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TASKS });
    },
  });
};

/**
 * Hook to update task status with optimistic updates
 * @returns Mutation function and state
 */
export const useUpdateTaskStatus = () => {
  const queryClient = useQueryClient();
  const { setError, clearError } = useTaskStore();

  return useMutation({
    mutationFn: ({ id, updateData }: { id: string; updateData: UpdateTaskInput }) =>
      TaskService.updateTaskStatus(id, updateData),
    onMutate: async ({ id, updateData }) => {
      // Clear any previous errors
      clearError();
      
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.TASKS });

      // Snapshot the previous value
      const previousTasks = queryClient.getQueryData<Task[]>(QUERY_KEYS.TASKS);

      // Optimistically update the task in cache
      if (previousTasks) {
        const updatedTasks = previousTasks.map(task =>
          task.id === id ? { ...task, ...updateData } : task
        );
        queryClient.setQueryData<Task[]>(QUERY_KEYS.TASKS, updatedTasks);
      }

      return { previousTasks };
    },
    onError: (error: Error, variables, context) => {
      // Rollback on error
      if (context?.previousTasks) {
        queryClient.setQueryData(QUERY_KEYS.TASKS, context.previousTasks);
      }
      setError(error.message);
    },
    onSuccess: () => {
      // Invalidate and refetch to ensure consistency
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TASKS });
    },
  });
};
