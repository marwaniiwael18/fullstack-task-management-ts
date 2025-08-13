import axios from 'axios';
import { Task, CreateTaskInput, UpdateTaskInput, ApiResponse } from '../types/task';

/**
 * API Service for task management
 * Handles all HTTP requests to the backend API
 * Uses axios for HTTP client with proper error handling
 */

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for consistent error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    throw error;
  }
);

/**
 * Task API service class
 * Encapsulates all task-related API operations
 */
export class TaskService {
  /**
   * Fetch all tasks from the backend
   * @returns Promise with array of tasks
   */
  static async getAllTasks(): Promise<Task[]> {
    try {
      const response = await api.get<ApiResponse<Task[]>>('/tasks');
      return response.data.data || [];
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      throw new Error('Failed to load tasks. Please try again.');
    }
  }

  /**
   * Create a new task
   * @param taskData - Task data without ID
   * @returns Promise with created task
   */
  static async createTask(taskData: CreateTaskInput): Promise<Task> {
    try {
      const response = await api.post<ApiResponse<Task>>('/tasks', taskData);
      if (!response.data.data) {
        throw new Error('Invalid response from server');
      }
      return response.data.data;
    } catch (error: any) {
      console.error('Failed to create task:', error);
      
      // Handle validation errors from backend
      if (error.response?.status === 400) {
        throw new Error(error.response.data.message || 'Invalid task data');
      }
      
      throw new Error('Failed to create task. Please try again.');
    }
  }

  /**
   * Delete a task by ID
   * @param id - Task ID to delete
   * @returns Promise that resolves when task is deleted
   */
  static async deleteTask(id: string): Promise<void> {
    try {
      await api.delete(`/tasks/${id}`);
    } catch (error: any) {
      console.error('Failed to delete task:', error);
      
      // Handle not found errors
      if (error.response?.status === 404) {
        throw new Error('Task not found');
      }
      
      throw new Error('Failed to delete task. Please try again.');
    }
  }

  /**
   * Update task status
   * @param id - Task ID to update
   * @param updateData - New status data
   * @returns Promise with updated task
   */
  static async updateTaskStatus(id: string, updateData: UpdateTaskInput): Promise<Task> {
    try {
      const response = await api.patch<ApiResponse<Task>>(`/tasks/${id}`, updateData);
      if (!response.data.data) {
        throw new Error('Invalid response from server');
      }
      return response.data.data;
    } catch (error: any) {
      console.error('Failed to update task:', error);
      
      // Handle not found errors
      if (error.response?.status === 404) {
        throw new Error('Task not found');
      }
      
      // Handle validation errors
      if (error.response?.status === 400) {
        throw new Error(error.response.data.message || 'Invalid update data');
      }
      
      throw new Error('Failed to update task. Please try again.');
    }
  }

  /**
   * Health check endpoint
   * @returns Promise that resolves if API is healthy
   */
  static async healthCheck(): Promise<boolean> {
    try {
      await api.get('/health');
      return true;
    } catch (error) {
      console.error('API health check failed:', error);
      return false;
    }
  }
}
