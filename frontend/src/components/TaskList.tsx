import React from 'react';
import { Task } from '../types/task';
import { useDeleteTask, useUpdateTaskStatus } from '../hooks/useTasks';
import styles from '../styles/TaskList.module.css';

/**
 * TaskList Component
 * Displays a list of tasks with actions to delete and update status
 * Reusable component with proper TypeScript typing
 */

interface TaskListProps {
  tasks: Task[];
  isLoading?: boolean;
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, isLoading }) => {
  const deleteTaskMutation = useDeleteTask();
  const updateTaskMutation = useUpdateTaskStatus();

  /**
   * Handle task deletion with confirmation
   * @param taskId - ID of task to delete
   * @param taskTitle - Title of task for confirmation message
   */
  const handleDeleteTask = async (taskId: string, taskTitle: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${taskTitle}"? This action cannot be undone.`
    );
    
    if (confirmed) {
      try {
        await deleteTaskMutation.mutateAsync(taskId);
      } catch (error) {
        // Error is handled by the mutation hook
        console.error('Failed to delete task:', error);
      }
    }
  };

  /**
   * Handle task status toggle
   * @param task - Task to update
   */
  const handleToggleStatus = async (task: Task) => {
    const newStatus = task.status === 'pending' ? 'done' : 'pending';
    
    try {
      await updateTaskMutation.mutateAsync({
        id: task.id,
        updateData: { status: newStatus },
      });
    } catch (error) {
      // Error is handled by the mutation hook
      console.error('Failed to update task status:', error);
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading tasks...</div>
      </div>
    );
  }

  // Show empty state
  if (tasks.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyState}>
          <h3>No tasks yet</h3>
          <p>Create your first task to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Tasks ({tasks.length})</h2>
      
      <div className={styles.taskGrid}>
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`${styles.taskCard} ${
              task.status === 'done' ? styles.taskCompleted : ''
            }`}
          >
            {/* Task Header */}
            <div className={styles.taskHeader}>
              <h3 className={styles.taskTitle}>{task.title}</h3>
              <span
                className={`${styles.statusBadge} ${
                  task.status === 'done' ? styles.statusDone : styles.statusPending
                }`}
              >
                {task.status}
              </span>
            </div>

            {/* Task Description */}
            <p className={styles.taskDescription}>{task.description}</p>

            {/* Task Actions */}
            <div className={styles.taskActions}>
              <button
                onClick={() => handleToggleStatus(task)}
                disabled={updateTaskMutation.isPending}
                className={`${styles.actionButton} ${styles.toggleButton}`}
                title={`Mark as ${task.status === 'pending' ? 'done' : 'pending'}`}
              >
                {updateTaskMutation.isPending ? '...' : 
                 task.status === 'pending' ? '✓ Complete' : '↻ Reopen'}
              </button>

              <button
                onClick={() => handleDeleteTask(task.id, task.title)}
                disabled={deleteTaskMutation.isPending}
                className={`${styles.actionButton} ${styles.deleteButton}`}
                title="Delete task"
              >
                {deleteTaskMutation.isPending ? '...' : '🗑 Delete'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
