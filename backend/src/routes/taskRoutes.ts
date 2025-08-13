import { Router, Request, Response, NextFunction } from 'express';
import { taskService } from '../services/taskService';
import { CreateTaskSchema, UpdateTaskSchema, ApiResponse, Task } from '../types/task';

const router = Router();

/**
 * GET /tasks - Retrieve all tasks
 * Returns the complete list of tasks from memory
 */
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    const tasks = taskService.getAllTasks();
    
    const response: ApiResponse<Task[]> = {
      success: true,
      data: tasks,
      message: `Retrieved ${tasks.length} tasks`,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
});

/**
 * POST /tasks - Create a new task
 * Validates input using Zod schema and creates task
 */
router.post('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validate request body using Zod schema
    const validatedData = CreateTaskSchema.parse(req.body);
    
    // Create the task using the service
    const newTask = taskService.createTask(validatedData);
    
    const response: ApiResponse<Task> = {
      success: true,
      data: newTask,
      message: 'Task created successfully',
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
});

/**
 * DELETE /tasks/:id - Delete a specific task
 * Removes task from memory if it exists
 */
router.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    
    // Check if task exists before attempting deletion
    if (!taskService.taskExists(id)) {
      const error = new Error(`Task with ID ${id} not found`);
      (error as any).status = 404;
      throw error;
    }

    // Delete the task
    const deleted = taskService.deleteTask(id);
    
    if (deleted) {
      const response: ApiResponse<null> = {
        success: true,
        message: `Task with ID ${id} deleted successfully`,
      };
      res.json(response);
    } else {
      // This shouldn't happen given our check above, but handle it anyway
      const error = new Error('Failed to delete task');
      (error as any).status = 500;
      throw error;
    }
  } catch (error) {
    next(error);
  }
});

/**
 * PATCH /tasks/:id - Update task status (Bonus feature)
 * Updates only the status field of an existing task
 */
router.patch('/:id', (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    
    // Validate the update data using Zod schema
    const validatedData = UpdateTaskSchema.parse(req.body);
    
    // Update the task
    const updatedTask = taskService.updateTask(id, validatedData);
    
    if (!updatedTask) {
      const error = new Error(`Task with ID ${id} not found`);
      (error as any).status = 404;
      throw error;
    }

    const response: ApiResponse<Task> = {
      success: true,
      data: updatedTask,
      message: 'Task status updated successfully',
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
});

export default router;
