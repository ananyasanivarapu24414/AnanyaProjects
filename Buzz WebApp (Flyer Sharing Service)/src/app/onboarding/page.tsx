// app/onboarding/page.tsx



// The validating of entries in this page makes sure that none are empty and if sthey are write them
//to errors which is just like an array. 
'use client';

import React, { JSX, useState } from 'react';
import { useRouter } from 'next/navigation';
// From src/app/onboarding/page.tsx
import { useAuth } from '../contexts/AuthContext';
// Define types for form data
interface FormData {
  name: string;
  email: string;
  school: string;
  gradDate: string;
  password: string;
  confirmPassword: string;
  pushNotifications: boolean | null;
}

// Define types for errors
interface FormErrors {
  name?: string;
  email?: string;
  school?: string;
  gradDate?: string;
  password?: string;
  confirmPassword?: string;
}

// Define step interface
interface Step {
  title: string;
  content: JSX.Element;
  topColor: string;
  bottomColor: string;
}

export default function OnboardingFlow() {
  const router = useRouter();
  const { signup } = useAuth();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    school: '',
    gradDate: '',
    password: '',
    confirmPassword: '',
    pushNotifications: null
  });
  const [errors, setErrors] = useState<FormErrors>({});

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const columbiaEmailRegex = /^[a-zA-Z0-9._%+-]+@(columbia\.edu|barnard\.edu)$/;
    return columbiaEmailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 8;
  };

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};
    
    switch(step) {
      case 0:
        if (!formData.name.trim()) newErrors.name = 'Please enter your name';
        break;
      case 1:
        if (!formData.email.trim()) {
          newErrors.email = 'Please enter your email';
        } else if (!validateEmail(formData.email)) {
          newErrors.email = 'Please use your Columbia or Barnard email';
        }
        break;
      case 2:
        if (!formData.school) newErrors.school = 'Please select your school';
        break;
      case 3:
        if (!formData.gradDate) newErrors.gradDate = 'Please select your graduation date';
        break;
      case 4:
        if (!formData.password) {
          newErrors.password = 'Please create a password';
        } else if (!validatePassword(formData.password)) {
          newErrors.password = 'Password must be at least 8 characters';
        }
        break;
      case 5:
        if (!formData.confirmPassword) {
          newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match';
        }
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = (): void => {
    if (validateStep(currentStep)) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const prevStep = (): void => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep(prev => prev - 1);
      setIsAnimating(false);
    }, 300);
  };

  const handleInputChange = (field: keyof FormData, value: string | boolean): void => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (): Promise<void> => {
    console.log('Creating account with:', formData);
    try {
    // This actually creates the user account in Firebase
      await signup(formData.email, formData.password, {
        displayName: formData.name,
        school: formData.school,
        gradDate: formData.gradDate,
        pushNotifications: formData.pushNotifications || false
      });

      //TODO: if failed for any reason, add a red message saying. Creation unsuccessful. 
  
      //alert('Welcome to buzz! 🎉\nAccount created successfully!');
      router.push('/community-board');
    
    } catch (error: any) {
        // Show actual Firebase errors
        console.log(`Error: ${error.message}`);
    }
  };

  const generateGradYears = (): number[] => {
    const currentYear = new Date().getFullYear();
    const years: number[] = [];
    for (let i = 0; i < 6; i++) {
      years.push(currentYear + i);
    }
    return years;
  };

  const steps: Step[] = [
    {
      title: 'tell us your name',
      content: (
        <input
          type="text"
          value={formData.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('name', e.target.value)}
          className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-gray-400 transition-colors bg-white shadow-sm"
          placeholder="Enter your full name"
          autoFocus
        />
      ),
      topColor: '#FDE047',
      bottomColor: '#A7F3D0'
    },
    {
      title: 'what\'s your email?',
      content: (
        <input
          type="email"
          value={formData.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('email', e.target.value)}
          className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-gray-400 transition-colors bg-white shadow-sm"
          placeholder="yourname@columbia.edu"
          autoFocus
        />
      ),
      topColor: '#FDE047',
      bottomColor: '#93C5FD'
    },
    {
      title: 'which school?',
      content: (
        <select
          value={formData.school}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleInputChange('school', e.target.value)}
          className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-gray-400 transition-colors bg-white shadow-sm"
          autoFocus
        >
          <option value="">Select your school</option>
          <option value="CC">Columbia College (CC)</option>
          <option value="SEAS">School of Engineering (SEAS)</option>
          <option value="GS">General Studies (GS)</option>
          <option value="Barnard">Barnard College</option>
        </select>
      ),
      topColor: '#A7F3D0',
      bottomColor: '#DDD6FE'
    },
    {
      title: 'graduation year?',
      content: (
        <select
          value={formData.gradDate}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleInputChange('gradDate', e.target.value)}
          className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-gray-400 transition-colors bg-white shadow-sm"
          autoFocus
        >
          <option value="">Select graduation year</option>
          {generateGradYears().map((year: number) => (
            <option key={year} value={year.toString()}>{year}</option>
          ))}
        </select>
      ),
      topColor: '#93C5FD',
      bottomColor: '#FECACA'
    },
    {
      title: 'create a password',
      content: (
        <div>
          <input
            type="password"
            value={formData.password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('password', e.target.value)}
            className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-gray-400 transition-colors bg-white shadow-sm"
            placeholder="Create a secure password"
            autoFocus
          />
          <p className="text-sm text-gray-500 mt-2 text-center">Must be at least 8 characters</p>
        </div>
      ),
      topColor: '#FECACA',
      bottomColor: '#A7F3D0'
    },
    {
      title: 'confirm password',
      content: (
        <input
          type="password"
          value={formData.confirmPassword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('confirmPassword', e.target.value)}
          className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-gray-400 transition-colors bg-white shadow-sm"
          placeholder="Re-enter your password"
          autoFocus
        />
      ),
      topColor: '#DDD6FE',
      bottomColor: '#93C5FD'
    },
    {
      title: 'enable notifications?',
      content: (
        <div className="space-y-4">
          <p className="text-gray-600 text-center mb-6">Get notified about new flyers and events</p>
          <div className="space-y-3">
            <button
              onClick={() => handleInputChange('pushNotifications', true)}
              className={`w-full px-6 py-4 text-lg rounded-2xl transition-all shadow-sm ${
                formData.pushNotifications === true
                  ? 'bg-gray-800 text-white'
                  : 'bg-white border-2 border-gray-200 hover:border-gray-400'
              }`}
            >
              Yes, keep me updated
            </button>
            <button
              onClick={() => handleInputChange('pushNotifications', false)}
              className={`w-full px-6 py-4 text-lg rounded-2xl transition-all shadow-sm ${
                formData.pushNotifications === false
                  ? 'bg-gray-800 text-white'
                  : 'bg-white border-2 border-gray-200 hover:border-gray-400'
              }`}
            >
              No thanks
            </button>
          </div>
        </div>
      ),
      topColor: '#93C5FD',
      bottomColor: '#FDE047'
    }
  ];

  const currentStepData: Step = steps[currentStep];

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Animated Background Circles */}
      <div 
        className="absolute top-0 left-0 w-80 h-80 rounded-full transition-all duration-700 ease-in-out"
        style={{ 
          background: currentStepData.topColor,
          transform: 'translate(-40%, -40%)'
        }}
      />
      <div 
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full transition-all duration-700 ease-in-out"
        style={{ 
          background: currentStepData.bottomColor,
          transform: 'translate(40%, 40%)'
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center max-w-md mx-auto px-6">
        
        {/* Step Counter */}
        <div className="text-center mb-8">
          <div className="flex justify-center space-x-2 mb-4">
            {steps.map((_, index: number) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index <= currentStep ? 'bg-gray-800' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-500">
            Step {currentStep + 1} of {steps.length}
          </p>
        </div>

        {/* Step Content */}
        <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'}`}>
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-8 leading-tight">
            {currentStepData.title}
          </h1>

          <div className="mb-6">
            {currentStepData.content}
          </div>

          {/* Error Message */}
          {Object.values(errors).map((error: string | undefined, index: number) => (
            error && (
              <div key={index} className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-600 text-sm text-center">{error}</p>
              </div>
            )
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              currentStep === 0
                ? 'opacity-0 cursor-not-allowed'
                : 'opacity-100 text-gray-600 hover:text-gray-800 hover:bg-white/50'
            }`}
          >
            Back
          </button>

          {currentStep === steps.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={formData.pushNotifications === null}
              className="px-8 py-3 bg-gray-800 text-white rounded-xl font-medium hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Account
            </button>
          ) : (
            <button
              onClick={nextStep}
              className="px-8 py-3 bg-gray-800 text-white rounded-xl font-medium hover:bg-gray-900 transition-colors"
            >
              Next
            </button>
          )}
        </div>

        {/* Login Link */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <button
              onClick={() => router.push('/login')}
              className="font-medium text-gray-800 hover:text-gray-900 underline"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}