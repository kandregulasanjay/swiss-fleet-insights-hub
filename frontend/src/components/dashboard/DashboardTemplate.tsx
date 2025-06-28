import { useState } from 'react';
import { Truck, Activity, Wrench, Clock, Target, DollarSign, Ticket, TrendingUp, CheckCircle, Users, Award } from 'lucide-react';
import KPICard from '@/components/ui/kpi-card';
import DashboardFilters, { FilterState } from './DashboardFilters';
import { useDashboardData } from '@/hooks/useDashboardData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, AreaChart, Area } from 'recharts';
import { ChartData, TableRow } from '@/services/api';

// Icon mapping
const iconMap = {
  Truck,
  Activity,
  Wrench,
  Clock,
  Target,
  DollarSign,
  Ticket,
  TrendingUp,
  CheckCircle,
  Users,
  Award
};

interface DashboardTemplateProps {
  type: 'fleet' | 'afterSales' | 'sales';
  title: string;
  description: string;
}

const DashboardTemplate = ({ type, title, description }: DashboardTemplateProps) => {
  const currentDate = new Date();
  const [filters, setFilters] = useState<FilterState>({
    month: currentDate.getMonth() + 1,
    year: currentDate.getFullYear()
  });
  const [crossFilter, setCrossFilter] = useState<{ [key: string]: string | number } | null>(null);

  const filterParams = {
    month: filters.month,
    year: filters.year,
    ...crossFilter 
  };

  const { data, isLoading, error } = useDashboardData(type, filterParams);

  if (error) {
    return (
      <div className="space-y-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{title}</h1>
          <p className="text-slate-600 dark:text-slate-300">{description}</p>
        </div>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">Error Loading Data</h3>
          <p className="text-red-600 dark:text-red-300">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{title}</h1>
        <p className="text-slate-600 dark:text-slate-300">{description}</p>
      </div>

      {/* Filters */}
      <DashboardFilters
        filters={filters}
        onFiltersChange={setFilters}
        isLoading={isLoading}
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {data.kpis.map((kpi, index) => {
          const IconComponent = iconMap[kpi.icon as keyof typeof iconMap];
          return (
            <KPICard
              key={index}
              title={kpi.title}
              value={kpi.value}
              previousValue={kpi.previous_value}
              trend={kpi.trend}
              trendValue={kpi.trend_value}
              icon={IconComponent ? <IconComponent size={20} /> : <Activity size={20} />}
            />
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {data.charts.map((chart, index) => {
          const chartElement = renderChart(chart);
          return (
            <div key={index} className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">{chart.name}</h3>
              {isLoading ? (
                <div className="h-[300px] flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : !chart.data || chart.data.length === 0 ? (
                <div className="h-[300px] flex items-center justify-center flex-col">
                  <div className="text-slate-400 dark:text-slate-500 mb-2">No data available</div>
                  <div className="text-sm text-slate-400 dark:text-slate-500">Please check if data exists for the selected period</div>
                </div>
              ) : chartElement ? (
                <ResponsiveContainer width="100%" height={300}>
                  {chartElement}
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-slate-400 dark:text-slate-500">
                  Unsupported chart type
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Data Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          {type === 'fleet' ? 'Vehicle Performance Overview' : 
           type === 'afterSales' ? 'Service Tickets Overview' : 
           'Sales Team Performance'}
        </h3>
        {isLoading ? (
          <div className="h-32 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div
            className={`overflow-x-auto ${
              data.table.rows.length >= 10 ? 'max-h-96 overflow-y-auto' : ''
            }`}
          >
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  {data.table.headers.map((header, index) => (
                    <th key={index} className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-300">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.table.rows.map((row, rowIndex) => (
                  <tr key={rowIndex} className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700">
                    {renderTableRow(row, type, rowIndex)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper function to render different chart types
const renderChart = (chart: ChartData) => {
  switch (chart.chart_type) {
    case 'line':
      return (
        <LineChart data={chart.data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="data_point_name" stroke="#64748b" />
          <YAxis stroke="#64748b" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#ffffff', 
              border: '1px solid #e2e8f0',
              borderRadius: '8px'
            }} 
          />
          <Line 
            type="monotone" 
            dataKey="data_point_value"
            stroke="#2563EB" 
            strokeWidth={3}
            dot={{ fill: '#2563EB', strokeWidth: 2, r: 4 }}
          />
        </LineChart>
      );
    case 'pie':
      return (
        <PieChart>
          <Pie
            data={chart.data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={120}
            paddingAngle={5}
            dataKey="data_point_value"
          >
            {chart.data.map((entry, i) => (
              <Cell key={`cell-${i}`} fill={entry.color || '#2563EB'} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      );
    case 'bar':
      return (
        <BarChart data={chart.data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="data_point_name" stroke="#64748b" />
          <YAxis stroke="#64748b" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#ffffff', 
              border: '1px solid #e2e8f0',
              borderRadius: '8px'
            }} 
          />
          <Bar dataKey="data_point_value" fill="#2563EB" radius={[4, 4, 0, 0]} />
        </BarChart>
      );
    case 'area':
      return (
        <AreaChart data={chart.data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="data_point_name" stroke="#64748b" />
          <YAxis stroke="#64748b" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#ffffff', 
              border: '1px solid #e2e8f0',
              borderRadius: '8px'
            }} 
          />
          <Area type="monotone" dataKey="data_point_value" stackId="1" stroke="#2563EB" fill="#2563EB" fillOpacity={0.6} />
          {chart.data[0]?.additional_value !== undefined && (
            <Area type="monotone" dataKey="additional_value" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
          )}
        </AreaChart>
      );
    default:
      return null;
  }
};

// Helper function to render table rows based on dashboard type
const renderTableRow = (row: TableRow, type: string, index: number) => {
  const numericValue = (value: string | number) => typeof value === 'string' ? parseFloat(value) : value;
  const stringValue = (value: string | number) => value.toString();

  switch (type) {
    case 'fleet':
      return (
        <>
          <td className="py-4 px-4 text-slate-900 dark:text-white font-medium">{row['Vehicle']}</td>
          <td className="py-4 px-4">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              row['Status'] === 'Active' 
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                : row['Status'] === 'Maintenance'
                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
            }`}>
              {row['Status']}
            </span>
          </td>
          <td className="py-4 px-4">
            <div className="flex items-center space-x-2">
              <span className="text-slate-900 dark:text-white font-medium">{row['Uptime (%)']}</span>
              <div className="w-20 bg-slate-200 dark:bg-slate-600 rounded-full h-2">
                <div 
                  className="bg-secondary h-2 rounded-full" 
                  style={{ width: `${numericValue(row['Uptime (%)'])}%` }}
                ></div>
              </div>
            </div>
          </td>
          <td className="py-4 px-4 text-slate-900 dark:text-white">₹{numericValue(row['Maintenance Cost']).toLocaleString()}</td>
          <td className="py-4 px-4">
            <span className={`text-sm font-medium ${
              numericValue(row['Target vs Actual']) >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {numericValue(row['Target vs Actual']) >= 0 ? '✅' : '❌'} 
              {numericValue(row['Target vs Actual']) >= 0 ? '+' : ''}{row['Target vs Actual']}%
            </span>
          </td>
        </>
      );
    
    case 'afterSales':
      return (
        <>
          <td className="py-4 px-4 text-slate-900 dark:text-white font-medium">{row['Ticket ID']}</td>
          <td className="py-4 px-4">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              row['Status'] === 'Completed' 
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                : row['Status'] === 'In Progress'
                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
            }`}>
              {row['Status']}
            </span>
          </td>
          <td className="py-4 px-4 text-slate-900 dark:text-white">{row['Resolution Time']}</td>
          <td className="py-4 px-4">
            <span className={`font-medium ${numericValue(row['Profit']) > 0 ? 'text-green-600' : 'text-gray-500'}`}>
              {numericValue(row['Profit']) > 0 ? `₹${numericValue(row['Profit']).toLocaleString()}` : '-'}
            </span>
          </td>
          <td className="py-4 px-4">
            <div className="flex items-center space-x-2">
              <span className="text-slate-900 dark:text-white font-medium">{row['SLA Compliance']}%</span>
              <div className="w-16 bg-slate-200 dark:bg-slate-600 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${numericValue(row['SLA Compliance']) >= 90 ? 'bg-green-500' : numericValue(row['SLA Compliance']) >= 70 ? 'bg-yellow-500' : 'bg-red-500'}`}
                  style={{ width: `${numericValue(row['SLA Compliance'])}%` }}
                ></div>
              </div>
            </div>
          </td>
        </>
      );
    
    case 'sales':
      return (
        <>
          <td className="py-4 px-4">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-white text-sm font-medium">
                {stringValue(row['Sales Rep']).charAt(0)}
              </div>
              <span className="text-slate-900 dark:text-white font-medium">{row['Sales Rep']}</span>
            </div>
          </td>
          <td className="py-4 px-4 text-slate-900 dark:text-white font-medium">{row['Deals Closed']}</td>
          <td className="py-4 px-4 text-slate-900 dark:text-white">₹{(numericValue(row['Revenue'])/100000).toFixed(1)}L</td>
          <td className="py-4 px-4">
            <span className={`flex items-center space-x-1 font-medium ${
              numericValue(row['MoM Growth']) >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              <span>{numericValue(row['MoM Growth']) >= 0 ? '+' : ''}{row['MoM Growth']}%</span>
              {numericValue(row['MoM Growth']) >= 0 ? '↑' : '↓'}
            </span>
          </td>
          <td className="py-4 px-4">
            <div className="flex items-center space-x-2">
              <span className="text-slate-900 dark:text-white font-medium">{row['Target Achievement']}%</span>
              <div className="w-20 bg-slate-200 dark:bg-slate-600 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    numericValue(row['Target Achievement']) >= 100 ? 'bg-green-500' : numericValue(row['Target Achievement']) >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${Math.min(numericValue(row['Target Achievement']), 100)}%` }}
                ></div>
              </div>
              <span className="text-xs text-slate-500">
                {numericValue(row['Target Achievement']) >= 100 ? '🎯' : numericValue(row['Target Achievement']) >= 80 ? '📈' : '📉'}
              </span>
            </div>
          </td>
        </>
      );
    
    default:
      return null;
  }
};

export default DashboardTemplate;