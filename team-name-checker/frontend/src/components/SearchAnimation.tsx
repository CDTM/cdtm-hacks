
import React from 'react';
import { cn } from '@/lib/utils';

interface SearchAnimationProps {
  isSearching: boolean;
}

const SearchAnimation: React.FC<SearchAnimationProps> = ({ isSearching }) => {
  return (
    <div className={cn(
      "w-full h-2 rounded-full overflow-hidden transition-opacity duration-300",
      isSearching ? "opacity-100" : "opacity-0"
    )}>
      <div 
        className="h-full bg-gradient-to-r from-blue-400 via-indigo-500 to-blue-400 animate-shimmer"
        style={{
          width: '100%',
          backgroundSize: '200% 100%',
          animation: isSearching ? 'shimmer 2s infinite linear' : 'none'
        }}
      />
      <style>
        {`
          @keyframes shimmer {
            0% {
              background-position: 0% 0;
            }
            100% {
              background-position: -200% 0;
            }
          }
        `}
      </style>
    </div>
  );
};

export default SearchAnimation;
