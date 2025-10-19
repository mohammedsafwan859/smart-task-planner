import { useState, useEffect, useMemo } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LandingPage from './pages/LandingPage';
import MainLayout from './components/MainLayout';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import EditTaskModal from './components/EditTaskModal';
import ConfirmationModal from './components/ConfirmationModal';
import FilterBar from './components/FilterBar';
import SuggestionDisplay from './components/SuggestionDisplay';
import AnalyticsPage from './pages/AnalyticsPage';
import SettingsPage from './pages/SettingsPage';
import { getTasks, createTask, deleteTask, updateTask, getSuggestions } from './services/api';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { TaskListSkeleton } from './components/TaskSkeleton';

const DashboardPage = ({
  tasks, filteredTasks, loading, suggestions, isSuggestionLoading,
  handleGetSuggestions, clearSuggestions, addTask, deleteTaskFromState,
  toggleTaskStatus, openEditModal, searchTerm, setSearchTerm, setStatusFilter, setSortOption
}) => {
  if (loading) {
    return <TaskListSkeleton />;
  }
  return (
    <>
      <TaskForm onAddTask={addTask} />
      <div className="mb-6">
        <button
          onClick={handleGetSuggestions}
          disabled={isSuggestionLoading}
          className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75 disabled:bg-indigo-300"
        >
          {isSuggestionLoading ? 'Analyzing...' : 'Get AI Suggestions'}
        </button>
      </div>
      <SuggestionDisplay suggestions={suggestions} originalTasks={tasks} onClear={clearSuggestions} />
      <FilterBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setStatusFilter={setStatusFilter}
        setSortOption={setSortOption}
      />
      <TaskList
        tasks={filteredTasks}
        onDeleteTask={deleteTaskFromState}
        onToggleTaskStatus={toggleTaskStatus}
        onOpenEditModal={openEditModal}
      />
    </>
  );
};

const AppLayout = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortOption, setSortOption] = useState('createdAt-desc');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [isSuggestionLoading, setIsSuggestionLoading] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  useEffect(() => {
    setLoading(true);
    const fetchTasks = async () => {
      try {
        const response = await getTasks();
        setTasks(response.data);
      } catch (err) {
        toast.error('Failed to fetch tasks.');
      } finally {
        setLoading(false);
      }
    };
    setTimeout(fetchTasks, 500);
  }, []);

  const filteredAndSortedTasks = useMemo(() => {
    const priorityValues = { High: 3, Medium: 2, Low: 1 };
    let processedTasks = tasks
      .filter(task => { if (statusFilter === 'All') return true; return task.status === statusFilter; })
      .filter(task => {
        const term = searchTerm.toLowerCase();
        return (task.title.toLowerCase().includes(term) || (task.description && task.description.toLowerCase().includes(term)));
      });

    switch (sortOption) {
      case 'dueDate-asc':
        processedTasks.sort((a, b) => (a.dueDate && b.dueDate) ? new Date(a.dueDate) - new Date(b.dueDate) : a.dueDate ? -1 : 1);
        break;
      case 'priority-desc':
        processedTasks.sort((a, b) => (priorityValues[b.priority] || 0) - (priorityValues[a.priority] || 0));
        break;
      default:
        processedTasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
    }
    return processedTasks;
  }, [tasks, searchTerm, statusFilter, sortOption]);

  const openEditModal = (task) => { setCurrentTask(task); setIsEditModalOpen(true); };
  const closeEditModal = () => { setCurrentTask(null); setIsEditModalOpen(false); };
  const openConfirmModal = (taskId) => { setTaskToDelete(taskId); setIsConfirmModalOpen(true); };
  const closeConfirmModal = () => { setTaskToDelete(null); setIsConfirmModalOpen(false); };

  const confirmDeleteTask = async () => {
    if (!taskToDelete) return;
    try {
      await deleteTask(taskToDelete);
      setTasks(tasks.filter((task) => task._id !== taskToDelete));
      toast.success('Task deleted successfully!');
      closeConfirmModal();
    } catch (err) { toast.error('Failed to delete task.'); closeConfirmModal(); }
  };

  const deleteTaskFromState = (idToDelete) => { openConfirmModal(idToDelete); };

  const handleGetSuggestions = async () => {
    const pendingTasks = tasks.filter(t => t.status === 'Pending');
    if (pendingTasks.length === 0) { return toast.error('No pending tasks to analyze!'); }
    setIsSuggestionLoading(true);
    try {
      const response = await getSuggestions(pendingTasks);
      setSuggestions(response.data.suggestions);
      toast.success('AI suggestions generated!');
    } catch (err) { toast.error('Failed to get AI suggestions.'); }
    finally { setIsSuggestionLoading(false); }
  };

  const clearSuggestions = () => setSuggestions([]);

  const saveTaskChanges = async (id, updatedData) => {
    try {
      const response = await updateTask(id, updatedData);
      setTasks(tasks.map((task) => (task._id === id ? response.data : task)));
      toast.success('Task updated successfully!');
      closeEditModal();
    } catch (err) { toast.error('Failed to update task.'); }
  };

  const addTask = async (taskData) => {
    try {
      const response = await createTask(taskData);
      setTasks([...tasks, response.data]);
      toast.success('Task created successfully!');
    } catch (err) { toast.error('Failed to add task.'); }
  };

  const toggleTaskStatus = async (idToToggle) => {
    try {
      const task = tasks.find((t) => t._id === idToToggle);
      const newStatus = task.status === 'Completed' ? 'Pending' : 'Completed';
      const response = await updateTask(idToToggle, { status: newStatus });
      setTasks(tasks.map((t) => (t._id === idToToggle ? response.data : t)));
      toast.success('Task status updated!');
    } catch (err) { toast.error('Failed to update task status.'); }
  };
  
  const dashboardProps = {
    tasks,
    filteredTasks: filteredAndSortedTasks,
    loading,
    suggestions,
    isSuggestionLoading,
    handleGetSuggestions,
    clearSuggestions,
    addTask,
    deleteTaskFromState,
    toggleTaskStatus,
    openEditModal,
    searchTerm,
    setSearchTerm,
    setStatusFilter,
    setSortOption
  };

  return (
    <>
      <MainLayout>
        <Routes>
            <Route index element={<DashboardPage {...dashboardProps} />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="settings" element={<SettingsPage />} />
        </Routes>
      </MainLayout>
      {isEditModalOpen && <EditTaskModal task={currentTask} onSave={saveTaskChanges} onClose={closeEditModal} />}
      <ConfirmationModal isOpen={isConfirmModalOpen} onClose={closeConfirmModal} onConfirm={confirmDeleteTask} title="Delete Task" message="Are you sure you want to permanently delete this task?" />
    </>
  );
};

function App() {
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (user) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [user]);

   const ProtectedRoute = ({ children }) => {
    // If user is not authenticated, redirect to the landing page, not the login page.
    return isAuthenticated ? children : <Navigate to="/" />;
  };
  
  const PublicRoute = ({ children }) => {
    return isAuthenticated ? <Navigate to="/app" /> : children;
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/app/*" element={<ProtectedRoute><AppLayout /></ProtectedRoute>} />
        <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
        <Route path="/" element={<PublicRoute><LandingPage /></PublicRoute>} />
        <Route path="*" element={<Navigate to={isAuthenticated ? "/app" : "/"} />} />
      </Routes>
    </>
  );
}

export default App;

