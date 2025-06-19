import { useState, useEffect, useCallback, useMemo } from 'react';
import { mockApi, FilterParams, KPIData, ChartData, TableData } from '@/services/mockApi';

export interface DashboardData {
  kpis: KPIData[];
  charts: ChartData[];
  table: TableData;
}

export const useDashboardData = (dashboardType: 'fleet' | 'afterSales' | 'sales', filters: FilterParams) => {
  const [data, setData] = useState<DashboardData>({
    kpis: [],
    charts: [],
    table: { headers: [], rows: [] }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Memoize filter params to prevent unnecessary re-renders
  const memoizedFilters = useMemo(() => filters, [filters.month, filters.year]);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      let kpis: KPIData[] = [];
      let charts: ChartData[] = [];
      let table: TableData = { headers: [], rows: [] };

      switch (dashboardType) {
        case 'fleet':
          [kpis, charts[0], charts[1], charts[2], charts[3], table] = await Promise.all([
            mockApi.fleet.getKPIs(filters),
            mockApi.fleet.getUtilizationChart(filters),
            mockApi.fleet.getVehicleTypesChart(filters),
            mockApi.fleet.getMaintenanceChart(filters),
            mockApi.fleet.getRegionalChart(filters),
            mockApi.fleet.getVehicleTable(filters)
          ]);
          break;

        case 'afterSales':
          [kpis, charts[0], charts[1], charts[2], charts[3], table] = await Promise.all([
            mockApi.afterSales.getKPIs(filters),
            mockApi.afterSales.getRevenueChart(filters),
            mockApi.afterSales.getTicketStatusChart(filters),
            mockApi.afterSales.getCostByVehicleChart(filters),
            mockApi.afterSales.getRegionalDowntimeChart(filters),
            mockApi.afterSales.getTicketsTable(filters)
          ]);
          break;

        case 'sales':
          [kpis, charts[0], charts[1], charts[2], charts[3], table] = await Promise.all([
            mockApi.sales.getKPIs(filters),
            mockApi.sales.getSalesGrowthChart(filters),
            mockApi.sales.getProductSalesChart(filters),
            mockApi.sales.getRegionSalesChart(filters),
            mockApi.sales.getConversionFunnelChart(filters),
            mockApi.sales.getSalesRepTable(filters)
          ]);
          break;
      }

      setData({ kpis, charts, table });
    } catch (err) {
      setError('Failed to fetch dashboard data');
      console.error('Dashboard data fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [dashboardType, memoizedFilters]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchData
  };
};

// No longer need useRegions since we removed region filter