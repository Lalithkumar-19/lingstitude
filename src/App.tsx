import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";
import { addUser, adminToggle } from "./redux/userSlice";
import About from "./pages/About";
import Courses from "./pages/Courses";
import Pdfview from "./pages/Pdfview";
import VideoChat from "./pages/VideoChat";

const queryClient = new QueryClient();



const App = () => {
  const dispatch=useDispatch<AppDispatch>();
  const admin=useSelector((state:RootState)=>state.user.isAdmin);
  const isStudent=useSelector((state:RootState)=>state.user.enrolled_batch);

  useEffect(() => {
    const user=localStorage.getItem("User");
    const admin=localStorage.getItem("Admintoken");
    if(user){
      dispatch(addUser(JSON.parse(user)));
    }
    if(admin){
      dispatch(adminToggle(true));
    }
  }, []);
  

  

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <TooltipProvider>
            {/* UI Notifications */}
            <Toaster />
            <Sonner position="top-right" />
            
            <BrowserRouter>
              
              <Navbar />
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/live-classes" element={<LiveClasses />} />
                <Route path="/practice-partner" element={<PracticePartner />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
              <Route path="/viewpdf" element={<Pdfview />} />
              {isStudent&&
              
               <Route path="/batches" element={<BatchDashboard />} />
              
                 }
                 <Route path="/one-to-connect" element={<VideoChat/>}/>

                

                {/* Admin Route */}
                {admin&&
                <Route path="/admin" element={<AdminDashboard />} />
                }
                {/* Catch-all Route */}
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
