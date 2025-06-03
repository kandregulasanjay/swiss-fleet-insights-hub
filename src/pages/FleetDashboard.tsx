
import { Truck, Activity, Wrench, Clock, Target } from 'lucide-react';
import KPICard from '@/components/ui/kpi-card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, AreaChart, Area } from 'recharts';

const FleetDashboard = () => {
  // Mock data for charts
  const utilizationData = [
    { month: 'Jan', utilization: 85 },
    { month: 'Feb', utilization: 88 },
    { month: 'Mar', utilization: 82 },
    { month: 'Apr', utilization: 90 },
    { month: 'May', utilization: 87 },
    { month: 'Jun', utilization: 92 },
  ];

  const vehicleTypes = [
    { name: 'Trucks', value: 40, color: '#2563EB' },
    { name: 'Vans', value: 25, color: '#10B981' },
    { name: 'Cars', value: 20, color: '#F59E0B' },
    { name: 'Motorcycles', value: 15, color: '#EF4444' },
  ];

  const maintenanceCosts = [
    { type: 'Engine', cost: 25000, target: 22000 },
    { type: 'Brakes', cost: 15000, target: 16000 },
    { type: 'Tires', cost: 12000, target: 13000 },
    { type: 'Transmission', cost: 8000, target: 9000 },
  ];

  const regionActivity = [
    { region: 'North', jan: 85, feb: 90, mar: 88 },
    { region: 'South', jan: 78, feb: 82, mar: 85 },
    { region: 'East', jan: 92, feb: 88, mar: 94 },
    { region: 'West', jan: 88, feb: 85, mar: 90 },
  ];

  const vehicleData = [
    { vehicle: 'VIN001', status: 'Active', uptime: 93, cost: 15000, target: 90 },
    { vehicle: 'VIN002', status: 'Maintenance', uptime: 78, cost: 22000, target: 85 },
    { vehicle: 'VIN003', status: 'Active', uptime: 97, cost: 12000, target: 95 },
    { vehicle: 'VIN004', status: 'Idle', uptime: 65, cost: 18000, target: 80 },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Fleet Dashboard</h1>
        <p className="text-slate-600 dark:text-slate-300">Monitor and manage your vehicle fleet performance</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <KPICard
          title="Total Fleet Vehicles"
          value="1,247"
          previousValue="1,205"
          trend="up"
          trendValue="+3.5%"
          icon={<Truck size={20} />}
        />
        <KPICard
          title="Active Vehicles"
          value="892"
          previousValue="856"
          trend="up"
          trendValue="+4.2%"
          icon={<Activity size={20} />}
        />
        <KPICard
          title="Maintenance Rate"
          value="8.3%"
          previousValue="9.1%"
          trend="down"
          trendValue="-0.8%"
          icon={<Wrench size={20} />}
        />
        <KPICard
          title="Avg. Uptime"
          value="94.2%"
          previousValue="92.8%"
          trend="up"
          trendValue="+1.4%"
          icon={<Clock size={20} />}
        />
        <KPICard
          title="Utilization"
          value="87.5%"
          previousValue="85.2%"
          trend="up"
          trendValue="+2.3%"
          icon={<Target size={20} />}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fleet Utilization Trend */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Fleet Utilization Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={utilizationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" />
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
                dataKey="utilization" 
                stroke="#2563EB" 
                strokeWidth={3}
                dot={{ fill: '#2563EB', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Vehicle Types Breakdown */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Vehicle Types Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={vehicleTypes}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {vehicleTypes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {vehicleTypes.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  {item.name}: {item.value}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Maintenance Costs */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Maintenance Costs vs Target</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={maintenanceCosts}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="type" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px'
                }} 
              />
              <Bar dataKey="cost" fill="#2563EB" radius={[4, 4, 0, 0]} />
              <Bar dataKey="target" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Regional Activity */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Regional Vehicle Activity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={regionActivity}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="region" stroke="#64748b" />
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

      {/* Data Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Vehicle Performance Overview</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-300">Vehicle</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-300">Status</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-300">Uptime (%)</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-300">Maintenance Cost</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-300">Target vs Actual</th>
              </tr>
            </thead>
            <tbody>
              {vehicleData.map((vehicle, index) => (
                <tr key={index} className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700">
                  <td className="py-4 px-4 text-slate-900 dark:text-white font-medium">{vehicle.vehicle}</td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      vehicle.status === 'Active' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : vehicle.status === 'Maintenance'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                    }`}>
                      {vehicle.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-slate-900 dark:text-white font-medium">{vehicle.uptime}%</span>
                      <div className="w-20 bg-slate-200 dark:bg-slate-600 rounded-full h-2">
                        <div 
                          className="bg-secondary h-2 rounded-full" 
                          style={{ width: `${vehicle.uptime}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-slate-900 dark:text-white">₹{vehicle.cost.toLocaleString()}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm font-medium ${
                        vehicle.uptime >= vehicle.target ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {vehicle.uptime >= vehicle.target ? '✅' : '❌'} 
                        {vehicle.uptime >= vehicle.target ? '+' : ''}{vehicle.uptime - vehicle.target}%
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

export default FleetDashboard;
