import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const PriorityBarChart = ({ data }) => {
  // Don't render if no data
  if (!data || data.length === 0) {
    return <p className="text-center text-slate-500">No priority data to display.</p>;
  }

  // Define colors for each priority
  const colorMap = {
    High: '#ef4444',   // Red
    Medium: '#f59e0b', // Amber
    Low: '#22c55e',    // Green
  };

  // Format the data from our API ({ _id: "High", count: 2 }) 
  // into what Recharts expects ({ name: "High", count: 2, color: ... })
  const formattedData = data.map(item => ({
    name: item._id,
    count: item.count,
    color: colorMap[item._id] || '#6b7280', // Default to gray
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={formattedData}
        margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="name" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="count">
          {formattedData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default PriorityBarChart;