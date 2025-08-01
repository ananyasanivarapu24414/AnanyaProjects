// components/CurvedHeader.tsx
'use client';

import React from 'react';

interface CurvedHeaderProps {
  height?: string;
  backgroundColor?: string;
  curveIntensity?: number;
}

export default function CurvedHeader({ 
  height = 'h-80', 
  backgroundColor = '#FDE047',
  curveIntensity = 120 
}: CurvedHeaderProps) {
  return (
    <div className={`relative w-full ${height} overflow-hidden`}>
      <div 
        className="w-full h-full"
        style={{
          clipPath: `ellipse(${curveIntensity}% 100% at 50% 0%)`,
          background: backgroundColor
        }}
      />
    </div>
  );
}