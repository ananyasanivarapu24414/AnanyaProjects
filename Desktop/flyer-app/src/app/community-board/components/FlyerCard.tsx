// components/FlyerCard.tsx
'use client';

import React from 'react';

interface FlyerData {
  id: string;
  title: string;
  clubName: string;
  backgroundColor: string;
  height: number;
  hasSpecialContent?: boolean;
}

interface FlyerCardProps {
  flyer: FlyerData;
  onClick?: () => void;
}

export default function FlyerCard({ flyer, onClick }: FlyerCardProps) {
  return (
    <div 
      className="rounded-3xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer transform hover:scale-105"
      onClick={onClick}
      style={{ 
        backgroundColor: flyer.backgroundColor,
        height: `${flyer.height}px`
      }}
    >
      <div className="relative w-full h-full">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/5"></div>
        
        {/* Special content for the blue card with "My uploads" */}
        {flyer.hasSpecialContent && (
          <div className="absolute bottom-6 left-6">
            <div className="bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2 mb-3 shadow-sm">
              <span className="text-gray-800 font-semibold text-sm">My uploads</span>
            </div>
            <div className="bg-blue-600 rounded-xl px-4 py-2 shadow-sm">
              <span className="text-white font-bold text-sm">34 × 37</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}