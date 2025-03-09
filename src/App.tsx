
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LiveClasses from "./pages/LiveClasses";
import AdminDashboard from "./pages/AdminDashboard";
import BatchContent from "./pages/BatchContent";
import PracticePartner from "./pages/PracticePartner";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/live-classes" element={<LiveClasses />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/batches" element={<BatchContent />} />
          <Route path="/practice-partner" element={<PracticePartner />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />}/>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
