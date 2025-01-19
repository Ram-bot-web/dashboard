import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import { Download } from 'lucide-react';

const SalesChart = () => {
  const data = useSelector((state: RootState) => state.chartData.salesData);

  const exportToExcel = () => {
    // Convert data to CSV format
    const headers = ['Month', 'Target', 'Actual'];
    const csvContent = [
      headers.join(','),
      ...data.map(row => [
        row.month,
        row.target,
        row.actual
      ].join(','))
    ].join('\n');

    // Create and download the file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'sales_data.csv');
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
    </div>
  );
};

export default SalesChart;