import React, { createContext, useState, useEffect, useContext } from 'react';

// We no longer need useNavigate here.
// import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // We no longer need to initialize useNavigate here.
  // const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('userInfo');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem('userInfo', JSON.stringify(userData));
    setUser(userData);
  };

  // --- THIS IS THE SIMPLIFIED FIX ---
  const logout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
    // We remove navigate('/') from here. App.jsx will handle the redirect.
  };
  // --- END FIX ---

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

