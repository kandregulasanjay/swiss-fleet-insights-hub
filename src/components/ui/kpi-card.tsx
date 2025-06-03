
import { ReactNode } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface KPICardProps {
  title: string;
  value: string | number;
  previousValue?: string | number;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  icon?: ReactNode;
  className?: string;
}

const KPICard = ({ 
  title, 
  value, 
  previousValue, 
  trend = 'neutral', 
  trendValue, 
  icon, 
  className 
}: KPICardProps) => {
  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-green-600 dark:text-green-400';
      case 'down':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-slate-600 dark:text-slate-400';
    }
  };

  return (
    <div className={cn(
      "bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all duration-200 animate-fade-in",
      className
    )}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-slate-600 dark:text-slate-300">{title}</h3>
        {icon && <div className="text-slate-400 dark:text-slate-500">{icon}</div>}
      </div>
      
      <div className="flex items-end justify-between">
        <div>
          <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
            {value}
          </div>
          {previousValue && (
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Previous: {previousValue}
            </div>
          )}
        </div>
        
        {trendValue && (
          <div className={cn("flex items-center space-x-1", getTrendColor())}>
            {trend === 'up' && <TrendingUp size={16} />}
            {trend === 'down' && <TrendingDown size={16} />}
            <span className="text-sm font-medium">{trendValue}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default KPICard;
