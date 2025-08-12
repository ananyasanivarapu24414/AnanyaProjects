// app/login/page.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

// Define types for form data
interface LoginFormData {
  email: string;
  password: string;
}

// Define types for errors
interface LoginErrors {
  email?: string;
  password?: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<LoginErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const validateEmail = (email: string): boolean => {
    const columbiaEmailRegex = /^[a-zA-Z0-9._%+-]+@(columbia\.edu|barnard\.edu)$/;
    return columbiaEmailRegex.test(email);
  };

  const handleInputChange = (field: keyof LoginFormData, value: string): void => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>): Promise<void> => {
    e.preventDefault();
    
    // Validation
    const newErrors: LoginErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please use your Columbia or Barnard email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Please enter your password';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    // TODO: Integrate with Firebase Auth here
    // try {
    //   await signInWithEmailAndPassword(auth, formData.email, formData.password);
    //   router.push('/community-board');
    // } catch (error: any) {
    //   setErrors({ email: 'Invalid email or password' });
    // }

    // Simulate login process for now
    setTimeout(() => {
      console.log('Logging in:', formData);
      
      // For now, just simulate successful login
      alert('Welcome back! 👋');
      router.push('/community-board');
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && !isLoading) {
      handleSubmit(e);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Background Circles */}
      <div 
        className="absolute top-0 left-0 w-80 h-80 rounded-full"
        style={{ 
          background: '#FDE047',
          transform: 'translate(-40%, -40%)'
        }}
      />
      <div 
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full"
        style={{ 
          background: '#93C5FD',
          transform: 'translate(40%, 40%)'
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center max-w-md mx-auto px-6">
        
        {/* Brand */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-black text-gray-900 mb-2">buzz</h1>
          <p className="text-lg text-gray-600">Welcome back!</p>
        </div>

        {/* Login Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg">
          <div className="space-y-6">
            
            {/* Email Field */}
            <div>
              <label className="block text-lg font-medium text-gray-800 mb-2">
                email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('email', e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-gray-400 transition-colors bg-white shadow-sm"
                placeholder="yourname@columbia.edu"
                disabled={isLoading}
              />
              {errors.email && (
                <p className="mt-2 text-red-600 text-sm">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-lg font-medium text-gray-800 mb-2">
                password
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('password', e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-gray-400 transition-colors bg-white shadow-sm"
                placeholder="Enter your password"
                disabled={isLoading}
              />
              {errors.password && (
                <p className="mt-2 text-red-600 text-sm">{errors.password}</p>
              )}
            </div>

            {/* Login Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full py-4 px-8 bg-gray-800 text-white text-lg font-semibold rounded-2xl hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </div>

          {/* Forgot Password */}
          <div className="text-center mt-4">
            <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">
              Forgot your password?
            </button>
          </div>
        </div>

        {/* Sign Up Link */}
        <div className="text-center mt-8">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={() => router.push('/onboarding')}
              className="font-medium text-gray-800 hover:text-gray-900 underline"
            >
              Sign up
            </button>
          </p>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-4">
          <button
            onClick={() => router.push('/')}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            ← Back to home
          </button>
        </div>
      </div>
    </div>
  );
}