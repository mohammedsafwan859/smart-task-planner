import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { login } from '../services/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login: authLogin } = useAuth();
  const navigate = useNavigate(); // 2. Initialize the navigate function

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error('Please fill in all fields.');
    }
    try {
      const { data } = await login({ email, password });
      authLogin(data);
      toast.success('Logged in successfully!');
      // After login, navigate to the main app dashboard
      navigate('/app'); 
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-slate-800 mb-6">Welcome Back!</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500"
            />
          </div>
          <button type="submit" className="w-full py-2 px-4 bg-sky-600 text-white font-semibold rounded-lg shadow-md hover:bg-sky-700">
            Log In
          </button>
        </form>
        <p className="text-center text-sm text-slate-600 mt-4">
          Don't have an account?{' '}
          {/* 3. Use navigate to go to the register page */}
          <button onClick={() => navigate('/register')} className="font-medium text-sky-600 hover:underline">
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

