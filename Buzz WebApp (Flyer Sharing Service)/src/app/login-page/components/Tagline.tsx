// components/Tagline.tsx
'use client';

import React from 'react';

interface TaglineProps {
  lines?: string[];
  textSize?: 'sm' | 'base' | 'lg' | 'xl';
  textColor?: string;
  spacing?: 'tight' | 'normal' | 'loose';
  className?: string;
}

export default function Tagline({ 
  lines = [
    'Your people. Your plans.',
    'Your posts. One place.'
  ],
  textSize = 'lg',
  textColor = 'text-gray-700',
  spacing = 'normal',
  className = ''
}: TaglineProps) {
  const sizeClasses = {
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  const spacingClasses = {
    tight: 'space-y-0',
    normal: 'space-y-1',
    loose: 'space-y-2'
  };

  return (
    <div className={`text-center ${spacingClasses[spacing]} ${className}`}>
      {lines.map((line, index) => (
        <p key={index} className={`${sizeClasses[textSize]} font-medium ${textColor}`}>
          {line}
        </p>
      ))}
    </div>
  );
}