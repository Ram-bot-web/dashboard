import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import { Download } from 'lucide-react';

const CustomerSegments = () => {
  const data = useSelector((state: RootState) => state.chartData.customerData);
  const COLORS = ['#0ea5e9', '#9333ea', '#22c55e', '#f59e0b'];

  const exportToExcel = () => {
    // Convert data to CSV format
    const headers = ['Segment', 'Value'];
    const csvContent = [
      headers.join(','),
      ...data.map(row => [
        row.segment,
        row.value
      ].join(','))
    ].join('\n');

    // Create and download the file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'customer_segments.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 justify-end">
        <button
          onClick={exportToExcel}
          className="flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
        </button>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomerSegments;