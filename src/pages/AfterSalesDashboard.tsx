
import { DollarSign, Clock, Ticket, TrendingUp, CheckCircle } from 'lucide-react';
import KPICard from '@/components/ui/kpi-card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, AreaChart, Area } from 'recharts';

const AfterSalesDashboard = () => {
  // Mock data for charts
  const revenueData = [
    { month: 'Jan', revenue: 150000, target: 140000 },
    { month: 'Feb', revenue: 165000, target: 150000 },
    { month: 'Mar', revenue: 142000, target: 155000 },
    { month: 'Apr', revenue: 178000, target: 160000 },
    { month: 'May', revenue: 185000, target: 165000 },
    { month: 'Jun', revenue: 195000, target: 170000 },
  ];

  const ticketStatus = [
    { name: 'Resolved', value: 65, color: '#10B981' },
    { name: 'In Progress', value: 25, color: '#F59E0B' },
    { name: 'Pending', value: 10, color: '#EF4444' },
  ];

  const costByVehicle = [
    { type: 'Trucks', cost: 45000, target: 42000 },
    { type: 'Vans', cost: 28000, target: 30000 },
    { type: 'Cars', cost: 18000, target: 20000 },
    { type: 'Motorcycles', cost: 8000, target: 10000 },
  ];

  const regionDowntime = [
    { region: 'North', jan: 12, feb: 8, mar: 15 },
    { region: 'South', jan: 18, feb: 14, mar: 12 },
    { region: 'East', jan: 8, feb: 12, mar: 6 },
    { region: 'West', jan: 15, feb: 18, mar: 10 },
  ];

  const ticketData = [
    { ticket: '#1023', status: 'Completed', resolution: '6h', profit: 2000, sla: 94 },
    { ticket: '#1024', status: 'In Progress', resolution: '12h', profit: 1500, sla: 78 },
    { ticket: '#1025', status: 'Completed', resolution: '4h', profit: 2500, sla: 98 },
    { ticket: '#1026', status: 'Pending', resolution: '24h', profit: 0, sla: 45 },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">After-Sales Dashboard</h1>
        <p className="text-slate-600 dark:text-slate-300">Monitor service performance and profitability metrics</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <KPICard
          title="Service Revenue"
          value="₹1.95M"
          previousValue="₹1.78M"
          trend="up"
          trendValue="+9.6%"
          icon={<DollarSign size={20} />}
        />
        <KPICard
          title="Avg. Resolution Time"
          value="8.5h"
          previousValue="10.2h"
          trend="down"
          trendValue="-1.7h"
          icon={<Clock size={20} />}
        />
        <KPICard
          title="Open Tickets"
          value="127"
          previousValue="145"
          trend="down"
          trendValue="-12.4%"
          icon={<Ticket size={20} />}
        />
        <KPICard
          title="Profit Margin"
          value="23.4%"
          previousValue="21.8%"
          trend="up"
          trendValue="+1.6%"
          icon={<TrendingUp size={20} />}
        />
        <KPICard
          title="SLA Compliance"
          value="89.2%"
          previousValue="86.7%"
          trend="up"
          trendValue="+2.5%"
          icon={<CheckCircle size={20} />}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Revenue Trend vs Target</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px'
                }} 
                formatter={(value: number) => [`₹${(value/1000).toFixed(0)}K`, '']}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#2563EB" 
                strokeWidth={3}
                dot={{ fill: '#2563EB', strokeWidth: 2, r: 4 }}
                name="Revenue"
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

        {/* Ticket Status Breakdown */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Ticket Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={ticketStatus}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {ticketStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, '']} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-1 gap-2 mt-4">
            {ticketStatus.map((item, index) => (
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

        {/* Service Costs by Vehicle Type */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Service Costs by Vehicle Type</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={costByVehicle}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="type" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px'
                }} 
                formatter={(value: number) => [`₹${(value/1000).toFixed(0)}K`, '']}
              />
              <Bar dataKey="cost" fill="#2563EB" radius={[4, 4, 0, 0]} name="Actual Cost" />
              <Bar dataKey="target" fill="#10B981" radius={[4, 4, 0, 0]} name="Target Cost" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Regional Downtime */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Average Downtime by Region (Hours)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={regionDowntime}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="region" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px'
                }} 
                formatter={(value) => [`${value}h`, '']}
              />
              <Area type="monotone" dataKey="jan" stackId="1" stroke="#2563EB" fill="#2563EB" fillOpacity={0.6} />
              <Area type="monotone" dataKey="feb" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
              <Area type="monotone" dataKey="mar" stackId="1" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Service Tickets Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Service Tickets Overview</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-300">Ticket ID</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-300">Status</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-300">Resolution Time</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-300">Profit</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-300">SLA Compliance</th>
              </tr>
            </thead>
            <tbody>
              {ticketData.map((ticket, index) => (
                <tr key={index} className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700">
                  <td className="py-4 px-4 text-slate-900 dark:text-white font-medium">{ticket.ticket}</td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      ticket.status === 'Completed' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : ticket.status === 'In Progress'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-slate-900 dark:text-white">{ticket.resolution}</td>
                  <td className="py-4 px-4">
                    <span className={`font-medium ${ticket.profit > 0 ? 'text-green-600' : 'text-gray-500'}`}>
                      {ticket.profit > 0 ? `₹${ticket.profit.toLocaleString()}` : '-'}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-slate-900 dark:text-white font-medium">{ticket.sla}%</span>
                      <div className="w-16 bg-slate-200 dark:bg-slate-600 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${ticket.sla >= 90 ? 'bg-green-500' : ticket.sla >= 70 ? 'bg-yellow-500' : 'bg-red-500'}`}
                          style={{ width: `${ticket.sla}%` }}
                        ></div>
                      </div>
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

export default AfterSalesDashboard;
