// components/BrandLogo.tsx
'use client';

import React from 'react';

interface BrandLogoProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  className?: string;
  fontWeight?: 'normal' | 'bold' | 'black';
}

export default function BrandLogo({ 
  size = 'large', 
  color = 'text-gray-900',
  className = '',
  fontWeight = 'black'
}: BrandLogoProps) {
  const sizeClasses = {
    small: 'text-2xl',
    medium: 'text-3xl',
    large: 'text-5xl'
  };

  const weightClasses = {
    normal: 'font-normal',
    bold: 'font-bold',
    black: 'font-black'
  };

  return (
    <div className={`text-center ${className}`}>
      <h1 
        className={`${sizeClasses[size]} ${weightClasses[fontWeight]} ${color} tracking-tight`} 
        style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
      >
        buzz
      </h1>
    </div>
  );
}