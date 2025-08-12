"use client"

import React, { useState } from 'react';

// iPhone Mockup Component


// Different App Screens
const LandingScreen = () => (
  <div className="h-full bg-gradient-to-b from-yellow-300 to-yellow-400 flex flex-col items-center justify-center text-center px-6">
    <h2 className="text-3xl font-bold text-gray-800 mb-4">buzz</h2>
    <p className="text-gray-700 mb-2">Your people. Your plans.</p>
    <p className="text-gray-700 mb-8">Your posts. One place.</p>
    <div className="space-y-3 w-full">
      <div className="bg-gray-800 text-white py-3 px-6 rounded-xl text-sm font-semibold">SIGN UP</div>
      <div className="bg-gray-200 text-gray-800 py-3 px-6 rounded-xl text-sm font-semibold">LOGIN</div>
    </div>
  </div>
);

const CommunityScreen = () => (
  <div className="h-full bg-gray-50 p-4">
    <div className="text-center mb-4 pt-2">
      <h3 className="text-lg font-bold text-gray-800">Community Board</h3>
    </div>
    <div className="grid grid-cols-2 gap-2 h-96 overflow-hidden">
      <div className="bg-red-400 rounded-lg p-2 text-white text-xs">
        <div className="font-semibold">Club Fair</div>
        <div className="text-xs opacity-80">Join us today!</div>
      </div>
      <div className="bg-blue-400 rounded-lg p-2 text-white text-xs">
        <div className="font-semibold">Study Group</div>
        <div className="text-xs opacity-80">Math 101</div>
      </div>
      <div className="bg-green-400 rounded-lg p-2 text-white text-xs">
        <div className="font-semibold">Pizza Night</div>
        <div className="text-xs opacity-80">Free food!</div>
      </div>
      <div className="bg-purple-400 rounded-lg p-2 text-white text-xs">
        <div className="font-semibold">Book Sale</div>
        <div className="text-xs opacity-80">50% off</div>
      </div>
      <div className="bg-pink-400 rounded-lg p-2 text-white text-xs">
        <div className="font-semibold">Concert</div>
        <div className="text-xs opacity-80">This Friday</div>
      </div>
      <div className="bg-orange-400 rounded-lg p-2 text-white text-xs">
        <div className="font-semibold">Tutoring</div>
        <div className="text-xs opacity-80">All subjects</div>
      </div>
    </div>
  </div>
);

const ProfileScreen = () => (
  <div className="h-full bg-gray-50 p-4">
    <div className="text-center mb-6 pt-2">
      <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-2"></div>
      <h3 className="font-bold text-gray-800">Sarah Johnson</h3>
      <p className="text-sm text-gray-600">Junior • Psychology</p>
    </div>
    <div className="space-y-3">
      <div className="bg-white rounded-lg p-3 shadow-sm">
        <div className="text-sm font-semibold text-gray-800">My Posts</div>
        <div className="text-xs text-gray-600">12 active</div>
      </div>
      <div className="bg-white rounded-lg p-3 shadow-sm">
        <div className="text-sm font-semibold text-gray-800">Saved</div>
        <div className="text-xs text-gray-600">8 items</div>
      </div>
      <div className="bg-white rounded-lg p-3 shadow-sm">
        <div className="text-sm font-semibold text-gray-800">Following</div>
        <div className="text-xs text-gray-600">24 clubs</div>
      </div>
    </div>
  </div>
);

//  Carousel Component (smaller for circle)
const ImageCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const screens = [
    {
      component: <LandingScreen />,
      title: "Welcome to Buzz",
      description: "Get started with your campus community"
    },
    {
      component: <CommunityScreen />,
      title: "Community Board",
      description: "Browse flyers in Pinterest-style layout"
    },
    {
      component: <ProfileScreen />,
      title: "Your Profile",
      description: "Manage your posts and saved items"
    }
  ];

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % screens.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + screens.length) % screens.length);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* iPhone Mockup - Smaller for circle */}
      <div className="relative">
        <div className="w-40 h-80 bg-gray-900 rounded-[2rem] p-1.5 shadow-xl">
          <div className="w-full h-full bg-white rounded-[1.5rem] relative overflow-hidden">
            {/* iPhone Notch */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-4 bg-gray-900 rounded-b-xl z-10"></div>
            
            {/* Screen Content with white background */}
            <div className="pt-6 h-full text-xs bg-white">
              {screens[activeIndex].component}
            </div>
          </div>
        </div>
        
        {/* Navigation Arrows - Smaller */}
        <button 
          onClick={prevSlide}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-gray-800 transition-colors text-white text-xs"
        >
          ←
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-gray-800 transition-colors text-white text-xs"
        >
          →
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="flex space-x-2">
        {screens.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === activeIndex ? 'bg-yellow-400 shadow-lg' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// App Description Component
const AppDescription = () => (
  <div className="max-w-md text-center space-y-6">
    {/* Slogan */}
    <div className="space-y-2">
      <p className="text-2xl text-gray-700 font-medium">your people. your plans.</p>
      <p className="text-2xl text-gray-700 font-medium">your posts. one place.</p>
    </div>
    
    {/* Description */}
    <div>
      <p className="text-lg text-gray-600 leading-relaxed">
        Share flyers, discover events, and connect with fellow students through our intuitive Pinterest-style interface.
      </p>
    </div>
  </div>
);

// Auth Buttons Component
const AuthButtons = () => (
  <div className="space-y-4 w-full max-w-sm">
    <button className="w-full bg-gray-800 text-white py-4 px-8 rounded-2xl text-xl font-semibold hover:bg-gray-700 transition-colors duration-200 shadow-lg">
      SIGN UP
    </button>
    <button className="w-full bg-gray-200 text-gray-800 py-4 px-8 rounded-2xl text-xl font-semibold hover:bg-gray-300 transition-colors duration-200 shadow-lg">
      LOGIN
    </button>
  </div>
);

// Main Landing Page Component
const BuzzLandingPage = () => {
  return (
    <div className="min-h-screen flex">
      
      {/* Left Side - Yellow Background with Logo and Carousel */}
      <div className="w-1/2 bg-gradient-to-br from-yellow-300 to-yellow-400 flex flex-col items-center justify-center relative py-16 overflow-hidden">
        
        {/* Decorative Circles */}
        <div className="absolute inset-0">
          {/* White circle behind buzz logo only */}
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-60 h-60 bg-white rounded-full shadow-xl flex items-center justify-center">
            <h1 className="text-6xl font-bold text-gray-800 tracking-tight">buzz</h1>
          </div>
          
          {/* Tasteful pastel circles on left */}
          <div className="absolute top-10 right-10 w-24 h-24 bg-pink-200 rounded-full shadow-lg"></div>
          <div className="absolute bottom-20 left-10 w-32 h-32 bg-blue-200 rounded-full shadow-lg"></div>
          <div className="absolute top-1/3 left-8 w-16 h-16 bg-green-200 rounded-full shadow-lg"></div>
          <div className="absolute bottom-32 right-16 w-20 h-20 bg-purple-200 rounded-full shadow-lg"></div>
          <div className="absolute top-1/2 right-8 w-28 h-28 bg-orange-200 rounded-full shadow-lg"></div>
          <div className="absolute bottom-10 left-1/3 w-18 h-18 bg-indigo-200 rounded-full shadow-lg"></div>
        </div>
        
        {/* Content Layer */}
        <div className="relative z-10 flex flex-col items-center space-y-16 pt-16">
          
          {/* Carousel Section - Much lower position */}
          <div className="relative mt-24">
            <ImageCarousel />
          </div>
        </div>
        
      </div>

      {/* Right Side - Light Background with Content */}
      <div className="w-1/2 bg-gray-50 flex flex-col justify-between py-16 px-16">
        
        {/* Top Section - Description and Auth */}
        <div className="flex flex-col items-center space-y-12">
          <AppDescription />
          <AuthButtons />
        </div>
        
        {/* Bottom Section - Footer Text */}
        <div className="text-center">
          <p className="text-gray-400 text-sm">Made for students, by students.</p>
        </div>
        
      </div>
    </div>
  );
};

export default BuzzLandingPage;