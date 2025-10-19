import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const StatusPieChart = ({ data }) => {
  // Don't render the chart if there's no data
  if (!data || data.length === 0 || data.every(d => d.value === 0)) {
    return <p className="text-center text-slate-500">No status data to display.</p>;
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
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `${value} tasks`} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default StatusPieChart;