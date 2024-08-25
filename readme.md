# To-Do List Application

This project is a full-stack To-Do List application that allows users to manage tasks efficiently. The backend is built with Node.js, Express, and MongoDB, while the frontend is built using React and TypeScript.

## Table of Contents

- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Backend API Endpoints](#backend-api-endpoints)
- [Frontend Components](#frontend-components)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Project Structure

### Backend

The backend is organized as follows:

```plaintext
backend/
│
├── dist/
├── logs/
├── node_modules/
├── src/
│   ├── config/
│   │   ├── __tests__/
│   │   └── dbConfig.ts
│   ├── controllers/
│   │   ├── __tests__/
│   │   └── taskController.ts
│   ├── docs/
│   │   └── swagger.yaml
│   ├── models/
│   │   └── taskModel.ts
│   ├── routes/
│   │   └── taskRoutes.ts
│   ├── utils/
│   │   ├── logger.ts
│   │   └── index.ts
│   ├── index.ts
├── jest.config.ts
├── .env
├── .gitignore
├── babel.config.js
├── package.json
├── package-lock.json
└── tsconfig.json
```

### Frontend

The frontend is organized as follows:

```plaintext
frontend/
│
├── node_modules/
├── public/
├── src/
│   ├── apis/
│   │   ├── __tests__/
│   │   ├── createTodo.ts
│   │   ├── deleteTodo.ts
│   │   ├── fetchTodos.ts
│   │   └── updateTodo.ts
│   ├── components/
│   │   ├── AddDialog.tsx
│   │   ├── AddForm.tsx
│   │   ├── Task.tsx
│   │   └── Todo.tsx
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── index.css
│   ├── index.tsx
│   ├── react-app-env.d.ts
│   ├── reportWebVitals.ts
│   └── setupTests.ts
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## Installation

To install the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/to-do-list-app.git
   ```

2. Navigate to the project directory:
   ```bash
   cd to-do-list-app
   ```

3. Install dependencies for both backend and frontend:
   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

4. Create a .env file in the backend and frontend directories and add the required environment variables.


## Usage

### Running the Backend
To start the backend server, navigate to the backend directory and run:
```bash
cd backend
npm run build
npm run start
```

### Running the Frontend
To start the frontend development server, navigate to the frontend directory and run:
```bash
cd frontend
npm start
```

## Backend API Endpoints
The backend provides the following API endpoints:

- `GET /api/tasks`: Retrieves a list of all tasks.
- `POST /api/tasks`: Creates a new task.
- `PUT /api/tasks/`: Updates the completion status of a task.
- `DELETE /api/tasks/`: Deletes a task by its ID.

Or you can easily check by `/api-docs` which is provided by swagger.

## Frontend Components
The frontend provides the following components:

- `AddForm`: A form component for adding new tasks.
- `Task`: A component for displaying a task.
- `Todo`: A component for displaying a list of tasks.
- `AddDialog`: A dialog component for adding new tasks.

## Testing
The project includes unit tests for the backend and frontend components. To run the tests, navigate to the respective directories and run:
```bash
cd backend
npm run test
```
```bash
cd frontend
npm run test
```
## Contact
Created by Gru-lucy.
