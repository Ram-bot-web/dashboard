import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { CustomerSegment } from '../../types';

const CustomerSegments = () => {
  const data: CustomerSegment[] = [
    { segment: 'Enterprise', value: 400 },
    { segment: 'SMB', value: 300 },
    { segment: 'Consumer', value: 300 },
    { segment: 'Government', value: 200 },
  ];

  const COLORS = ['#0ea5e9', '#9333ea', '#22c55e', '#f59e0b'];

  return (
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
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomerSegments;