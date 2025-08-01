// components/BuzzHeader.tsx
'use client';

import React from 'react';
import { Search, Bookmark } from 'lucide-react';

interface BuzzHeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onBookmarkClick?: () => void;
}

export default function BuzzHeader({ 
  activeTab, 
  onTabChange, 
  searchQuery, 
  onSearchChange,
  onBookmarkClick 
}: BuzzHeaderProps) {
  const tabs = ['What\'s on ?', 'Saved', 'Clubs'];

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-md mx-auto px-6 py-4">
        {/* Logo and bookmark row */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-400 rounded-full"></div>
            <h1 className="text-2xl font-bold text-gray-800">buzz</h1>
            <div className="bg-yellow-400 text-black p-4 rounded-lg m-4">
              ✅ If this is yellow with black text, Tailwind works!
            </div>
          </div>
          <button 
            onClick={onBookmarkClick}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Bookmark className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Search bar */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search flyers..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="block w-full pl-12 pr-4 py-4 text-gray-900 border border-gray-300 rounded-2xl bg-gray-50 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 focus:bg-white transition-all text-base"
          />
        </div>

        {/* Tab navigation */}
        <div className="flex gap-3">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`px-6 py-3 rounded-2xl font-medium text-sm transition-all ${
                activeTab === tab
                  ? 'bg-white text-gray-900 shadow-md border border-gray-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}