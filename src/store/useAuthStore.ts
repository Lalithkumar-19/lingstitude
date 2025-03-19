/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "sonner";
import { NavigateFunction } from "react-router-dom";

// Define types for the state and actions
interface AuthUser {
  _id: string;
  email: string;
  fullName?: string;
}

interface AuthState {
  authUser: AuthUser | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;
  checkAuth: () => Promise<void>;
  signup: (data: { email: string; password: string; name?: string }) => Promise<void>;
  login: (data: { email: string; password: string; accountType?: "user" | "admin" }) => Promise<void>;
  logout: () => Promise<void>;
  googleLogin: (token: string) => Promise<void>;
  updateProfile: (data: Partial<AuthUser>) => Promise<void>;
  setNavigate: (nav: NavigateFunction) => void;
}

export const useAuthStore = create<AuthState>((set, get) => {
  // ✅ Navigate reference to be set dynamically
  let navigate: NavigateFunction | null = null;

  return {
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,

    // ✅ Set Navigate (Optional helper to pass navigate)
    setNavigate: (nav: NavigateFunction) => {
      navigate = nav;
    },

    // ✅ Check Authentication Status (Retrieve from localStorage)
    checkAuth: async () => {
      set({ isCheckingAuth: true });
      const token = localStorage.getItem("token");

      if (!token) {
        set({ authUser: null, isCheckingAuth: false });
        return;
      }

      try {
        const res = await axiosInstance.get("/auth/check", {
          headers: { Authorization: `Bearer ${token}` },
        });
        set({ authUser: res.data });
      } catch (error: any) {
        console.error("Error in checkAuth:", error);
        set({ authUser: null });
        localStorage.removeItem("token"); // Remove invalid token
      } finally {
        set({ isCheckingAuth: false });
      }
    },

    // ✅ Signup Function
    signup: async (data) => {
      set({ isSigningUp: true });
      try {
        const res = await axiosInstance.post("/auth/signup", data);
        set({ authUser: res.data });
        toast.success("Account created successfully");

        // Navigate to /login after successful signup
        if (navigate) navigate("/login");
      } catch (error: any) {
        console.error("Signup error:", error);
        toast.error(error?.response?.data?.message || "Signup failed");
      } finally {
        set({ isSigningUp: false });
      }
    },

    // ✅ Login Function
    login: async (data) => {
      set({ isLoggingIn: true });
      try {
        const endpoint = data.accountType === "admin" ? "/admin/login" : "/auth/login";
        const res = await axiosInstance.post(endpoint, data);

        // ✅ Store token in localStorage
        localStorage.setItem("token", res.data.token);

        set({ authUser: res.data.user });
        toast.success("Logged in successfully");

        // ✅ Navigate based on account type
        if (navigate) {
          navigate(data.accountType === "admin" ? "/admin" : "/");
        }
      } catch (error: any) {
        console.error("Login error:", error);
        toast.error(error?.response?.data?.message || "Login failed");
      } finally {
        set({ isLoggingIn: false });
      }
    },

    // ✅ Google Login Function
    googleLogin: async (token) => {
      set({ isLoggingIn: true });
      try {
        const res = await axiosInstance.post("/auth/google-login", { token });
    
        // ✅ Store token in localStorage
        localStorage.setItem("token", res.data.token);
    
        set({ authUser: res.data.user });
        toast.success("Logged in with Google");
    
        // ✅ Navigate to home after login
        if (navigate) navigate("/");
      } catch (error: any) {
        console.error("Google Login Error:", error);
        toast.error(error.response?.data?.message || "Google login failed");
      } finally {
        set({ isLoggingIn: false });
      }
    },
    

    // ✅ Logout Function
    logout: async () => {
      try {
        await axiosInstance.post("/auth/logout");

        // ✅ Clear localStorage and reset auth state
        localStorage.removeItem("token");
        set({ authUser: null });

        toast.success("Logged out successfully");

        // ✅ Navigate to /login after logout
        if (navigate) navigate("/login");
      } catch (error: any) {
        console.error("Logout error:", error);
        toast.error(error?.response?.data?.message || "Logout failed");
      }
    },

    // ✅ Update Profile Function
    updateProfile: async (data) => {
      set({ isUpdatingProfile: true });
      try {
        const res = await axiosInstance.put("/auth/update-profile", data);
        set({ authUser: res.data });
        toast.success("Profile updated successfully");
      } catch (error: any) {
        console.error("Update profile error:", error);
        toast.error(error?.response?.data?.message || "Failed to update profile");
      } finally {
        set({ isUpdatingProfile: false });
      }
    },
  };
});
