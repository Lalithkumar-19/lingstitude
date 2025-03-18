import React, { useState } from 'react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const SignupPage: React.FC = () => {
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    agreeToTerms: false,
    accountType: 'user',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };
  const handleGoogleSignup = () => {
    console.log('Google signup clicked');
    // Implement Google OAuth integration here
  };


  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
          <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">Create Account</h1>
          
          <button 
          onClick={handleGoogleSignup}
          className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md p-3 mb-4 text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
            <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.49h4.84c-.22 1.03-.9 1.9-1.9 2.48v2.05h3.04C16.52 13.77 17.64 11.71 17.64 9.2z"/>
            <path fill="#34A853" d="M9 18c2.55 0 4.68-.83 6.24-2.24l-3.04-2.05c-.84.58-1.93.91-3.2.91-2.46 0-4.55-1.64-5.3-3.85H.45v2.14A9.002 9.002 0 0 0 9 18z"/>
            <path fill="#FBBC05" d="M3.7 10.77c-.19-.57-.3-1.18-.3-1.81 0-.63.11-1.24.3-1.81V5.01H.45C.17 5.91 0 6.93 0 8c0 1.07.17 2.09.45 2.99l3.25-2.22z"/>
            <path fill="#EA4335" d="M9 3.34c1.39 0 2.63.47 3.61 1.38l2.65-2.65C13.68.77 11.55 0 9 0 5.48 0 2.43 2.02.45 5.01l3.25 2.22C4.45 4.98 6.54 3.34 9 3.34z"/>
          </svg>
          Continue with Google
        </button>
          <div className="flex items-center my-3">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-3 text-gray-500 text-sm">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium mb-1">Full Name</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" required />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email Address</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" required />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-gray-700 font-medium mb-1">Password</label>
              <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" required />
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-1">Account Type</label>
              <div className="flex flex-col gap-2">
                <label className="flex items-center">
                  <input type="radio" name="accountType" value="user" checked={formData.accountType === 'user'} onChange={handleChange} className="w-4 h-4" />
                  <span className="ml-2 text-gray-700">Regular User</span>
                </label>
                <label className="flex items-center">
                  <input type="radio" name="accountType" value="admin" checked={formData.accountType === 'admin'} onChange={handleChange} className="w-4 h-4" />
                  <span className="ml-2 text-gray-700">Administrator</span>
                </label>
              </div>
            </div>
            
            <div>
              <label className="flex items-center">
                <input type="checkbox" id="agreeToTerms" name="agreeToTerms" checked={formData.agreeToTerms} onChange={handleChange} className="w-4 h-4" required />
                <span className="ml-2 text-gray-600">I agree to the <a href="#" className="text-blue-600">Terms of Service</a> and <a href="#" className="text-blue-600">Privacy Policy</a></span>
              </label>
            </div>
            
            <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">Sign Up</button>
          </form>
          
          <div className="text-center mt-4 text-gray-600 text-sm">Already have an account? <a href="login" className="text-blue-600">Log in</a></div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignupPage;
