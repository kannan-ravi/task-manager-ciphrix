# Task Manager for Ciphrix 🚀

Full-stack web application built with the MERN stack (MongoDB, Express.js, React, Node.js). It features a secure, cookie-based authentication system and full CRUD (Create, Read, Update, Delete) functionality for managing user-specific tasks.

The user interface is built with **Material-UI (MUI)**, featuring a responsive design, a powerful data grid, and both light and dark themes.

---

## ✨ Key Features

-   **User Authentication**: Secure user registration and login system.
-   **JWT with httpOnly Cookies**: Authentication is handled via JSON Web Tokens stored in secure, `httpOnly` cookies, preventing XSS attacks.
-   **Task CRUD Operations**: Authenticated users can Create, Read, Update, and Delete their own tasks.
-   **Protected Routes**: Frontend routes for the main application are protected, redirecting unauthenticated users to the login page.
-   **Responsive UI**: A beautiful and responsive user interface built with Material-UI.
-   **Powerful Data Grid**: Tasks are displayed in an MUI X DataGrid with client-side pagination, sorting, and custom cell rendering.
-   **Rich Theming**: Includes a custom, extendable theme with full support for **Light and Dark Modes**.
-   **State Management**: Centralized and predictable client-side state management using **Redux Toolkit**.
-   **User Feedback**: Toast notifications for success and error messages provide a clear user experience.

---

## 🛠️ Tech Stack

### Frontend

-   **Framework**: [React](https://reactjs.org/)
-   **Build Tool**: [Vite](https://vitejs.dev/)
-   **UI Library**: [Material-UI (MUI)](https://mui.com/) & [MUI X DataGrid](https://mui.com/x/react-data-grid/)
-   **Routing**: [React Router](https://reactrouter.com/)
-   **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) & [React-Redux](https://react-redux.js.org/)
-   **API Client**: [Axios](https://axios-http.com/)
-   **Linting**: [ESLint](https://eslint.org/)

### Backend

-   **Runtime**: [Node.js](https://nodejs.org/)
-   **Framework**: [Express.js](https://expressjs.com/)
-   **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
-   **Authentication**: [JSON Web Token (JWT)](https://jwt.io/) & [Cookie-Parser](https://www.npmjs.com/package/cookie-parser)
-   **Password Hashing**: [Bcrypt.js](https://www.npmjs.com/package/bcryptjs)
-   **CORS**: `cors` middleware for handling cross-origin requests.
-   **Environment Variables**: `dotenv`

---

## 📸 Screenshots

*(This is a placeholder section. Add screenshots of your application here!)*

| Login Page (Light Mode) | Dashboard (Dark Mode) | Create Task Form |
| :---: | :---: | :---: |
| _[Add screenshot of your login page here]_ | _[Add screenshot of your dashboard/task table in dark mode here]_ | _[Add screenshot of your create/edit task form here]_ |

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need the following software installed on your machine:
-   [Node.js](https://nodejs.org/en/download/) (v18.x or later recommended)
-   [npm](https://www.npmjs.com/get-npm)
-   [MongoDB](https://www.mongodb.com/try/download/community). Make sure you have a running MongoDB instance (local or Atlas).

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/kannan-ravi/task-manager-ciphrix.git
    cd task-manager-ciphrix
    ```

2.  **Setup the Backend:**
    ```bash
    # Navigate to the backend directory
    cd backend

    # Install dependencies
    npm install

    # Create a .env file in the /backend directory
    touch .env
    ```
    Now, add the required environment variables to the `.env` file (see the "Environment Variables" section below).
    ```bash
    # Start the development server
    npm run dev
    ```
    The backend server will start on `http://localhost:5000` (or the port specified in your `.env`).

3.  **Setup the Frontend:**
    ```bash
    # Navigate to the frontend directory from the root
    cd frontend

    # Install dependencies
    npm install

    # Start the development server
    npm run dev
    ```
    The frontend development server will start, typically on `http://localhost:5173`.

4.  **Open your browser** and navigate to `http://localhost:5173`. You should see the login page!

---

## ⚙️ Environment Variables

You need to create a `.env` file for the backend.

#### Backend (`/backend/.env`)

```ini
# Port for the backend server
PORT=5000

# Your MongoDB connection string
MONGO_URI=mongodb://localhost:27017/task-manager-db

# A long, random, and secret string for signing JWTs
JWT_SECRET_KEY=thisisasecretkeythatshouldbeverylongandrandom

# Set to "development" for local work, "production" for deployment
NODE_ENV=development
```

---

## 📝 API Endpoints

All task-related routes are protected and require authentication.

### Auth Routes
| Method | Endpoint | Description |
|:---|:---|:---|
| `POST` | `/api/auth/register` | Register a new user. |
| `POST` | `/api/auth/login` | Log in a user and set an `httpOnly` cookie. |
| `GET` | `/api/auth/logout` | Log out a user and clear the cookie. |

### Task Routes
| Method | Endpoint | Description |
|:---|:---|:---|
| `POST` | `/api/tasks` | Create a new task. |
| `GET` | `/api/tasks` | Get all tasks for the logged-in user. |
| `GET` | `/api/tasks/:id` | Get a single task by its ID. |
| `PUT` | `/api/tasks/:id` | Update a task by its ID. |
| `DELETE` | `/api/tasks/:id` | Delete a task by its ID. |

---

## ☁️ Deployment Notes

### Deploying to Vercel

When deploying the frontend and backend to separate Vercel projects, you will encounter **cross-domain cookie issues**. The browser will not send the `httpOnly` cookie from the frontend domain to the backend domain by default.

Working on the deployement problem.
---

## 📄 License

This project is licensed under the MIT License.