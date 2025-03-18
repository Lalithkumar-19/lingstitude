/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { axiosInstance } from "../lib/axios"; // Remove `.ts` from the import
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
// import { io } from "socket.io-client";

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
  login: (data: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  googleLogin: (token: string) => Promise<void>;
  updateProfile: (data: Partial<AuthUser>) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => {
  // ✅ Use navigate outside the store
  let navigate: ReturnType<typeof useNavigate>;

  return {
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,

    // ✅ Set Navigate (Optional helper to pass navigate)
    setNavigate: (nav: ReturnType<typeof useNavigate>) => {
      navigate = nav;
    },

    // ✅ Check Authentication Status
    checkAuth: async () => {
      try {
        const res = await axiosInstance.get("/auth/check");
        set({ authUser: res.data });
      
      } catch (error: any) {
        console.error("Error in checkAuth:", error);
        set({ authUser: null });
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

        // ✅ Navigate to /login after successful signup
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
        const res = await axiosInstance.post("/auth/login", data);
        set({ authUser: res.data });
        toast.success("Logged in successfully");

        // ✅ Navigate to / after successful login
        if (navigate) navigate("/");
      } catch (error: any) {
        console.error("Login error:", error);
        toast.error(error?.response?.data?.message || "Login failed");
      } finally {
        set({ isLoggingIn: false });
      }
    },

    // ✅ Logout Function
    logout: async () => {
      try {
        await axiosInstance.post("/auth/logout");
        set({ authUser: null });
        toast.success("Logged out successfully");

        // ✅ Navigate to /login after logout
        if (navigate) navigate("/login");
      } catch (error: any) {
        console.error("Logout error:", error);
        toast.error(error?.response?.data?.message || "Logout failed");
      }
    },

    googleLogin: async (token) => {
      set({ isLoggingIn: true });
      try {
        const res = await axiosInstance.post('/auth/google-login', { token });
        set({ authUser: res.data.user });
        localStorage.setItem('token', res.data.token); // Save token for future use
        toast.success('Logged in with Google');
        if (navigate) navigate("/");
      } catch (error: any) {
        console.error('Google Login Error:', error);
        toast.error(error.response?.data?.message || 'Google login failed');
      } finally {
        set({ isLoggingIn: false });
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

    //  Example Socket Handling (Optional)
    // connectSocket: () => {
    //   const { authUser } = get();
    //   if (!authUser || get().socket?.connected) return;

    //   const socket = io("http://localhost:5001", {
    //     query: { userId: authUser._id },
    //   });
    //   socket.connect();

    //   set({ socket: socket });

    //   socket.on("getOnlineUsers", (userIds) => {
    //     set({ onlineUsers: userIds });
    //   });
    // },

    // disconnectSocket: () => {
    //   if (get().socket?.connected) get().socket.disconnect();
    // },
  };
});
