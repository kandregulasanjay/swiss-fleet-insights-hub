import axios from 'axios';

// Create axios instance with base configuration
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Types
export interface FilterParams {
  month: number;
  year: number;
}

export interface KPIData {
  id: number;
  title: string;
  value: number;
  previous_value: number;
  trend: 'up' | 'down';
  trend_value: string;
  icon: string;
  dashboard_type: 'fleet' | 'sales' | 'afterSales';
  month: number;
  year: number;
  created_at: string;
  updated_at: string;
}

export interface ChartDataPoint {
  data_point_name: string;
  data_point_value: number;
  additional_value?: number;
  color?: string;
}

export interface ChartData {
  name: string;
  chart_type: 'line' | 'pie' | 'bar' | 'area';
  data: ChartDataPoint[];
}

export interface TableData {
  headers: string[];
  rows: Record<string, string | number>[];
}

export type TableRow = Record<string, string | number>;

// API Functions
const api = {
  fleet: {
    getKPIs: async (filters: FilterParams): Promise<KPIData[]> => {
      const { data } = await axiosInstance.get('/fleet/kpis', { params: filters });
      return data;
    },

    getUtilizationChart: async (filters: FilterParams): Promise<ChartData> => {
      const { data } = await axiosInstance.get('/fleet/utilization-chart', { params: filters });
      return data;
    },

    getVehicleTypesChart: async (filters: FilterParams): Promise<ChartData> => {
      const { data } = await axiosInstance.get('/fleet/vehicle-types-chart', { params: filters });
      return data;
    },

    getMaintenanceChart: async (filters: FilterParams): Promise<ChartData> => {
      const { data } = await axiosInstance.get('/fleet/maintenance-chart', { params: filters });
      return data;
    },

    getRegionalChart: async (filters: FilterParams): Promise<ChartData> => {
      const { data } = await axiosInstance.get('/fleet/regional-chart', { params: filters });
      return data;
    },

    getVehicleTable: async (filters: FilterParams): Promise<TableData> => {
      const { data } = await axiosInstance.get('/fleet/vehicle-table', { params: filters });
      return data;
    }
  },

  afterSales: {
    getKPIs: async (filters: FilterParams): Promise<KPIData[]> => {
      const { data } = await axiosInstance.get('/after-sales/kpis', { params: filters });
      return data;
    },

    getRevenueChart: async (filters: FilterParams): Promise<ChartData> => {
      const { data } = await axiosInstance.get('/after-sales/revenue-chart', { params: filters });
      return data;
    },

    getTicketStatusChart: async (filters: FilterParams): Promise<ChartData> => {
      const { data } = await axiosInstance.get('/after-sales/ticket-status-chart', { params: filters });
      return data;
    },

    getCostByVehicleChart: async (filters: FilterParams): Promise<ChartData> => {
      const { data } = await axiosInstance.get('/after-sales/cost-by-vehicle-chart', { params: filters });
      return data;
    },

    getRegionalDowntimeChart: async (filters: FilterParams): Promise<ChartData> => {
      const { data } = await axiosInstance.get('/after-sales/regional-downtime-chart', { params: filters });
      return data;
    },

    getTicketsTable: async (filters: FilterParams): Promise<TableData> => {
      const { data } = await axiosInstance.get('/after-sales/tickets-table', { params: filters });
      return data;
    }
  },

  sales: {
    getKPIs: async (filters: FilterParams): Promise<KPIData[]> => {
      const { data } = await axiosInstance.get('/sales/kpis', { params: filters });
      return data;
    },

    getSalesGrowthChart: async (filters: FilterParams): Promise<ChartData> => {
      const { data } = await axiosInstance.get('/sales/growth-chart', { params: filters });
      return data;
    },

    getProductSalesChart: async (filters: FilterParams): Promise<ChartData> => {
      const { data } = await axiosInstance.get('/sales/product-chart', { params: filters });
      return data;
    },

    getRegionSalesChart: async (filters: FilterParams): Promise<ChartData> => {
      const { data } = await axiosInstance.get('/sales/region-chart', { params: filters });
      return data;
    },

    getConversionFunnelChart: async (filters: FilterParams): Promise<ChartData> => {
      const { data } = await axiosInstance.get('/sales/conversion-chart', { params: filters });
      return data;
    },

    getSalesRepTable: async (filters: FilterParams): Promise<TableData> => {
      const { data } = await axiosInstance.get('/sales/sales-rep-table', { params: filters });
      return data;
    }
  }
};

export default api;