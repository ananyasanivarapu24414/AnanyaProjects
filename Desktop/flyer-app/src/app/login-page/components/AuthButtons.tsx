// components/AuthButtons.tsx
'use client';

import React from 'react';

interface AuthButtonsProps {
  onSignUpClick?: () => void;
  onLoginClick?: () => void;
  signUpText?: string;
  loginText?: string;
  signUpStyle?: 'primary' | 'secondary' | 'outline';
  loginStyle?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
}

export default function AuthButtons({
  onSignUpClick,
  onLoginClick,
  signUpText = 'SIGN UP',
  loginText = 'LOGIN',
  signUpStyle = 'primary',
  loginStyle = 'secondary',
  size = 'lg',
  fullWidth = true,
  className = '',
  disabled = false,
  loading = false
}: AuthButtonsProps) {
  const sizeClasses = {
    sm: 'py-2 px-4 text-sm',
    md: 'py-3 px-6 text-base',
    lg: 'py-4 px-8 text-lg'
  };

  const getButtonStyles = (style: 'primary' | 'secondary' | 'outline') => {
    const baseStyles = 'font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    
    switch (style) {
      case 'primary':
        return `${baseStyles} bg-gray-800 text-white hover:bg-gray-900 focus:ring-gray-500 shadow-sm`;
      case 'secondary':
        return `${baseStyles} bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400 shadow-sm`;
      case 'outline':
        return `${baseStyles} border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white focus:ring-gray-500`;
      default:
        return baseStyles;
    }
  };

  const widthClass = fullWidth ? 'w-full' : 'w-auto';

  return (
    <div className={`space-y-4 max-w-sm mx-auto px-4 ${className}`}>
      <button 
        onClick={onSignUpClick}
        disabled={disabled || loading}
        className={`${widthClass} ${sizeClasses[size]} ${getButtonStyles(signUpStyle)}`}
        aria-label="Sign up for an account"
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading...
          </div>
        ) : (
          signUpText
        )}
      </button>
      
      <button 
        onClick={onLoginClick}
        disabled={disabled || loading}
        className={`${widthClass} ${sizeClasses[size]} ${getButtonStyles(loginStyle)}`}
        aria-label="Log in to your account"
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading...
          </div>
        ) : (
          loginText
        )}
      </button>
    </div>
  );
}