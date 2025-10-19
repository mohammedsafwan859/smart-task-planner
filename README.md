# Smart Task Planner - AI-Powered Productivity App

A full-stack, AI-powered task management application designed to help users optimize their productivity. This project features a complete user authentication system, an intelligent suggestion engine using the Groq AI platform, and a comprehensive analytics dashboard.

## Live Demo

You can try the live application here: [We will add the live link after deployment!]

## Screenshots & Demo

### Landing Page
<img width="1901" height="969" alt="Image" src="https://github.com/user-attachments/assets/1e618b73-913e-4c23-a651-c59259582ce8" />

### Main Application Dashboard
<img width="1919" height="962" alt="Image" src="https://github.com/user-attachments/assets/d0204f23-3c52-4f70-92b2-06fbea2e6d45" />

### AI-Powered Task Suggestions
<img width="1651" height="394" alt="Image" src="https://github.com/user-attachments/assets/79c72450-513e-4964-bccf-f542c4a20a06" />

### Productivity Analytics Dashboard

## Core Features

🤖 **AI-Powered Prioritization**: Utilizes the Groq AI platform to analyze tasks based on priority, due date, and category, providing an intelligent, prioritized completion sequence with clear rationale.

🔐 **Full User Authentication**: Secure user registration and login system using JSON Web Tokens (JWT). Passwords are encrypted using bcryptjs, and API routes are protected.

📊 **Productivity Analytics**: A dedicated dashboard visualizes key metrics like task completion rates and priority breakdowns with responsive charts built using Recharts.

⚙️ **Comprehensive Task Management**: Full CRUD (Create, Read, Update, Delete) functionality for tasks with a clean, intuitive, and responsive user interface.

✨ **Dynamic UI & UX**: Includes dynamic filtering, sorting, and searching, professional toast notifications, skeleton loaders for a smooth experience, and confirmation modals for critical actions.

## Tech Stack

### Frontend
- React 18 (with Hooks)
- Vite
- React Router
- Tailwind CSS
- Axios
- Recharts

### Backend
- Node.js
- Express.js
- MongoDB Atlas (with Mongoose)
- JSON Web Tokens (JWT)
- bcryptjs
- express-validator

### AI & Deployment
- Groq API
- Vercel (Frontend Hosting)
- Render (Backend Hosting)

## Getting Started

To run this project locally, follow these steps:

### Prerequisites
- Node.js installed on your machine
- A MongoDB Atlas account and connection string
- A Groq API Key

### Installation & Setup

1. Clone the repository:
```bash
git clone https://github.com/mohammedsafwan859/smart-task-planner.git
cd smart-task-planner
```

2. Setup the Backend:
```bash
cd backend
npm install
```

Create a .env file in the backend directory and add the following variables:
```
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
GROQ_API_KEY=YOUR_GROQ_API_KEY
JWT_SECRET=YOUR_JWT_SECRET_KEY
```

3. Setup the Frontend:
```bash
cd ../frontend
npm install
```
(No .env file is needed for local development on the frontend)

4. Run the application:

In one terminal, start the backend server (from the backend directory):
```bash
npm start
```

In another terminal, start the frontend development server (from the frontend directory):
```bash
npm run dev
```

Open http://localhost:5173 in your browser.

## Author

Mohammed Safwan - [mohammedsafwan859](https://github.com/mohammedsafwan859)
