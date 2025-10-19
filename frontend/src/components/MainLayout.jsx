import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useAuth } from '../context/AuthContext';

// This component is now much simpler.
const MainLayout = ({ children }) => {
  const { user, logout } = useAuth();
  return (
    <div className="flex h-screen bg-slate-100">
      {/* The Sidebar no longer needs props passed from here */}
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar user={user} onLogout={logout} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-100 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;

