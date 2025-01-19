import { useState, useEffect } from "react";
import RevenueChart from "./charts/RevenueChart";
import SalesChart from "./charts/SalesChart";
import CustomerSegments from "./charts/CustomerSegments";
import KPICard from "./charts/KPICard";
import DateRangePicker from "./DateRangePicker";
import SettingsModal from "./SettingsModal";
import { useWidgetConfig } from "../hooks/useWidgetConfig";
import { useTheme } from "../context/ThemeContext";
import { Settings } from "lucide-react";
import { KPIData } from "../types";

const Dashboard = () => {
  const { colors, isDarkMode } = useTheme();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [dateRange, setDateRange] = useState(() => {
    const saved = localStorage.getItem("dashboardDateRange");
    return saved ? JSON.parse(saved) : { start: "", end: "" };
  });

  const [loading, setLoading] = useState(true);
  const { widgets, updateWidgetPosition } = useWidgetConfig();

  const kpiData: KPIData[] = [
    {
      label: "Total Revenue",
      value: 150000,
      change: 12.5,
      changeType: "increase",
    },
    { label: "Total Sales", value: 2500, change: -5.2, changeType: "decrease" },
    {
      label: "Active Customers",
      value: 1200,
      change: 8.7,
      changeType: "increase",
    },
    {
      label: "Average Order Value",
      value: 75,
      change: 3.2,
      changeType: "increase",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem("dashboardDateRange", JSON.stringify(dateRange));
  }, [dateRange]);

  const renderWidget = (widgetType: string) => {
    const widgetClass = `rounded-lg shadow p-6 transition-colors duration-200 bg-white dark:bg-gray-800`;

    switch (widgetType) {
      case "revenue":
        return (
          <div
            className={widgetClass}
            style={{
              backgroundColor: isDarkMode ? "#1f2937" : colors.dashboard,
            }}
          >
            <h2
              className="text-lg font-semibold mb-4"
              style={{ color: colors.text }}
            >
              Revenue Trends
            </h2>
            <RevenueChart />
          </div>
        );
      case "sales":
        return (
          <div
            className={widgetClass}
            style={{
              backgroundColor: isDarkMode ? "#1f2937" : colors.dashboard,
            }}
          >
            <h2
              className="text-lg font-semibold mb-4"
              style={{ color: colors.text }}
            >
              Sales Performance
            </h2>
            <SalesChart />
          </div>
        );
      case "customers":
        return (
          <div
            className={widgetClass}
            style={{
              backgroundColor: isDarkMode ? "#1f2937" : colors.dashboard,
            }}
          >
            <h2
              className="text-lg font-semibold mb-4"
              style={{ color: colors.text }}
            >
              Customer Segments
            </h2>
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
        <div
          className="animate-spin rounded-full h-12 w-12 border-b-2"
          style={{ borderColor: colors.primary }}
        ></div>
      </div>
    );
  }

  return (
    <div
      className="p-6"
      style={{
        backgroundColor: isDarkMode ? "#111827" : colors.background,
        color: colors.text,
      }}
    >
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <div className="flex items-center gap-4">
          <DateRangePicker onChange={setDateRange} />
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="p-2 rounded-lg transition-colors hover:bg-opacity-10"
            style={{ backgroundColor: `${colors.primary}20` }}
          >
            <Settings className="w-5 h-5" style={{ color: colors.primary }} />
          </button>
        </div>
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
              onDragStart={(e) => e.dataTransfer.setData("widgetId", widget.id)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const draggedId = e.dataTransfer.getData("widgetId");
                const dropPosition = widget.position;
                updateWidgetPosition(draggedId, dropPosition);
              }}
              style={{
                boxShadow: isDarkMode
                  ? "4px 0 6px -1px rgba(0, 0, 0, 0.2), 2px 0 4px -1px rgba(0, 0, 0, 0.1)"
                  : "4px 0 6px -1px rgba(0, 0, 0, 0.1), 2px 0 4px -1px rgba(0, 0, 0, 0.06)",
              }}
            >
              {renderWidget(widget.type)}
            </div>
          ))}
      </div>

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
};

export default Dashboard;
