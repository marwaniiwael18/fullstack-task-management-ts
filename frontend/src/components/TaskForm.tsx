import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateTaskSchema, TaskFormData } from '../types/task';
import { useCreateTask } from '../hooks/useTasks';
import styles from '../styles/TaskForm.module.css';

/**
 * TaskForm Component
 * Reusable form component for creating new tasks
 * Uses React Hook Form with Zod validation for type safety
 */

interface TaskFormProps {
  onSuccess?: () => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onSuccess }) => {
  const createTaskMutation = useCreateTask();

  // Setup React Hook Form with Zod validation
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TaskFormData>({
    resolver: zodResolver(CreateTaskSchema),
    defaultValues: {
      title: '',
      description: '',
      status: 'pending',
    },
  });

  /**
   * Handle form submission
   * Creates new task and resets form on success
   */
  const onSubmit = async (data: TaskFormData) => {
    try {
      await createTaskMutation.mutateAsync(data);
      reset(); // Clear form after successful submission
      onSuccess?.(); // Call optional success callback
    } catch (error) {
      // Error is handled by the mutation hook and stored in global state
      console.error('Failed to create task:', error);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Add New Task</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        {/* Title Input */}
        <div className={styles.inputGroup}>
          <label htmlFor="title" className={styles.label}>
            Title *
          </label>
          <input
            id="title"
            type="text"
            {...register('title')}
            className={`${styles.input} ${errors.title ? styles.inputError : ''}`}
            placeholder="Enter task title"
          />
          {errors.title && (
            <span className={styles.errorMessage}>{errors.title.message}</span>
          )}
        </div>

        {/* Description Input */}
        <div className={styles.inputGroup}>
          <label htmlFor="description" className={styles.label}>
            Description *
          </label>
          <textarea
            id="description"
            {...register('description')}
            className={`${styles.textarea} ${errors.description ? styles.inputError : ''}`}
            placeholder="Enter task description"
            rows={3}
          />
          {errors.description && (
            <span className={styles.errorMessage}>{errors.description.message}</span>
          )}
        </div>

        {/* Status Select */}
        <div className={styles.inputGroup}>
          <label htmlFor="status" className={styles.label}>
            Status
          </label>
          <select
            id="status"
            {...register('status')}
            className={styles.select}
          >
            <option value="pending">Pending</option>
            <option value="done">Done</option>
          </select>
          {errors.status && (
            <span className={styles.errorMessage}>{errors.status.message}</span>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || createTaskMutation.isPending}
          className={`${styles.submitButton} ${
            isSubmitting || createTaskMutation.isPending ? styles.buttonDisabled : ''
          }`}
        >
          {isSubmitting || createTaskMutation.isPending ? 'Creating...' : 'Create Task'}
        </button>
      </form>
    </div>
  );
};
