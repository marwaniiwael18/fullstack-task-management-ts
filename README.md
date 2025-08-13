# 📋 Task Management Application - Test Technique Fullstack

> **Application de gestion de tâches développée en TypeScript avec Express.js et React**

Une application fullstack moderne qui répond parfaitement aux exigences du test technique pour développeur fullstack.

## 🎯 Fonctionnalités Implémentées

✅ **Toutes les fonctionnalités requises :**
- **Affichage** de la liste des tâches (GET /tasks)
- **Ajout** de nouvelles tâches (POST /tasks)  
- **Suppression** de tâches (DELETE /tasks/:id)
- **Mise à jour** du statut via toggle (PATCH /tasks/:id) ✨ **BONUS**

✅ **Tous les bonus implémentés :**
- **TanStack Query (React Query)** pour la gestion de cache et requêtes
- **Zustand** pour la gestion d'état globale
- **React Hook Form** pour la gestion des formulaires
- **Zod** pour le typage et validation côté client ET serveur

## 🛠 Stack Technique

### Backend (Express + TypeScript)
- **Express.js** avec TypeScript complet
- **Zod** pour validation des entrées et typage
- **Architecture structurée** : routes, services, types, middleware
- **Gestion d'erreurs** centralisée et typée
- **Stockage en mémoire** (tableau local comme demandé)

### Frontend (React + TypeScript)  
- **React 18** avec TypeScript complet
- **TanStack Query** pour cache et requêtes serveur
- **Zustand** pour état global
- **React Hook Form + Zod** pour formulaires validés
- **Axios** pour appels API isolés
- **CSS Modules** pour styling moderne
- **Composants réutilisables** et architecture claire

## 📁 Structure du Projet

```
task-management-app/
├── backend/                 # API Express TypeScript
│   ├── src/
│   │   ├── types/          # Types TypeScript + Schémas Zod
│   │   ├── services/       # Logique métier (TaskService)
│   │   ├── routes/         # Routes API REST
│   │   ├── middleware/     # Gestion d'erreurs
│   │   └── index.ts        # Point d'entrée serveur
│   ├── package.json
│   └── tsconfig.json
├── frontend/               # Application React TypeScript  
│   ├── src/
│   │   ├── components/     # Composants React réutilisables
│   │   ├── hooks/          # Hooks personnalisés (React Query)
│   │   ├── services/       # Service API isolé
│   │   ├── store/          # Store Zustand
│   │   ├── styles/         # CSS Modules
│   │   └── types/          # Types TypeScript partagés
│   ├── package.json
│   └── tsconfig.json
└── README.md              # Documentation complète
```

## 🚀 Instructions de Lancement

### Backend (Port 3001)

```bash
cd backend
npm install
npm run dev
```
✅ **Serveur disponible sur** `http://localhost:3001`

### Frontend (Port 3000)

```bash
cd frontend  
npm install
npm start
```
✅ **Application disponible sur** `http://localhost:3000`

## 🔌 API REST Endpoints

| Méthode | URL | Description | Status |
|---------|-----|-------------|--------|
| `GET` | `/tasks` | Retourne la liste des tâches | ✅ |
| `POST` | `/tasks` | Crée une nouvelle tâche | ✅ |
| `DELETE` | `/tasks/:id` | Supprime une tâche par ID | ✅ |
| `PATCH` | `/tasks/:id` | Met à jour le statut de la tâche | ✅ **BONUS** |
| `GET` | `/health` | Health check | ✅ |

### Modèle de Tâche
```typescript
interface Task {
  id: string;           // Généré automatiquement
  title: string;        // Titre de la tâche
  description: string;  // Description détaillée
  status: 'pending' | 'done';  // Statut enum
  createdAt: Date;     // Date de création
  updatedAt: Date;     // Date de modification
}
```

## 🏗 Choix Techniques & Architecture

### Backend - Qualité du Code
- **TypeScript complet** avec typage strict
- **Architecture en couches** : Routes → Services → Types
- **Validation Zod** sur toutes les entrées
- **Gestion d'erreurs centralisée** avec middleware personnalisé
- **Code documenté** avec commentaires explicatifs

### Frontend - Architecture Moderne
- **Composants fonctionnels** avec hooks
- **Séparation des responsabilités** claire
- **Gestion d'état optimisée** (React Query + Zustand)
- **Validation côté client** avec React Hook Form + Zod
- **Service API isolé** pour toutes les requêtes
- **Error Boundaries** pour gestion d'erreurs robuste
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
