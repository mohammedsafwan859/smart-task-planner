import axios from 'axios';

const API_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:5000';

// Task Functions
export const getTasks = () => axios.get(`${API_URL}/api/tasks`);
export const createTask = (taskData) => axios.post(`${API_URL}/api/tasks`, taskData);
export const deleteTask = (id) => axios.delete(`${API_URL}/api/tasks/${id}`);
export const updateTask = (id, updateData) => axios.put(`${API_URL}/api/tasks/${id}`, updateData);

// Suggestion Function
export const getSuggestions = (tasks) => axios.post(`${API_URL}/api/suggestions`, { tasks });

// Analytics Function
export const getAnalytics = () => axios.get(`${API_URL}/api/analytics`);

// User Authentication Functions
export const register = (userData) => axios.post(`${API_URL}/api/users/register`, userData);
export const login = (userData) => axios.post(`${API_URL}/api/users/login`, userData);

// --- NEW User Profile Functions ---
export const updatePassword = (passwordData) => axios.put(`${API_URL}/api/users/profile`, passwordData);
export const deleteAccount = () => axios.delete(`${API_URL}/api/users/profile`);

