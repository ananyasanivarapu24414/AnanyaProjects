// app/page.tsx
'use client';




import React from 'react';
import CurvedHeader from './components/CurvedHeader';
import BrandLogo from './components/BrandLogo';
import Tagline from './components/Tagline';
import ImageCarousel from './components/ImageCarousel';
import AuthButtons from './components/AuthButtons';
import { useRouter } from 'next/navigation';

// Define carousel slides with proper typing
const carouselSlides = [
  { 
    id: 0, 
    color: 'bg-red-400', 
    title: 'Events & Activities',
    content: (
      <div className="text-center text-white p-6">
        <h3 className="text-2xl font-bold mb-2">Events</h3>
        <p className="text-lg">Discover campus events</p>
      </div>
    )
  },
  { 
    id: 1, 
    color: 'bg-blue-400', 
    title: 'Student Communities',
    content: (
      <div className="text-center text-white p-6">
        <h3 className="text-2xl font-bold mb-2">Communities</h3>
        <p className="text-lg">Connect with students</p>
      </div>
    )
  },
  { 
    id: 2, 
    color: 'bg-green-400', 
    title: 'Club Information',
    content: (
      <div className="text-center text-white p-6">
        <h3 className="text-2xl font-bold mb-2">Clubs</h3>
        <p className="text-lg">Join student organizations</p>
      </div>
    )
  },
  { 
    id: 3, 
    color: 'bg-purple-400', 
    title: 'Campus Updates',
    content: (
      <div className="text-center text-white p-6">
        <h3 className="text-2xl font-bold mb-2">Updates</h3>
        <p className="text-lg">Stay informed</p>
      </div>
    )
  }
];

export default function LandingPage() {

  const router = useRouter()
  
  
  const handleSignUpClick = () => {
    console.log('Navigate to onboarding page');
    router.push('/onboarding')
  };

  const handleLoginClick = () => {
    console.log('Navigate to community board');
    router.push('/login')
  };

  const handleSlideChange = (slideIndex: number) => {
    console.log(`Carousel slide changed to: ${slideIndex}`);
    // TODO: Add analytics tracking
  };

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-md mx-auto">
      {/* Yellow curved header - only background */}
      <CurvedHeader 
        height="h-80"
        backgroundColor="#FDE047"
        curveIntensity={120}
      />

      {/* Main content positioned below the yellow circle */}
      <div className="flex-1 px-6 pt-4">
        
        {/* Brand logo below the yellow circle */}
        <BrandLogo 
          size="large"
          color="text-gray-900"
          fontWeight="black"
          className="mb-4"
        />

        {/* Tagline closer to buzz */}
        <Tagline 
          lines={[
            'Your people. Your plans.',
            'Your posts. One place.'
          ]}
          textSize="lg"
          textColor="text-gray-700"
          spacing="normal"
          className="mb-8"
        />

        {/* Interactive image carousel */}
        <ImageCarousel 
          slides={carouselSlides}
          autoPlay={false}
          showDots={true}
          showArrows={false}
          width="w-80"
          height="h-48"
          className="mb-8"
          onSlideChange={handleSlideChange}
        />

        {/* Authentication buttons */}
        <AuthButtons 
          onSignUpClick={handleSignUpClick}
          onLoginClick={handleLoginClick}
          signUpText="SIGN UP"
          loginText="LOGIN"
          signUpStyle="primary"
          loginStyle="secondary"
          size="lg"
          fullWidth={true}
        />

        {/* Bottom spacing */}
        <div className="pb-8" />
      </div>
    </div>
  );
}