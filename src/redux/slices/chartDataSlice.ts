import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RevenueData {
  date: string;
  value: number;
  expenses: number;
  dateRange: string;
}

interface SalesData {
  month: string;
  target: number;
  actual: number;
  dateRange: string;
}

interface CustomerData {
  segment: string;
  value: number;
  dateRange: string;
}

interface ChartDataState {
  salesData: SalesData[];
  revenueData: RevenueData[];
  customerData: CustomerData[];
  originalSalesData: SalesData[];
  originalRevenueData: RevenueData[];
  originalCustomerData: CustomerData[];
}

const initialState: ChartDataState = {
  salesData: [
    { month: 'Dec W1', target: 3800, actual: 3750, dateRange: '2024-12-07' },
    { month: 'Dec W2', target: 3900, actual: 3840, dateRange: '2024-12-14' },
    { month: 'Dec W3', target: 3700, actual: 3900, dateRange: '2024-12-21' },
    { month: 'Dec W4', target: 4000, actual: 4100, dateRange: '2024-12-28' },
    { month: 'Jan W1', target: 3600, actual: 3500, dateRange: '2025-01-07' },
    { month: 'Jan W2', target: 3700, actual: 3800, dateRange: '2025-01-14' },
    { month: 'Jan W3', target: 3800, actual: 3750, dateRange: '2025-01-20' }, // Current date    
    { month: 'Nov', target: 3300, actual: 3100, dateRange: '2024-11-14' },
    { month: 'Oct', target: 2800, actual: 2900, dateRange: '2024-10-22' },
    { month: 'Sep', target: 3200, actual: 3500, dateRange: '2024-09-18' },
    { month: 'Aug', target: 2890, actual: 2700, dateRange: '2024-08-20' },
    { month: 'Jul', target: 3490, actual: 3200, dateRange: '2024-07-15' }
  ],
  revenueData: [
    { date: 'Dec W1', value: 3800, expenses: 2900, dateRange: '2024-12-07' },
    { date: 'Dec W2', value: 3900, expenses: 3000, dateRange: '2024-12-14' },
    { date: 'Dec W3', value: 4100, expenses: 3100, dateRange: '2024-12-21' },
    { date: 'Dec W4', value: 4200, expenses: 3200, dateRange: '2024-12-28' },    
    { date: 'Jan W1', value: 3700, expenses: 2800, dateRange: '2025-01-07' },
    { date: 'Jan W2', value: 3900, expenses: 2900, dateRange: '2025-01-14' },
    { date: 'Jan W3', value: 4000, expenses: 3000, dateRange: '2025-01-20' }, // Current date    
    { date: 'Nov', value: 3300, expenses: 3600, dateRange: '2024-11-14' },
    { date: 'Oct', value: 2800, expenses: 3400, dateRange: '2024-10-22' },
    { date: 'Sep', value: 3200, expenses: 3900, dateRange: '2024-09-18' },
    { date: 'Aug', value: 2890, expenses: 3700, dateRange: '2024-08-20' },
    { date: 'Jul', value: 3490, expenses: 4200, dateRange: '2024-07-15' }
  ],
  customerData: [
    { segment: 'Enterprise', value: 480, dateRange: '2024-12-07' },
    { segment: 'SMB', value: 390, dateRange: '2024-12-14' },
    { segment: 'Consumer', value: 350, dateRange: '2024-12-21' },
    { segment: 'Government', value: 290, dateRange: '2024-12-28' },    
    { segment: 'Enterprise', value: 495, dateRange: '2025-01-07' },
    { segment: 'SMB', value: 405, dateRange: '2025-01-14' },
    { segment: 'Consumer', value: 365, dateRange: '2025-01-20' }, // Current date
    { segment: 'Government', value: 300, dateRange: '2025-01-20' }, // Current date    
    { segment: 'Enterprise', value: 470, dateRange: '2024-11-14' },
    { segment: 'SMB', value: 380, dateRange: '2024-10-22' },
    { segment: 'Consumer', value: 340, dateRange: '2024-09-18' },
    { segment: 'Government', value: 280, dateRange: '2024-08-20' }
  ],
  originalSalesData: [],    
  originalRevenueData: [],  
  originalCustomerData: []  
};

// ... rest of the slice code remains the same ...

const chartDataSlice = createSlice({
  name: 'chartData',
  initialState,
  reducers: {
    setSalesData(state, action: PayloadAction<SalesData[]>) {
      state.salesData = action.payload;
    },
    setRevenueData(state, action: PayloadAction<RevenueData[]>) {
      state.revenueData = action.payload;
    },
    setCustomerData(state, action: PayloadAction<CustomerData[]>) {
      state.customerData = action.payload;
    },
    filterDataByDateRange(
      state,
      action: PayloadAction<{ start: string; end: string }>
    ) {
      const { start, end } = action.payload;

      // Filter sales data
      state.salesData = state.originalSalesData.filter(item => {
        const itemDate = new Date(item.dateRange);
        return itemDate >= new Date(start) && itemDate <= new Date(end);
      });

      // Filter revenue data
      state.revenueData = state.originalRevenueData.filter(item => {
        const itemDate = new Date(item.dateRange);
        return itemDate >= new Date(start) && itemDate <= new Date(end);
      });

      // Filter customer data
      state.customerData = state.originalCustomerData.filter(item => {
        const itemDate = new Date(item.dateRange);
        return itemDate >= new Date(start) && itemDate <= new Date(end);
      });
    },
    resetData(state) {
      state.salesData = state.originalSalesData;
      state.revenueData = state.originalRevenueData;
      state.customerData = state.originalCustomerData;
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => action.type === '@@INIT',
      (state) => {
        // Initialize original data on store creation
        state.originalSalesData = [...state.salesData];
        state.originalRevenueData = [...state.revenueData];
        state.originalCustomerData = [...state.customerData];
      }
    );
  }
});

export const {
  setSalesData,
  setRevenueData,
  setCustomerData,
  filterDataByDateRange,
  resetData
} = chartDataSlice.actions;

export default chartDataSlice.reducer;