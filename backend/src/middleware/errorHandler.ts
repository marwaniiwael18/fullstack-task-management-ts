import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { ApiError } from '../types/task';

/**
 * Global error handler middleware
 * Catches all errors and formats them consistently
 */
export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Error occurred:', error);

  // Handle Zod validation errors
  if (error instanceof ZodError) {
    const validationErrors = error.errors.map(err => 
      `${err.path.join('.')}: ${err.message}`
    ).join(', ');

    const response: ApiError = {
      success: false,
      error: 'Validation Error',
      message: `Invalid input: ${validationErrors}`,
    };

    res.status(400).json(response);
    return;
  }

  // Handle custom application errors
  if (error.status) {
    const response: ApiError = {
      success: false,
      error: error.name || 'Application Error',
      message: error.message,
    };

    res.status(error.status).json(response);
    return;
  }

  // Handle unexpected errors
  const response: ApiError = {
    success: false,
    error: 'Internal Server Error',
    message: 'An unexpected error occurred',
  };

  res.status(500).json(response);
};

/**
 * 404 Not Found handler
 * Handles routes that don't exist
 */
export const notFoundHandler = (req: Request, res: Response): void => {
  const response: ApiError = {
    success: false,
    error: 'Not Found',
    message: `Route ${req.method} ${req.path} not found`,
  };

  res.status(404).json(response);
};
