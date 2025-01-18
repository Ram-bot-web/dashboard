export interface ChartData {
    date: string;
    value: number;
  }
  
  export interface RevenueData extends ChartData {
    expenses: number;
  }
  
  export interface SalesData {
    month: string;
    target: number;
    actual: number;
  }
  
  export interface CustomerSegment {
    segment: string;
    value: number;
  }
  
  export interface KPIData {
    label: string;
    value: number;
    change: number;
    changeType: 'increase' | 'decrease';
  }
  
  export interface WidgetConfig {
    id: string;
    type: 'revenue' | 'sales' | 'customers' | 'kpi';
    position: number;
  }