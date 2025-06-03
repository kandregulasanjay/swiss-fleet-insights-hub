
import { DollarSign, Target, TrendingUp, Users, Award } from 'lucide-react';
import KPICard from '@/components/ui/kpi-card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, AreaChart, Area } from 'recharts';

const SalesDashboard = () => {
  // Mock data for charts
  const salesGrowthData = [
    { month: 'Jan', sales: 2400000, target: 2200000 },
    { month: 'Feb', sales: 2650000, target: 2400000 },
    { month: 'Mar', sales: 2380000, target: 2500000 },
    { month: 'Apr', sales: 2890000, target: 2600000 },
    { month: 'May', sales: 3120000, target: 2800000 },
    { month: 'Jun', sales: 3450000, target: 3000000 },
  ];

  const productSales = [
    { name: 'Trucks', value: 45, color: '#2563EB' },
    { name: 'Vans', value: 28, color: '#10B981' },
    { name: 'Cars', value: 18, color: '#F59E0B' },
    { name: 'Motorcycles', value: 9, color: '#EF4444' },
  ];

  const regionSales = [
    { region: 'North', sales: 850000, target: 800000 },
    { region: 'South', sales: 720000, target: 750000 },
    { region: 'East', sales: 950000, target: 900000 },
    { region: 'West', sales: 680000, target: 700000 },
  ];

  const conversionFunnel = [
    { stage: 'Leads', jan: 1200, feb: 1350, mar: 1180 },
    { stage: 'Qualified', jan: 800, feb: 920, mar: 850 },
    { stage: 'Proposals', jan: 400, feb: 480, mar: 420 },
    { stage: 'Closed', jan: 120, feb: 145, mar: 135 },
  ];

  const salesRepData = [
    { rep: 'A. Verma', deals: 25, revenue: 500000, growth: 12, target: 94 },
    { rep: 'R. Sharma', deals: 22, revenue: 480000, growth: 8, target: 88 },
    { rep: 'M. Patel', deals: 28, revenue: 620000, growth: 15, target: 102 },
    { rep: 'S. Kumar', deals: 18, revenue: 380000, growth: -3, target: 76 },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Sales Dashboard</h1>
        <p className="text-slate-600 dark:text-slate-300">Track sales performance and team productivity metrics</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <KPICard
          title="Total Sales"
          value="₹3.45M"
          previousValue="₹3.12M"
          trend="up"
          trendValue="+10.6%"
          icon={<DollarSign size={20} />}
        />
        <KPICard
          title="Avg. Deal Size"
          value="₹125K"
          previousValue="₹118K"
          trend="up"
          trendValue="+5.9%"
          icon={<Target size={20} />}
        />
        <KPICard
          title="Conversion Rate"
          value="11.4%"
          previousValue="10.8%"
          trend="up"
          trendValue="+0.6%"
          icon={<TrendingUp size={20} />}
        />
        <KPICard
          title="Lead to Sales"
          value="8.7%"
          previousValue="8.2%"
          trend="up"
          trendValue="+0.5%"
          icon={<Users size={20} />}
        />
        <KPICard
          title="Top Performer"
          value="M. Patel"
          previousValue="A. Verma"
          trend="up"
          trendValue="102%"
          icon={<Award size={20} />}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Growth Trend */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Sales Growth (YoY)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px'
                }} 
                formatter={(value: number) => [`₹${(value/1000000).toFixed(1)}M`, '']}
              />
              <Line 
                type="monotone" 
                dataKey="sales" 
                stroke="#2563EB" 
                strokeWidth={3}
                dot={{ fill: '#2563EB', strokeWidth: 2, r: 4 }}
                name="Actual Sales"
              />
              <Line 
                type="monotone" 
                dataKey="target" 
                stroke="#10B981" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: '#10B981', strokeWidth: 2, r: 3 }}
                name="Target"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Product-wise Sales */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Product-wise Sales Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={productSales}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {productSales.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, '']} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {productSales.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm text-slate-600 dark:text-slate-300">{item.name}</span>
                </div>
                <span className="text-sm font-medium text-slate-900 dark:text-white">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Regional Sales Performance */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Sales by Region vs Target</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={regionSales}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="region" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px'
                }} 
                formatter={(value: number) => [`₹${(value/1000).toFixed(0)}K`, '']}
              />
              <Bar dataKey="sales" fill="#2563EB" radius={[4, 4, 0, 0]} name="Actual Sales" />
              <Bar dataKey="target" fill="#10B981" radius={[4, 4, 0, 0]} name="Target" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Conversion Funnel */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Lead to Sales Funnel</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={conversionFunnel}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="stage" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px'
                }} 
              />
              <Area type="monotone" dataKey="jan" stackId="1" stroke="#2563EB" fill="#2563EB" fillOpacity={0.6} />
              <Area type="monotone" dataKey="feb" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
              <Area type="monotone" dataKey="mar" stackId="1" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Sales Team Leaderboard */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Sales Team Performance</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-300">Sales Rep</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-300">Deals Closed</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-300">Revenue</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-300">MoM Growth</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-300">Target Achievement</th>
              </tr>
            </thead>
            <tbody>
              {salesRepData.map((rep, index) => (
                <tr key={index} className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {rep.rep.charAt(0)}
                      </div>
                      <span className="text-slate-900 dark:text-white font-medium">{rep.rep}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-slate-900 dark:text-white font-medium">{rep.deals}</td>
                  <td className="py-4 px-4 text-slate-900 dark:text-white">₹{(rep.revenue/100000).toFixed(1)}L</td>
                  <td className="py-4 px-4">
                    <span className={`flex items-center space-x-1 font-medium ${
                      rep.growth >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      <span>{rep.growth >= 0 ? '+' : ''}{rep.growth}%</span>
                      {rep.growth >= 0 ? '↑' : '↓'}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-slate-900 dark:text-white font-medium">{rep.target}%</span>
                      <div className="w-20 bg-slate-200 dark:bg-slate-600 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            rep.target >= 100 ? 'bg-green-500' : rep.target >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${Math.min(rep.target, 100)}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-slate-500">
                        {rep.target >= 100 ? '🎯' : rep.target >= 80 ? '📈' : '📉'}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SalesDashboard;
