import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useEffect } from "react";
import { useAuthStore } from "./store/useAuthStore";

import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LiveClasses from "./pages/LiveClasses";
import AdminDashboard from "./pages/AdminDashboard";
import BatchContent from "./pages/BatchContent";
import PracticePartner from "./pages/PracticePartner";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import BatchDashboard from "./pages/BatchDashboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const queryClient = new QueryClient();

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
        <ThemeProvider attribute="class" defaultTheme="light">
          <TooltipProvider>
            {/* ✅ UI Notifications */}
            <Toaster />
            <Sonner position="top-right" />
            
            <BrowserRouter>
              <InitAuthNavigation />
              <Navbar />
              <Routes>
                {/* ✅ Public Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/live-classes" element={<LiveClasses />} />
                <Route path="/batches" element={<BatchContent />} />
                <Route path="/practice-partner" element={<PracticePartner />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/batch" element={<BatchDashboard />} />

                {/* ✅ Admin Route */}
                <Route path="/admin" element={<AdminDashboard />} />

                {/* ✅ Catch-all Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Footer />
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
