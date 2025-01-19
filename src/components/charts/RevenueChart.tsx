import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useTheme } from '../../context/ThemeContext';
// import { button } from '@/components/ui/button';
import { Download } from 'lucide-react';

const RevenueChart = () => {
  const { colors } = useTheme();
  const data = useSelector((state: RootState) => state.chartData.revenueData);

  const exportToExcel = () => {
    // Convert data to CSV format
    const headers = ['Date', 'Revenue', 'Expenses'];
    const csvContent = [
      headers.join(','),
      ...data.map(row => [
        row.date,
        row.value,
        row.expenses
      ].join(','))
    ].join('\n');

    // Create and download the file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'revenue_data.csv');
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
          // variant="outline"
        >
          <Download className="w-4 h-4" />
        </button>
        {/* <button
          onClick={exportToPDF}
          className="flex items-center gap-2"
          // variant="outline"
        >
          <Download className="w-4 h-4" />
          Export PDF
        </button> */}
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={colors.text} opacity={0.1} />
          <XAxis 
            dataKey="date" 
            stroke={colors.text}
            tick={{ fill: colors.text }}
          />
          <YAxis 
            stroke={colors.text}
            tick={{ fill: colors.text }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: colors.background,
              borderColor: colors.text,
              color: colors.text
            }}
          />
          <Legend 
            wrapperStyle={{
              color: colors.text
            }}
          />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke={colors.chartPrimary} 
            name="Revenue"
            strokeWidth={2}
          />
          <Line 
            type="monotone" 
            dataKey="expenses" 
            stroke={colors.chartSecondary} 
            name="Expenses"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;