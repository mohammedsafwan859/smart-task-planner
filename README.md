Smart Task Planner with AI SuggestionsLive Demo: [Link to Deployed App - We will add this after deployment!]A full-stack, AI-powered task management application designed to help users optimize their productivity. This production-ready web app features a secure backend, a dynamic React frontend, and an intelligent suggestion engine that prioritizes tasks based on urgency and importance.Key Features✅ AI-Powered Prioritization: Utilizes the Groq AI platform (Llama 3) to analyze a user's pending tasks and generate a prioritized completion sequence with a clear rationale for each suggestion.✅ Full User Authentication: Secure registration and login system using JSON Web Tokens (JWT), ensuring that all user data, including tasks and analytics, is private and protected.✅ Comprehensive Task Management (CRUD): A complete and intuitive interface for creating, reading, editing, and deleting tasks, with all changes instantly reflected.✅ Productivity Analytics Dashboard: A dedicated analytics page that visualizes key metrics like task completion rates and priority breakdowns using responsive charts built with Recharts.✅ Dynamic Filtering, Sorting, and Searching: Allows users to instantly filter tasks by status (Pending, Completed), search by title/description, and sort by due date or priority.✅ Professional UI/UX: Built with a modern, responsive design that includes a polished landing page, skeleton loaders for a smooth data-fetching experience, and confirmation modals for critical actions like deletions.Screenshots(We will add screenshots here after deployment)Landing PageDashboard ViewImage of the Landing Page**AI SuggestionsAnalytics Dashboard****Technology StackThis project was built with a modern, full-stack architecture using the following technologies:Frontend:React 18 (with Hooks)Vite (for fast development and bundling)React Router (for client-side routing)Tailwind CSS (for styling)Axios (for API requests)Recharts (for data visualization)Backend:Node.jsExpress.js (for the REST API)MongoDB Atlas (with Mongoose for data modeling)JSON Web Tokens (JWT) (for authentication)bcrypt.js (for password hashing)express-validator (for backend data validation)AI Engine:Groq API (Leveraging the Llama 3 model)Deployment:Backend: RenderFrontend: VercelLocal Setup & InstallationTo run this project locally, follow these steps:1. Clone the repository:git clone [https://github.com/mohammedsafwan859/smart-task-planner.git](https://github.com/mohammedsafwan859/smart-task-planner.git)
cd smart-task-planner
2. Backend Setup:# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Create a .env file in the 'backend' directory and add the following variables:
MONGO_URI=your_mongodb_connection_string
GROQ_API_KEY=your_groq_api_key
JWT_SECRET=your_jwt_secret_key

# Start the backend server
npm start
3. Frontend Setup:# Navigate to the frontend directory (from the root)
cd frontend

# Install dependencies
npm install

# Start the frontend development server
npm run dev
The application will be available at http://localhost:5173.