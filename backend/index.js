const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple in-memory task storage
let tasks = [];
let nextId = 1;

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Task Management API is running',
    timestamp: new Date().toISOString(),
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Task Management API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      tasks: '/tasks',
    },
    timestamp: new Date().toISOString(),
  });
});

// Get all tasks
app.get('/tasks', (req, res) => {
  res.json({
    success: true,
    data: tasks,
    count: tasks.length,
  });
});

// Create task
app.post('/tasks', (req, res) => {
  const { title, description } = req.body;
  
  if (!title || title.trim().length === 0) {
    return res.status(400).json({
      success: false,
      error: 'Title is required',
    });
  }

  const newTask = {
    id: nextId++,
    title: title.trim(),
    description: description ? description.trim() : '',
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  tasks.push(newTask);
  
  res.status(201).json({
    success: true,
    data: newTask,
  });
});

// Delete task
app.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(task => task.id === id);
  
  if (taskIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Task not found',
    });
  }
  
  tasks.splice(taskIndex, 1);
  
  res.json({
    success: true,
    message: 'Task deleted successfully',
  });
});

// Update task status
app.patch('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { status } = req.body;
  
  const task = tasks.find(task => task.id === id);
  
  if (!task) {
    return res.status(404).json({
      success: false,
      error: 'Task not found',
    });
  }
  
  if (status && ['pending', 'done'].includes(status)) {
    task.status = status;
    task.updatedAt = new Date().toISOString();
  }
  
  res.json({
    success: true,
    data: task,
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Task Management API running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`📋 Tasks endpoint: http://localhost:${PORT}/tasks`);
});
