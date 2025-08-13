import express from 'express';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';

/**
 * Main Express application setup
 * Configures middleware, routes, and error handling
 */

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware setup
app.use(cors()); // Enable CORS for frontend communication
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Request logging middleware (simple console logging)
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// API Routes
app.use('/tasks', taskRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Task Management API is running',
    timestamp: new Date().toISOString(),
  });
});

// Root endpoint with API information
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Task Management API',
    version: '1.0.0',
    endpoints: {
      'GET /tasks': 'Get all tasks',
      'POST /tasks': 'Create a new task',
      'DELETE /tasks/:id': 'Delete a task',
      'PATCH /tasks/:id': 'Update task status',
      'GET /health': 'Health check',
    },
  });
});

// Error handling middleware (must be last)
app.use(notFoundHandler);
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Task Management API server running on port ${PORT}`);
  console.log(`📋 API endpoints available at http://localhost:${PORT}`);
  console.log(`💚 Health check: http://localhost:${PORT}/health`);
});
