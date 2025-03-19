import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LiveClasses from "./pages/LiveClasses";
import AdminDashboard from "./pages/AdminDashboard";
import BatchContent from "./pages/BatchContent";
import PracticePartner from "./pages/PracticePartner";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useEffect } from "react";
import { useAuthStore } from "./store/useAuthStore";

const queryClient = new QueryClient();

// ✅ Helper component to initialize navigation in Zustand
const InitAuthNavigation = () => {
  const navigate = useNavigate();
  const setNavigate = useAuthStore((state) => state.setNavigate);

  useEffect(() => {
    setNavigate(navigate);
  }, [navigate, setNavigate]);

  return null;
};

const App = () => {
  const googleClientId =
    "919259008575-rqhcrai07q87bc2v6fh4jd2kf405gk8h.apps.googleusercontent.com";

  if (!googleClientId) {
    console.error("⚠️ Missing GOOGLE_CLIENT_ID in environment file.");
  }

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          {/* ✅ UI Notifications */}
          <Toaster />
          <Sonner position="top-right" />
          
          <BrowserRouter>
            {/* ✅ Set up navigation for Zustand */}
            <InitAuthNavigation />
            
            <Routes>
              {/* ✅ Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/live-classes" element={<LiveClasses />} />
              <Route path="/batches" element={<BatchContent />} />
              <Route path="/practice-partner" element={<PracticePartner />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              
              {/* ✅ Admin Route (Can wrap with ProtectedRoute later) */}
              <Route path="/admin" element={<AdminDashboard />} />
              
              {/* ✅ Catch-all Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
};

export default App;