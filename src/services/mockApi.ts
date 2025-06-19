// Mock API service for dashboard data
export interface FilterParams {
  dateRange: {
    from: string;
    to: string;
  };
  region: string;
}

export interface KPIData {
  title: string;
  value: string;
  previousValue: string;
  trend: 'up' | 'down';
  trendValue: string;
  icon: string;
}

export interface ChartData {
  name: string;
  data: any[];
}

export interface TableData {
  headers: string[];
  rows: any[];
}

// Mock API endpoints
export const mockApi = {
  // Filter options
  getRegions: async (): Promise<string[]> => {
    await delay(300);
    return ['North', 'South', 'East', 'West', 'All Regions'];
  },

  // Fleet Dashboard APIs
  fleet: {
    getKPIs: async (filters: FilterParams): Promise<KPIData[]> => {
      await delay(500);
      return [
        {
          title: "Total Fleet Vehicles",
          value: "1,247",
          previousValue: "1,205",
          trend: "up",
          trendValue: "+3.5%",
          icon: "Truck"
        },
        {
          title: "Active Vehicles",
          value: "892",
          previousValue: "856",
          trend: "up",
          trendValue: "+4.2%",
          icon: "Activity"
        },
        {
          title: "Maintenance Rate",
          value: "8.3%",
          previousValue: "9.1%",
          trend: "down",
          trendValue: "-0.8%",
          icon: "Wrench"
        },
        {
          title: "Avg. Uptime",
          value: "94.2%",
          previousValue: "92.8%",
          trend: "up",
          trendValue: "+1.4%",
          icon: "Clock"
        },
        {
          title: "Utilization",
          value: "87.5%",
          previousValue: "85.2%",
          trend: "up",
          trendValue: "+2.3%",
          icon: "Target"
        }
      ];
    },

    getUtilizationChart: async (filters: FilterParams): Promise<ChartData> => {
      await delay(400);
      return {
        name: "Fleet Utilization Trend",
        data: [
          { month: 'Jan', utilization: 85 },
          { month: 'Feb', utilization: 88 },
          { month: 'Mar', utilization: 82 },
          { month: 'Apr', utilization: 90 },
          { month: 'May', utilization: 87 },
          { month: 'Jun', utilization: 92 },
        ]
      };
    },

    getVehicleTypesChart: async (filters: FilterParams): Promise<ChartData> => {
      await delay(400);
      return {
        name: "Vehicle Types Breakdown",
        data: [
          { name: 'Trucks', value: 40, color: '#2563EB' },
          { name: 'Vans', value: 25, color: '#10B981' },
          { name: 'Cars', value: 20, color: '#F59E0B' },
          { name: 'Motorcycles', value: 15, color: '#EF4444' },
        ]
      };
    },

    getMaintenanceChart: async (filters: FilterParams): Promise<ChartData> => {
      await delay(400);
      return {
        name: "Maintenance Costs vs Target",
        data: [
          { type: 'Engine', cost: 25000, target: 22000 },
          { type: 'Brakes', cost: 15000, target: 16000 },
          { type: 'Tires', cost: 12000, target: 13000 },
          { type: 'Transmission', cost: 8000, target: 9000 },
        ]
      };
    },

    getRegionalChart: async (filters: FilterParams): Promise<ChartData> => {
      await delay(400);
      return {
        name: "Regional Vehicle Activity",
        data: [
          { region: 'North', jan: 85, feb: 90, mar: 88 },
          { region: 'South', jan: 78, feb: 82, mar: 85 },
          { region: 'East', jan: 92, feb: 88, mar: 94 },
          { region: 'West', jan: 88, feb: 85, mar: 90 },
        ]
      };
    },

    getVehicleTable: async (filters: FilterParams): Promise<TableData> => {
      await delay(500);
      return {
        headers: ['Vehicle', 'Status', 'Uptime (%)', 'Maintenance Cost', 'Target vs Actual'],
        rows: [
          { vehicle: 'VIN001', status: 'Active', uptime: 93, cost: 15000, target: 90 },
          { vehicle: 'VIN002', status: 'Maintenance', uptime: 78, cost: 22000, target: 85 },
          { vehicle: 'VIN003', status: 'Active', uptime: 97, cost: 12000, target: 95 },
          { vehicle: 'VIN004', status: 'Idle', uptime: 65, cost: 18000, target: 80 },
        ]
      };
    }
  },

  // After Sales Dashboard APIs
  afterSales: {
    getKPIs: async (filters: FilterParams): Promise<KPIData[]> => {
      await delay(500);
      return [
        {
          title: "Service Revenue",
          value: "₹1.95M",
          previousValue: "₹1.78M",
          trend: "up",
          trendValue: "+9.6%",
          icon: "DollarSign"
        },
        {
          title: "Avg. Resolution Time",
          value: "8.5h",
          previousValue: "10.2h",
          trend: "down",
          trendValue: "-1.7h",
          icon: "Clock"
        },
        {
          title: "Open Tickets",
          value: "127",
          previousValue: "145",
          trend: "down",
          trendValue: "-12.4%",
          icon: "Ticket"
        },
        {
          title: "Profit Margin",
          value: "23.4%",
          previousValue: "21.8%",
          trend: "up",
          trendValue: "+1.6%",
          icon: "TrendingUp"
        },
        {
          title: "SLA Compliance",
          value: "89.2%",
          previousValue: "86.7%",
          trend: "up",
          trendValue: "+2.5%",
          icon: "CheckCircle"
        }
      ];
    },

    getRevenueChart: async (filters: FilterParams): Promise<ChartData> => {
      await delay(400);
      return {
        name: "Revenue Trend vs Target",
        data: [
          { month: 'Jan', revenue: 150000, target: 140000 },
          { month: 'Feb', revenue: 165000, target: 150000 },
          { month: 'Mar', revenue: 142000, target: 155000 },
          { month: 'Apr', revenue: 178000, target: 160000 },
          { month: 'May', revenue: 185000, target: 165000 },
          { month: 'Jun', revenue: 195000, target: 170000 },
        ]
      };
    },

    getTicketStatusChart: async (filters: FilterParams): Promise<ChartData> => {
      await delay(400);
      return {
        name: "Ticket Status Distribution",
        data: [
          { name: 'Resolved', value: 65, color: '#10B981' },
          { name: 'In Progress', value: 25, color: '#F59E0B' },
          { name: 'Pending', value: 10, color: '#EF4444' },
        ]
      };
    },

    getCostByVehicleChart: async (filters: FilterParams): Promise<ChartData> => {
      await delay(400);
      return {
        name: "Service Costs by Vehicle Type",
        data: [
          { type: 'Trucks', cost: 45000, target: 42000 },
          { type: 'Vans', cost: 28000, target: 30000 },
          { type: 'Cars', cost: 18000, target: 20000 },
          { type: 'Motorcycles', cost: 8000, target: 10000 },
        ]
      };
    },

    getRegionalDowntimeChart: async (filters: FilterParams): Promise<ChartData> => {
      await delay(400);
      return {
        name: "Average Downtime by Region (Hours)",
        data: [
          { region: 'North', jan: 12, feb: 8, mar: 15 },
          { region: 'South', jan: 18, feb: 14, mar: 12 },
          { region: 'East', jan: 8, feb: 12, mar: 6 },
          { region: 'West', jan: 15, feb: 18, mar: 10 },
        ]
      };
    },

    getTicketsTable: async (filters: FilterParams): Promise<TableData> => {
      await delay(500);
      return {
        headers: ['Ticket ID', 'Status', 'Resolution Time', 'Profit', 'SLA Compliance'],
        rows: [
          { ticket: '#1023', status: 'Completed', resolution: '6h', profit: 2000, sla: 94 },
          { ticket: '#1024', status: 'In Progress', resolution: '12h', profit: 1500, sla: 78 },
          { ticket: '#1025', status: 'Completed', resolution: '4h', profit: 2500, sla: 98 },
          { ticket: '#1026', status: 'Pending', resolution: '24h', profit: 0, sla: 45 },
        ]
      };
    }
  },

  // Sales Dashboard APIs
  sales: {
    getKPIs: async (filters: FilterParams): Promise<KPIData[]> => {
      await delay(500);
      return [
        {
          title: "Total Sales",
          value: "₹3.45M",
          previousValue: "₹3.12M",
          trend: "up",
          trendValue: "+10.6%",
          icon: "DollarSign"
        },
        {
          title: "Avg. Deal Size",
          value: "₹125K",
          previousValue: "₹118K",
          trend: "up",
          trendValue: "+5.9%",
          icon: "Target"
        },
        {
          title: "Conversion Rate",
          value: "11.4%",
          previousValue: "10.8%",
          trend: "up",
          trendValue: "+0.6%",
          icon: "TrendingUp"
        },
        {
          title: "Lead to Sales",
          value: "8.7%",
          previousValue: "8.2%",
          trend: "up",
          trendValue: "+0.5%",
          icon: "Users"
        },
        {
          title: "Top Performer",
          value: "M. Patel",
          previousValue: "A. Verma",
          trend: "up",
          trendValue: "102%",
          icon: "Award"
        }
      ];
    },

    getSalesGrowthChart: async (filters: FilterParams): Promise<ChartData> => {
      await delay(400);
      return {
        name: "Sales Growth (YoY)",
        data: [
          { month: 'Jan', sales: 2400000, target: 2200000 },
          { month: 'Feb', sales: 2650000, target: 2400000 },
          { month: 'Mar', sales: 2380000, target: 2500000 },
          { month: 'Apr', sales: 2890000, target: 2600000 },
          { month: 'May', sales: 3120000, target: 2800000 },
          { month: 'Jun', sales: 3450000, target: 3000000 },
        ]
      };
    },

    getProductSalesChart: async (filters: FilterParams): Promise<ChartData> => {
      await delay(400);
      return {
        name: "Product-wise Sales Distribution",
        data: [
          { name: 'Trucks', value: 45, color: '#2563EB' },
          { name: 'Vans', value: 28, color: '#10B981' },
          { name: 'Cars', value: 18, color: '#F59E0B' },
          { name: 'Motorcycles', value: 9, color: '#EF4444' },
        ]
      };
    },

    getRegionSalesChart: async (filters: FilterParams): Promise<ChartData> => {
      await delay(400);
      return {
        name: "Sales by Region vs Target",
        data: [
          { region: 'North', sales: 850000, target: 800000 },
          { region: 'South', sales: 720000, target: 750000 },
          { region: 'East', sales: 950000, target: 900000 },
          { region: 'West', sales: 680000, target: 700000 },
        ]
      };
    },

    getConversionFunnelChart: async (filters: FilterParams): Promise<ChartData> => {
      await delay(400);
      return {
        name: "Lead to Sales Funnel",
        data: [
          { stage: 'Leads', jan: 1200, feb: 1350, mar: 1180 },
          { stage: 'Qualified', jan: 800, feb: 920, mar: 850 },
          { stage: 'Proposals', jan: 400, feb: 480, mar: 420 },
          { stage: 'Closed', jan: 120, feb: 145, mar: 135 },
        ]
      };
    },

    getSalesRepTable: async (filters: FilterParams): Promise<TableData> => {
      await delay(500);
      return {
        headers: ['Sales Rep', 'Deals Closed', 'Revenue', 'MoM Growth', 'Target Achievement'],
        rows: [
          { rep: 'A. Verma', deals: 25, revenue: 500000, growth: 12, target: 94 },
          { rep: 'R. Sharma', deals: 22, revenue: 480000, growth: 8, target: 88 },
          { rep: 'M. Patel', deals: 28, revenue: 620000, growth: 15, target: 102 },
          { rep: 'S. Kumar', deals: 18, revenue: 380000, growth: -3, target: 76 },
        ]
      };
    }
  }
};

// Helper function to simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));