import React, { useState, useEffect } from 'react';
import { getAnalytics } from '../services/api';
import toast from 'react-hot-toast';
import StatusPieChart from '../components/charts/StatusPieChart';
import PriorityBarChart from '../components/charts/PriorityBarChart';

// Helper component for the summary cards
const MetricCard = ({ title, value, color }) => (
  <div className={`p-6 rounded-lg text-white shadow-md ${color}`}>
    <p className="text-sm font-medium opacity-90">{title}</p>
    <p className="text-3xl font-bold mt-1">{value}</p>
  </div>
);

// Helper component to wrap charts in a nice box
const ChartContainer = ({ title, children }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-slate-700 mb-4">{title}</h3>
        {children}
    </div>
);

const AnalyticsPage = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await getAnalytics();
        setMetrics(response.data);
      } catch (error) {
        toast.error('Could not load analytics data.');
      } finally {
        setLoading(false);
      }
    };
    fetchMetrics();
  }, []);

  if (loading) {
    return <div className="p-6 text-center text-xl text-slate-500">Loading Analytics...</div>;
  }

  // Show a helpful message if there are no tasks yet
  if (!metrics || metrics.totalTasks === 0) {
    return (
      <div className="p-6 text-center bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Productivity Overview</h2>
        <p className="text-slate-600">Add some tasks to see your analytics dashboard!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-800">Productivity Dashboard</h1>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard title="Total Tasks" value={metrics.totalTasks} color="bg-blue-500" />
        <MetricCard title="Completion Rate" value={`${metrics.completionRate}%`} color="bg-green-500" />
        <MetricCard title="Tasks Pending" value={metrics.pendingTasks} color="bg-amber-500" />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer title="Task Status">
          <StatusPieChart data={metrics.statusBreakdown} />
        </ChartContainer>
        <ChartContainer title="Tasks by Priority">
          <PriorityBarChart data={metrics.priorityBreakdown} />
        </ChartContainer>
      </div>
      
    </div>
  );
};

export default AnalyticsPage;