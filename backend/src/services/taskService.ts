import { Task, CreateTaskInput, UpdateTaskInput } from '../types/task';

/**
 * Task Service - Handles all business logic for task management
 * Uses in-memory storage as requested (no database needed)
 */
class TaskService {
  // In-memory storage for tasks
  private tasks: Task[] = [];
  private nextId: number = 1;

  /**
   * Generate a unique ID for new tasks
   * Simple incrementing counter for this demo
   */
  private generateId(): string {
    return (this.nextId++).toString();
  }

  /**
   * Get all tasks from memory
   * @returns Array of all tasks
   */
  getAllTasks(): Task[] {
    return [...this.tasks]; // Return a copy to prevent direct mutation
  }

  /**
   * Get a specific task by ID
   * @param id - Task ID to search for
   * @returns Task if found, undefined otherwise
   */
  getTaskById(id: string): Task | undefined {
    return this.tasks.find(task => task.id === id);
  }

  /**
   * Create a new task
   * @param taskData - Task data without ID
   * @returns The created task with generated ID
   */
  createTask(taskData: CreateTaskInput): Task {
    const newTask: Task = {
      id: this.generateId(),
      ...taskData,
    };

    this.tasks.push(newTask);
    return newTask;
  }

  /**
   * Update an existing task's status
   * @param id - Task ID to update
   * @param updateData - New status data
   * @returns Updated task if found, undefined otherwise
   */
  updateTask(id: string, updateData: UpdateTaskInput): Task | undefined {
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    
    if (taskIndex === -1) {
      return undefined;
    }

    // Update the task with new data
    this.tasks[taskIndex] = {
      ...this.tasks[taskIndex],
      ...updateData,
    };

    return this.tasks[taskIndex];
  }

  /**
   * Delete a task by ID
   * @param id - Task ID to delete
   * @returns true if task was deleted, false if not found
   */
  deleteTask(id: string): boolean {
    const initialLength = this.tasks.length;
    this.tasks = this.tasks.filter(task => task.id !== id);
    
    // Return true if a task was actually removed
    return this.tasks.length < initialLength;
  }

  /**
   * Check if a task exists by ID
   * @param id - Task ID to check
   * @returns true if task exists, false otherwise
   */
  taskExists(id: string): boolean {
    return this.tasks.some(task => task.id === id);
  }
}

// Export a singleton instance to maintain state across requests
export const taskService = new TaskService();
