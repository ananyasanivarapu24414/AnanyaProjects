// components/ImageCarousel.tsx
'use client';

import React, { useState, useEffect } from 'react';

interface CarouselSlide {
  id: number;
  color: string;
  title: string;
  content?: React.ReactNode;
}

interface ImageCarouselProps {
  slides?: CarouselSlide[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  width?: string;
  height?: string;
  className?: string;
  onSlideChange?: (slideIndex: number) => void;
}

export default function ImageCarousel({
  slides = [
    { id: 0, color: 'bg-red-400', title: 'Red Slide' },
    { id: 1, color: 'bg-blue-400', title: 'Blue Slide' },
    { id: 2, color: 'bg-green-400', title: 'Green Slide' },
    { id: 3, color: 'bg-purple-400', title: 'Purple Slide' }
  ],
  autoPlay = false,
  autoPlayInterval = 3000,
  showDots = true,
  showArrows = false,
  width = 'w-80',
  height = 'h-48',
  className = '',
  onSlideChange
}: ImageCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play functionality
  useEffect(() => {
    if (autoPlay && slides.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, autoPlayInterval);

      return () => clearInterval(interval);
    }
  }, [autoPlay, autoPlayInterval, slides.length]);

  // Handle slide change
  const handleSlideChange = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
    onSlideChange?.(slideIndex);
  };

  // Navigation functions
  const goToNext = () => {
    handleSlideChange((currentSlide + 1) % slides.length);
  };

  const goToPrev = () => {
    handleSlideChange(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Carousel container */}
      <div className={`relative ${width} ${height} overflow-hidden rounded-2xl shadow-lg`}>
        {/* Slides container */}
        <div 
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide) => (
            <div
              key={slide.id}
              className={`min-w-full h-full ${slide.color} flex items-center justify-center relative`}
            >
              {slide.content ? (
                slide.content
              ) : (
                <span className="text-white text-2xl font-bold drop-shadow-lg">
                  {slide.title}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Arrow navigation */}
        {showArrows && slides.length > 1 && (
          <>
            <button
              onClick={goToPrev}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
              aria-label="Previous slide"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
              aria-label="Next slide"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>
      
      {/* Dot navigation */}
      {showDots && slides.length > 1 && (
        <div className="flex justify-center space-x-3 mt-6">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => handleSlideChange(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentSlide 
                  ? 'bg-yellow-400 scale-125 shadow-lg' 
                  : 'bg-gray-300 hover:bg-gray-400 hover:scale-110'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}