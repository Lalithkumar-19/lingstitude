import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { GoogleLogin, googleLogout, useGoogleLogin } from "@react-oauth/google";
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { addUser } from "@/redux/userSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";

const SignupPage: React.FC = () => {
  // Form state with TypeScript type
  const dispatch = useDispatch<AppDispatch  >();
  const [formData, setFormData] = useState<{
    fullName: string;
    email: string;
    password: string;
    agreeToTerms: boolean;
    accountType: "user" | "admin";
  }>({
    fullName: "",
    email: "",
    password: "",
    agreeToTerms: false,
    accountType: "user",
  });

  const navigate = useNavigate();

  // Handle input change for all types of input (including checkbox and radio buttons)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.agreeToTerms) {
      alert("You must agree to the terms and conditions.");
      return;
    }
    if (formData.password.length < 6) {
      toast({ title: "password must be atleast 6 characters" });
      return;
    }
    const res = await axiosInstance.post("/api/auth/signup", formData);
    if (res.status == 201) {
      toast({ title: "Registered Success", description: "success" });
      navigate("/login");
    } else {
      toast({ title: "signup Failed", description: res.data.msg });
    }
  };

  // ✅ Handle Google OAuth Signup
 
  const handleSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential;

    try {
      const { data } = await axiosInstance.post("/api/auth/google-login", {
        token,
      });

      // Save user and token properly
      // Save user info
      console.log(data);
      localStorage.setItem("Usertoken", data.token); // Save JWT token
      dispatch(addUser(data.user));
      localStorage.setItem("User", JSON.stringify(data.user));
      toast({ title: "Login Success", description: "success" });
      navigate("/");
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      alert("❌ Login failed!");
    }
  };
  const handleFailure = () => {
    alert("❌ Login failed! Please try again.");
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
          {/* ✅ Heading */}
          <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">
            Create Account
          </h1>

          {/* ✅ Google Signup Button */}
          <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} />
          {/* ✅ Divider */}
          <div className="flex items-center my-3">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-3 text-gray-500 text-sm">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* ✅ Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Full Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-1"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Account Type */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Account Type
              </label>
              <div className="flex gap-4">
                {["user", "admin"].map((type) => (
                  <label key={type} className="flex items-center">
                    <input
                      type="radio"
                      name="accountType"
                      value={type}
                      checked={formData.accountType === type}
                      onChange={handleChange}
                      className="w-4 h-4"
                    />
                    <span className="ml-2 capitalize">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Agree to Terms */}
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="w-4 h-4"
                  required
                />
                <span className="ml-2">
                  I agree to the{" "}
                  <a href="#" className="text-blue-600">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-blue-600">
                    Privacy Policy
                  </a>
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full bg-blue-600 text-white p-2 rounded-md`}
            >
              Sign Up
            </button>
          </form>

          {/* Login Redirect */}
          <div className="text-center mt-4 text-gray-600 text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600">
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
