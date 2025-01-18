import { useState, useEffect } from 'react';
import RevenueChart from './charts/RevenueChart';
import SalesChart from './charts/SalesChart';
import CustomerSegments from './charts/CustomerSegments';
import KPICard from './charts/KPICard';
import DateRangePicker from './DateRangePicker';
import { useWidgetConfig } from '../hooks/useWidgetConfig';
import { KPIData } from '../types';

const Dashboard = () => {
  const [dateRange, setDateRange] = useState(() => {
    const saved = localStorage.getItem('dashboardDateRange');
    return saved ? JSON.parse(saved) : { start: '', end: '' };
  });
  
  const [loading, setLoading] = useState(true);
  const { widgets, updateWidgetPosition } = useWidgetConfig();

  // Persist date range to localStorage
  useEffect(() => {
    localStorage.setItem('dashboardDateRange', JSON.stringify(dateRange));
  }, [dateRange]);

  const kpiData: KPIData[] = [
    { label: 'Total Revenue', value: 150000, change: 12.5, changeType: 'increase' },
    { label: 'Total Sales', value: 2500, change: -5.2, changeType: 'decrease' },
    { label: 'Active Customers', value: 1200, change: 8.7, changeType: 'increase' },
    { label: 'Average Order Value', value: 75, change: 3.2, changeType: 'increase' },
  ];

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Load user preferences from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
  }, []);

  const renderWidget = (widgetType: string) => {
    switch (widgetType) {
      case 'revenue':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Revenue Trends</h2>
            <RevenueChart />
          </div>
        );
      case 'sales':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Sales Performance</h2>
            <SalesChart />
          </div>
        );
      case 'customers':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Customer Segments</h2>
            <CustomerSegments />
          </div>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
        <DateRangePicker onChange={setDateRange} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {kpiData.map((kpi) => (
          <KPICard key={kpi.label} data={kpi} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {widgets
          .sort((a, b) => a.position - b.position)
          .map((widget) => (
            <div
              key={widget.id}
              draggable
              onDragStart={(e) => e.dataTransfer.setData('widgetId', widget.id)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const draggedId = e.dataTransfer.getData('widgetId');
                const dropPosition = widget.position;
                updateWidgetPosition(draggedId, dropPosition);
              }}
            >
              {renderWidget(widget.type)}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;