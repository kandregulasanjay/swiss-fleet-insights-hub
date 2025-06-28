
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import DashboardLayout from "@/components/layout/DashboardLayout";
import FleetDashboard from "@/pages/FleetDashboard";
import AfterSalesDashboard from "@/pages/AfterSalesDashboard";
import SalesDashboard from "@/pages/SalesDashboard";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DashboardLayout />}>
              <Route index element={<FleetDashboard />} />
              <Route path="/fleet" element={<FleetDashboard />} />
              <Route path="/after-sales" element={<AfterSalesDashboard />} />
              <Route path="/sales" element={<SalesDashboard />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
