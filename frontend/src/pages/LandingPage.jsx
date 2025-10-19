import React from 'react';
import { BrainCircuit, BarChart3, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md text-center border border-slate-200">
    <div className="flex justify-center items-center mb-4">
      <div className="bg-sky-100 p-3 rounded-full">
        {icon}
      </div>
    </div>
    <h3 className="text-lg font-semibold text-slate-800 mb-2">{title}</h3>
    <p className="text-sm text-slate-600">{description}</p>
  </div>
);

const LandingPage = () => {
  const navigate = useNavigate(); // 2. Initialize the navigate function

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center">
        <div className="text-2xl font-bold text-slate-800">
          Smart<span className="text-sky-500">Task</span>
        </div>
        <div>
          {/* 3. Use navigate to go to the login page */}
          <button
            onClick={() => navigate('/login')}
            className="px-5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Login
          </button>
        </div>
      </header>

      <main className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-800 leading-tight">
          Achieve Your Goals, <br />
          <span className="text-sky-500">One Smart Task at a Time.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-slate-600">
          Stop guessing what to do next. SmartTask uses AI to analyze your to-do list and create the most efficient plan for your day, so you can focus on what truly matters.
        </p>
        <div className="mt-10">
          {/* 4. Use navigate to go to the register page */}
          <button
            onClick={() => navigate('/register')}
            className="px-8 py-3 bg-sky-600 text-white font-semibold rounded-lg shadow-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-75 transition-transform transform hover:scale-105"
          >
            Get Started for Free
          </button>
        </div>
      </main>

      <section className="bg-white py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">Why SmartTask?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<BrainCircuit size={28} className="text-sky-600" />}
              title="AI-Powered Prioritization"
              description="Our intelligent engine analyzes your tasks and suggests the optimal order for maximum productivity."
            />
            <FeatureCard 
              icon={<BarChart3 size={28} className="text-sky-600" />}
              title="Insightful Analytics"
              description="Track your completion rates and understand your work patterns with our clean, visual dashboard."
            />
            <FeatureCard 
              icon={<Edit size={28} className="text-sky-600" />}
              title="Seamless Management"
              description="A clean, intuitive interface that makes creating, editing, and completing tasks effortless."
            />
          </div>
        </div>
      </section>

      <footer className="bg-slate-800 text-slate-400 text-center p-6">
        <p>&copy; 2025 SmartTask Planner by Mohammed Safwan. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;

