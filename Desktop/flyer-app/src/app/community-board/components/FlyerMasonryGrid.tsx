// components/FlyerMasonryGrid.tsx
'use client';

import React from 'react';
import FlyerCard from '@/app/community-board/components/FlyerCard';

interface FlyerData {
  id: string;
  title: string;
  clubName: string;
  backgroundColor: string;
  height: number;
  hasSpecialContent?: boolean;
}

interface FlyerMasonryGridProps {
  flyers: FlyerData[];
  onFlyerClick?: (flyerId: string) => void;
}

export default function FlyerMasonryGrid({ flyers, onFlyerClick }: FlyerMasonryGridProps) {
  // Split flyers into two columns for masonry effect
  const leftColumnFlyers = flyers.filter((_, index) => index % 2 === 0);
  const rightColumnFlyers = flyers.filter((_, index) => index % 2 === 1);

  return (
    <div className="max-w-md mx-auto px-6 py-6 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-2 gap-4">
        {/* Left column */}
        <div className="space-y-4">
          {leftColumnFlyers.map((flyer) => (
            <FlyerCard
              key={flyer.id}
              flyer={flyer}
              onClick={() => onFlyerClick?.(flyer.id)}
            />
          ))}
        </div>
        
        {/* Right column with offset */}
        <div className="space-y-4 mt-8">
          {rightColumnFlyers.map((flyer) => (
            <FlyerCard
              key={flyer.id}
              flyer={flyer}
              onClick={() => onFlyerClick?.(flyer.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}