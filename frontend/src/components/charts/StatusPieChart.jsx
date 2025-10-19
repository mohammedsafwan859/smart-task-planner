import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const StatusPieChart = ({ data }) => {
  // Check if there is any actual data to display
  const hasData = data && data.some(d => d.value > 0);

  if (!hasData) {
    return <p className="text-center text-slate-500 py-10">No task status data to display yet.</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          // We remove the label from here to avoid visual clutter
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `${value} tasks`} />
        {/* The legend clearly labels what each color represents */}
        <Legend /> 
      </PieChart>
    </ResponsiveContainer>
  );
};

export default StatusPieChart;

