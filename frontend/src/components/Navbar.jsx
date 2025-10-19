import React, { useState } from 'react';

const Navbar = ({ user, onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Get user initials for the avatar
  const getInitials = (name) => {
    if (!name) return '?';
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name[0].toUpperCase();
  };

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <div>
        <h1 className="text-xl font-semibold text-slate-800">
          Welcome, {user ? user.name.split(' ')[0] : 'Guest'}!
        </h1>
      </div>
      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center font-bold text-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
        >
          {getInitials(user?.name)}
        </button>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
            <div className="px-4 py-2 text-xs text-slate-500 border-b">
              {user?.email}
            </div>
            <button
              onClick={() => {
                onLogout();
                setDropdownOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;

