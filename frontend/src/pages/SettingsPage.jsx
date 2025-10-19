import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { updatePassword, deleteAccount } from '../services/api'; // Import new API functions
import toast from 'react-hot-toast';

const SettingsPage = () => {
  const { user, logout } = useAuth(); // Get user and logout function
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Function to handle password change
  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword) {
      return toast.error('Please fill in both password fields.');
    }
    try {
      await updatePassword({ currentPassword, newPassword });
      toast.success('Password updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update password.');
    }
  };

  // Function to handle account deletion
  const handleDeleteAccount = async () => {
    // Use a simple browser confirm dialog for this critical action
    if (window.confirm('Are you absolutely sure you want to delete your account? This action is permanent and cannot be undone.')) {
      try {
        await deleteAccount();
        toast.success('Account deleted successfully.');
        logout(); // Log the user out and clear their session
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to delete account.');
      }
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-slate-800">Settings</h1>

      {/* Account Information Section */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
        <h2 className="text-xl font-semibold text-slate-700 mb-4">Account Information</h2>
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-slate-500">Name</label>
            <p className="text-md text-slate-800">{user?.name}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-500">Email</label>
            <p className="text-md text-slate-800">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Change Password Section */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
        <h2 className="text-xl font-semibold text-slate-700 mb-4">Change Password</h2>
        <div className="space-y-4 max-w-sm">
          <div>
            <label className="block text-sm font-medium text-slate-700">Current Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">New Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500"
            />
          </div>
          <div className="text-right">
            <button
              onClick={handleChangePassword}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700"
            >
              Update Password
            </button>
          </div>
        </div>
      </div>

      {/* Delete Account Section */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-red-300">
        <h2 className="text-xl font-semibold text-red-700 mb-2">Danger Zone</h2>
        <p className="text-sm text-slate-600 mb-4">
          Deleting your account is a permanent action and cannot be undone. All of your tasks and data will be removed.
        </p>
        <button
          onClick={handleDeleteAccount}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
        >
          Delete My Account
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;

