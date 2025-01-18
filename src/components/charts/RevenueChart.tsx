import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { RevenueData } from '../../types';

const RevenueChart = () => {
  const data: RevenueData[] = [
    { date: 'Jan', value: 4000, expenses: 2400 },
    { date: 'Feb', value: 3000, expenses: 1398 },
    { date: 'Mar', value: 2000, expenses: 9800 },
    { date: 'Apr', value: 2780, expenses: 3908 },
    { date: 'May', value: 1890, expenses: 4800 },
    { date: 'Jun', value: 2390, expenses: 3800 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#0ea5e9" name="Revenue" />
        <Line type="monotone" dataKey="expenses" stroke="#ef4444" name="Expenses" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default RevenueChart;