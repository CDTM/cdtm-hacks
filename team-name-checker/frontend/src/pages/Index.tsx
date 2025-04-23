
import React from 'react';
import TeamNameChecker from '@/components/TeamNameChecker';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Gradient blurs for aesthetic background */}
      <div className="gradient-blur blue"></div>
      <div className="gradient-blur purple"></div>
      
      <div className="min-h-screen flex-grow flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-xl mx-auto text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800 mb-4">
            CDTM Hacks Registration
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
            Team Name Checker
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-md mx-auto">
            Verify if your team name is available for the hackathon
          </p>
        </div>
        
        <div className="w-full max-w-lg glass rounded-2xl p-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <TeamNameChecker />
        </div>
        
        <div className="mt-16 text-center text-gray-500 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <p className="text-sm mb-2">
            Enter your preferred team name to check its availability
          </p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
