import React from 'react';
import { NavLink } from 'react-router-dom'; // 1. Import NavLink

const Sidebar = () => {
  // This is the style that will be applied to the active NavLink
  const activeLinkStyle = {
    backgroundColor: '#0ea5e9', // This is Tailwind's sky-500 color
    color: 'white',
  };

  return (
    <aside className="w-64 bg-slate-800 text-white p-4 flex-col hidden md:flex">
      <div className="text-2xl font-bold mb-8 text-sky-400">SmartTask</div>
      <nav>
        <ul>
          <li className="mb-2">
            {/* 2. Use NavLink for each navigation item */}
            <NavLink
              to="/app" // The URL for the main dashboard
              end // The 'end' prop ensures this link is only active for the exact path '/app'
              style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
              className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:bg-slate-700 hover:text-white"
            >
              Dashboard
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink
              to="/app/analytics" // The URL for the analytics page
              style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
              className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:bg-slate-700 hover:text-white"
            >
              Analytics
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink
              to="/app/settings" // The URL for the settings page
              style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
              className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:bg-slate-700 hover:text-white"
            >
              Settings
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;

