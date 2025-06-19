import { useState } from 'react';
import { Calendar, CalendarCheck } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

export interface DateRange {
  from: Date;
  to: Date;
}

export interface FilterState {
  dateRange: DateRange;
  region: string;
}

interface DashboardFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  regions: string[];
  isLoading?: boolean;
}

const DashboardFilters = ({ filters, onFiltersChange, regions, isLoading }: DashboardFiltersProps) => {
  const [isDateOpen, setIsDateOpen] = useState(false);

  const handleDateRangeChange = (range: { from?: Date; to?: Date }) => {
    if (range.from && range.to) {
      onFiltersChange({
        ...filters,
        dateRange: { from: range.from, to: range.to }
      });
      setIsDateOpen(false);
    }
  };

  const handleRegionChange = (region: string) => {
    onFiltersChange({
      ...filters,
      region
    });
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 mb-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Filters</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">Customize your dashboard view</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          {/* Date Range Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Date Range</label>
            <Popover open={isDateOpen} onOpenChange={setIsDateOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full sm:w-[280px] justify-start text-left font-normal",
                    !filters.dateRange && "text-muted-foreground"
                  )}
                  disabled={isLoading}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {filters.dateRange?.from ? (
                    filters.dateRange.to ? (
                      <>
                        {format(filters.dateRange.from, "LLL dd, y")} -{" "}
                        {format(filters.dateRange.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(filters.dateRange.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700" align="start">
                <CalendarComponent
                  initialFocus
                  mode="range"
                  defaultMonth={filters.dateRange?.from}
                  selected={{ from: filters.dateRange?.from, to: filters.dateRange?.to }}
                  onSelect={handleDateRangeChange}
                  numberOfMonths={2}
                  className="rounded-md border-0"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Region Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Region</label>
            <Select value={filters.region} onValueChange={handleRegionChange} disabled={isLoading}>
              <SelectTrigger className="w-full sm:w-[180px] bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 z-50">
                {regions.map((region) => (
                  <SelectItem key={region} value={region} className="hover:bg-slate-100 dark:hover:bg-slate-700">
                    {region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2 pt-6 sm:pt-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const today = new Date();
                const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
                onFiltersChange({
                  ...filters,
                  dateRange: { from: lastWeek, to: today }
                });
              }}
              disabled={isLoading}
              className="text-xs"
            >
              Last 7 days
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const today = new Date();
                const lastMonth = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
                onFiltersChange({
                  ...filters,
                  dateRange: { from: lastMonth, to: today }
                });
              }}
              disabled={isLoading}
              className="text-xs"
            >
              Last 30 days
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardFilters;