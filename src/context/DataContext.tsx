import React, { createContext, useContext, useReducer, useEffect } from "react";
import { RevenueData, SalesData, CustomerSegment, KPIData } from "../types";
import { format, subDays, isWithinInterval, parseISO } from "date-fns";

interface DataState {
  revenue: RevenueData[];
  sales: SalesData[];
  customers: CustomerSegment[];
  kpis: KPIData[];
  dateRange: { start: string; end: string };
  loading: boolean;
  error: string | null;
}

type DataAction =
  | { type: "SET_DATE_RANGE"; payload: { start: string; end: string } }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string }
  | { type: "UPDATE_DATA"; payload: Partial<DataState> }
  | { type: "REAL_TIME_UPDATE"; payload: Partial<DataState> };

const initialState: DataState = {
  revenue: [
    { date: "Jan", value: 4000, expenses: 2400 },
    { date: "Feb", value: 3000, expenses: 1398 },
    { date: "Mar", value: 2000, expenses: 9800 },
    { date: "Apr", value: 2780, expenses: 3908 },
    { date: "May", value: 1890, expenses: 4800 },
    { date: "Jun", value: 2390, expenses: 3800 },
  ],
  sales: [],
  customers: [],
  kpis: [],
  dateRange: {
    start: format(subDays(new Date(), 30), "yyyy-MM-dd"),
    end: format(new Date(), "yyyy-MM-dd"),
  },
  loading: false,
  error: null,
};

const DataContext = createContext<{
  state: DataState;
  dispatch: React.Dispatch<DataAction>;
  exportData: () => void;
}>({
  state: initialState,
  dispatch: () => null,
  exportData: () => null,
});

function dataReducer(state: DataState, action: DataAction): DataState {
  switch (action.type) {
    case "SET_DATE_RANGE":
      return { ...state, dateRange: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "UPDATE_DATA":
      return { ...state, ...action.payload };
    case "REAL_TIME_UPDATE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  // Simulate data fetching based on date range
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "SET_LOADING", payload: true });
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const newData = generateDataForDateRange(state.dateRange);
        dispatch({ type: "UPDATE_DATA", payload: newData });
      } catch (error) {
        dispatch({ type: "SET_ERROR", payload: "Failed to fetch data" });
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    fetchData();
  }, [state.dateRange]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      const realtimeUpdate = generateRealtimeUpdate();
      dispatch({ type: "REAL_TIME_UPDATE", payload: realtimeUpdate });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const exportData = () => {
    const dataToExport = {
      revenue: state.revenue,
      sales: state.sales,
      customers: state.customers,
      kpis: state.kpis,
      dateRange: state.dateRange,
    };

    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `dashboard-data-${format(new Date(), "yyyy-MM-dd")}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <DataContext.Provider value={{ state, dispatch, exportData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);

// Helper functions for generating mock data
function generateDataForDateRange({
  start,
  end,
}: {
  start: string;
  end: string;
}) {
  // Generate mock data based on date range
  const startDate = parseISO(start);
  const endDate = parseISO(end);
  const days = Math.floor(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  return {
    revenue: Array.from({ length: days }, (_, i) => ({
      date: format(addDays(startDate, i), "yyyy-MM-dd"),
      value: Math.floor(Math.random() * 10000) + 5000,
      expenses: Math.floor(Math.random() * 5000) + 2000,
    })),
    // ... generate other mock data
  };
}

function generateRealtimeUpdate() {
  // Generate small random updates for real-time simulation
  return {
    kpis: [
      // Updated KPI data
    ],
  };
}
