import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateTaskInput, CreateTaskSchema } from '../types/task';
import { useCreateTask } from '../hooks/useTasks';
import styles from '../styles/TaskForm.module.css';

/**
 * TaskForm Component
 * 
 * A form component for creating new tasks with enhanced validation.
 * Uses React Hook Form with Zod schema validation for type safety.
 * 
 * Features:
 * - Enhanced form validation with detailed error messages
 * - Loading state during submission
 * - Automatic form reset after successful submission
 * - Improved UX with better visual feedback
 */
export const TaskForm: React.FC = () => {
  const createTaskMutation = useCreateTask();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting, isValid }
  } = useForm<CreateTaskInput>({
    resolver: zodResolver(CreateTaskSchema),
    defaultValues: {
      title: '',
      description: '',
      status: 'pending'
    },
    mode: 'onChange' // Enable real-time validation
  });

  // Watch form values for character counting
  const titleValue = watch('title');
  const descriptionValue = watch('description');

  /**
   * Handle form submission
   * Creates a new task and resets the form on success
   */
  const onSubmit = async (data: CreateTaskInput) => {
    try {
      await createTaskMutation.mutateAsync(data);
      reset(); // Reset form after successful submission
    } catch (error) {
      // Error handling is managed by the mutation hook and global error state
      console.error('Failed to create task:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>✨ Add New Task</h2>
        <p className={styles.subtitle}>Create a new task to stay organized</p>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.fieldGroup}>
          <label htmlFor="title" className={styles.label}>
            📝 Title *
          </label>
          <input
            id="title"
            type="text"
            {...register('title')}
            className={`${styles.input} ${errors.title ? styles.inputError : ''}`}
            placeholder="Enter a clear and concise task title..."
            maxLength={100}
          />
          <div className={styles.fieldFooter}>
            {errors.title && (
              <span className={styles.error}>⚠️ {errors.title.message}</span>
            )}
            <span className={styles.charCount}>
              {titleValue?.length || 0}/100
            </span>
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="description" className={styles.label}>
            📄 Description *
          </label>
          <textarea
            id="description"
            {...register('description')}
            className={`${styles.textarea} ${errors.description ? styles.inputError : ''}`}
            placeholder="Describe what needs to be done, include any important details..."
            rows={4}
            maxLength={500}
          />
          <div className={styles.fieldFooter}>
            {errors.description && (
              <span className={styles.error}>⚠️ {errors.description.message}</span>
            )}
            <span className={styles.charCount}>
              {descriptionValue?.length || 0}/500
            </span>
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="status" className={styles.label}>
            🏷️ Initial Status
          </label>
          <select
            id="status"
            {...register('status')}
            className={styles.select}
          >
            <option value="pending">⏳ Pending</option>
            <option value="done">✅ Done</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || createTaskMutation.isPending || !isValid}
          className={`${styles.submitButton} ${
            isSubmitting || createTaskMutation.isPending || !isValid 
              ? styles.submitButtonDisabled 
              : ''
          }`}
        >
          {isSubmitting || createTaskMutation.isPending ? (
            <>
              <span className={styles.spinner}></span>
              Creating Task...
            </>
          ) : (
            <>
              🚀 Create Task
            </>
          )}
        </button>
      </form>
    </div>
  );
};
