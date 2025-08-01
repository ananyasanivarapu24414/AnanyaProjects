// app/community-board/page.tsx
'use client';

import React, { useState } from 'react';
import { Search, Bookmark } from 'lucide-react';

// Exact flyer data
const communityFlyers = [
  {
    id: '1',
    title: 'Computer Science Club',
    clubName: 'CS Club',
    backgroundColor: '#E53E3E',
    height: 280,
    hasSpecialContent: false
  },
  {
    id: '2',
    title: 'Basketball Tournament',
    clubName: 'Sports Club',
    backgroundColor: '#8B5A2B',
    height: 280,
    hasSpecialContent: false
  },
  {
    id: '3',
    title: 'Environmental Event',
    clubName: 'Eco Club',
    backgroundColor: '#4299E1',
    height: 320,
    hasSpecialContent: true
  },
  {
    id: '4',
    title: 'Photography Workshop',
    clubName: 'Photo Society',
    backgroundColor: '#8B5A2B',
    height: 280,
    hasSpecialContent: false
  }
];

export default function CommunityBoardPage() {
  const [activeTab, setActiveTab] = useState('What\'s on ?');
  const [searchQuery, setSearchQuery] = useState('');

  const leftColumnFlyers = communityFlyers.filter((_, index) => index % 2 === 0);
  const rightColumnFlyers = communityFlyers.filter((_, index) => index % 2 === 1);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-400 rounded-full"></div>
              <h1 className="text-2xl font-bold text-gray-800">buzz</h1>
            </div>
            <Bookmark className="w-6 h-6 text-gray-600" />
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search flyers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-12 pr-4 py-4 text-gray-900 border border-gray-300 rounded-2xl bg-gray-50 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 focus:bg-white transition-all"
            />
          </div>

          <div className="flex gap-3">
            {['What\'s on ?', 'Saved', 'Clubs'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
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

      {/* Masonry Grid */}
      <div className="max-w-md mx-auto px-6 py-6">
        <div className="grid grid-cols-2 gap-4">
          {/* Left column */}
          <div className="space-y-4">
            {leftColumnFlyers.map((flyer) => (
              <div
                key={flyer.id}
                className="rounded-3xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer relative"
                style={{ 
                  backgroundColor: flyer.backgroundColor,
                  height: `${flyer.height}px`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/5"></div>
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
            ))}
          </div>
          
          {/* Right column with offset */}
          <div className="space-y-4 mt-8">
            {rightColumnFlyers.map((flyer) => (
              <div
                key={flyer.id}
                className="rounded-3xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer relative"
                style={{ 
                  backgroundColor: flyer.backgroundColor,
                  height: `${flyer.height}px`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/5"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}