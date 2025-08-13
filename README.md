# Task Management Application

A modern fullstack task management application built with TypeScript, featuring a REST API backend and React frontend.

## 🚀 Tech Stack

### Backend
- **Express.js** with TypeScript
- **Zod** for schema validation and type safety
- **CORS** for cross-origin requests
- **In-memory storage** (no database required)

### Frontend
- **React 18** with TypeScript
- **TanStack Query (React Query)** for server state management
- **Zustand** for client state management
- **React Hook Form** for form handling
- **Zod** for client-side validation
- **CSS Modules** for styling

## 📋 Features

- ✅ View all tasks
- ✅ Add new tasks
- ✅ Delete tasks
- ✅ Update task status (pending/done)
- ✅ Form validation
- ✅ Error handling
- ✅ Responsive design

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The API will be available at `http://localhost:3001`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tasks` | Get all tasks |
| POST | `/tasks` | Create a new task |
| DELETE | `/tasks/:id` | Delete a task by ID |
| PATCH | `/tasks/:id` | Update task status |
| GET | `/health` | Health check |

### Example API Usage

**Create a task:**
```bash
curl -X POST http://localhost:3001/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn TypeScript", "description": "Complete TypeScript tutorial", "status": "pending"}'
```

**Get all tasks:**
```bash
curl http://localhost:3001/tasks
```

## 🏗️ Project Structure

```
task-management-app/
├── backend/
│   ├── src/
│   │   ├── types/          # TypeScript type definitions
│   │   ├── services/       # Business logic
│   │   ├── routes/         # API route handlers
│   │   ├── middleware/     # Express middleware
│   │   └── index.ts        # Main server file
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API service layer
│   │   ├── store/          # Zustand state management
│   │   ├── types/          # TypeScript types
│   │   └── App.tsx         # Main application component
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

## 🎯 Technical Choices

### Backend Architecture
- **Express.js**: Chosen for its simplicity and extensive ecosystem
- **Zod**: Provides runtime type validation and excellent TypeScript integration
- **Service Layer Pattern**: Separates business logic from route handlers
- **Centralized Error Handling**: Consistent error responses across the API

### Frontend Architecture
- **Component-Based Design**: Reusable and maintainable UI components
- **Custom Hooks**: Encapsulate complex logic and promote reusability
- **TanStack Query**: Handles server state, caching, and background updates
- **Zustand**: Lightweight state management for client-side state
- **React Hook Form**: Performant forms with built-in validation

### Code Quality
- **TypeScript**: Full type safety across the entire application
- **Consistent Error Handling**: Structured error responses and user feedback
- **Separation of Concerns**: Clear separation between UI, business logic, and data
- **Beginner-Friendly Comments**: Detailed explanations for learning purposes

## 🧪 Development

### Running Tests
```bash
# Backend
cd backend && npm test

# Frontend
cd frontend && npm test
```

### Building for Production
```bash
# Backend
cd backend && npm run build

# Frontend
cd frontend && npm run build
```

## 📝 Notes

This application was built as a technical assessment demonstrating:
- Clean, maintainable code architecture
- Proper TypeScript usage and type safety
- Modern React patterns and best practices
- RESTful API design principles
- Error handling and validation
- Professional development workflow
