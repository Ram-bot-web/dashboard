import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { SalesData } from '../../types';

const SalesChart = () => {
  const data: SalesData[] = [
    { month: 'Jan', target: 4000, actual: 2400 },
    { month: 'Feb', target: 3000, actual: 3200 },
    { month: 'Mar', target: 2000, actual: 2800 },
    { month: 'Apr', target: 2780, actual: 3908 },
    { month: 'May', target: 1890, actual: 2300 },
    { month: 'Jun', target: 2390, actual: 2500 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="target" fill="#9333ea" name="Target" />
        <Bar dataKey="actual" fill="#0ea5e9" name="Actual" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SalesChart;