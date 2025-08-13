import { z } from 'zod';

// Define the status enum using Zod for validation (matches backend)
export const TaskStatusSchema = z.enum(['pending', 'done']);
export type TaskStatus = z.infer<typeof TaskStatusSchema>;

// Define the complete task schema with validation (matches backend)
export const TaskSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required').max(100, 'Title too long'),
  description: z.string().min(1, 'Description is required').max(500, 'Description too long'),
  status: TaskStatusSchema,
});

// Create input schema for new tasks (without id)
export const CreateTaskSchema = TaskSchema.omit({ id: true });

// Create update schema for partial updates
export const UpdateTaskSchema = z.object({
  status: TaskStatusSchema,
});

// Export TypeScript types for use throughout the frontend
export type Task = z.infer<typeof TaskSchema>;
export type CreateTaskInput = z.infer<typeof CreateTaskSchema>;
export type UpdateTaskInput = z.infer<typeof UpdateTaskSchema>;

// API Response types for consistent responses (matches backend)
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Error response type for better error handling
export interface ApiError {
  success: false;
  error: string;
  message: string;
}

// Form state types for React Hook Form
export interface TaskFormData {
  title: string;
  description: string;
  status: TaskStatus;
}
