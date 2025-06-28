import { Calendar } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export interface FilterState {
  month: number;
  year: number;
}

interface DashboardFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  isLoading?: boolean;
}

const DashboardFilters = ({ filters, onFiltersChange, isLoading }: DashboardFiltersProps) => {
  const months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' }
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);

  const handleMonthChange = (month: string) => {
    onFiltersChange({
      ...filters,
      month: parseInt(month)
    });
  };

  const handleYearChange = (year: string) => {
    onFiltersChange({
      ...filters,
      year: parseInt(year)
    });
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 mb-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-slate-600 dark:text-slate-300" />
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Filters</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">Customize your dashboard view</p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          {/* Month Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Month</label>
            <Select value={filters.month.toString()} onValueChange={handleMonthChange} disabled={isLoading}>
              <SelectTrigger className="w-full sm:w-[140px] bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                <SelectValue placeholder="Select month" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 z-50">
                {months.map((month) => (
                  <SelectItem key={month.value} value={month.value.toString()} className="hover:bg-slate-100 dark:hover:bg-slate-700">
                    {month.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Year Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Year</label>
            <Select value={filters.year.toString()} onValueChange={handleYearChange} disabled={isLoading}>
              <SelectTrigger className="w-full sm:w-[100px] bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 z-50">
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()} className="hover:bg-slate-100 dark:hover:bg-slate-700">
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardFilters;