Smart Task Planner with AI Suggestions
An intelligent, full-stack task management application that helps users optimize productivity through AI-powered task prioritization. Built with a secure backend, dynamic React frontend, and an intelligent suggestion engine powered by Groq AI.
Live Demo: Link to Deployed App - Coming Soon!

🎯 Key Features

AI-Powered Prioritization — Leverages Groq AI (Llama 3) to analyze pending tasks and generate a prioritized completion sequence with detailed rationale for each suggestion.
Secure User Authentication — Robust registration and login system using JSON Web Tokens (JWT) with encrypted passwords via bcrypt, ensuring all user data remains private and protected.
Complete Task Management — Full CRUD operations with an intuitive interface for creating, reading, updating, and deleting tasks. All changes are reflected instantly across the application.
Productivity Analytics Dashboard — Visualize key metrics including task completion rates, priority distribution, and progress trends with responsive, interactive charts.
Advanced Filtering & Search — Instantly filter tasks by status (Pending/Completed), search by title or description, and sort by due date or priority level.
Professional UI/UX — Modern, fully responsive design featuring a polished landing page, smooth skeleton loaders during data fetching, and confirmation modals for critical actions.


📸 Screenshots
(Coming after deployment)

Landing Page
Dashboard View
AI Suggestions
Analytics Dashboard


🛠️ Technology Stack
Frontend

React 18 with Hooks
Vite — Fast build tool and dev server
React Router — Client-side routing
Tailwind CSS — Modern utility-first styling
Axios — HTTP client for API requests
Recharts — Interactive data visualization

Backend

Node.js & Express.js — REST API framework
MongoDB Atlas with Mongoose — Database and ODM
JWT — Secure authentication
bcrypt.js — Password hashing
express-validator — Input validation

AI & Deployment

Groq API with Llama 3 — AI task prioritization
Render — Backend deployment
Vercel — Frontend deployment


🚀 Local Setup & Installation
Prerequisites
Ensure you have Node.js and npm installed on your system.
1. Clone the Repository
bashgit clone https://github.com/mohammedsafwan859/smart-task-planner.git
cd smart-task-planner
2. Backend Setup
bashcd backend

# Install dependencies
npm install

# Create a .env file with the following variables:
# MONGO_URI=your_mongodb_connection_string
# GROQ_API_KEY=your_groq_api_key
# JWT_SECRET=your_jwt_secret_key

# Start the backend server
npm start
The backend will run on http://localhost:5000 (or your configured port).
3. Frontend Setup
bash# From the root directory, navigate to frontend
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
The application will be available at http://localhost:5173.

📝 Environment Variables
Create a .env file in the backend directory with:
MONGO_URI=your_mongodb_atlas_connection_string
GROQ_API_KEY=your_groq_api_key
JWT_SECRET=your_secure_jwt_secret

🤝 Contributing
Contributions are welcome! Feel free to fork the repository and submit pull requests for any improvements.

📄 License
This project is open source and available under the MIT License.