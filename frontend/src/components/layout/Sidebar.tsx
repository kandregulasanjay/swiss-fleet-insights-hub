
import { Link, useLocation } from 'react-router-dom';
import { Truck, Wrench, TrendingUp, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const navigation = [
  { name: 'Fleet Dashboard', href: '/fleet', icon: Truck },
  { name: 'After-Sales', href: '/after-sales', icon: Wrench },
  { name: 'Sales Dashboard', href: '/sales', icon: TrendingUp },
];

const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
  const location = useLocation();

  return (
    <div className={cn(
      "bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 transition-all duration-300 ease-in-out",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
          {!collapsed && (
            <div className="text-xl font-bold text-primary dark:text-white">
              Vehicle Intel
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            {collapsed ? <Menu size={20} /> : <X size={20} />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4">
          <ul className="space-y-2 px-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href || 
                (location.pathname === '/' && item.href === '/fleet');
              const Icon = item.icon;
              
              return (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200",
                      isActive
                        ? "bg-secondary text-white shadow-lg"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white",
                      collapsed && "justify-center"
                    )}
                  >
                    <Icon className={cn("flex-shrink-0", collapsed ? "h-5 w-5" : "h-5 w-5 mr-3")} />
                    {!collapsed && <span>{item.name}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        {!collapsed && (
          <div className="p-4 border-t border-slate-200 dark:border-slate-700">
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Premium Swiss Design
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
