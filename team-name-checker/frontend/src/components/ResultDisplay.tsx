
import React from 'react';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ResultDisplayProps {
  teamName: string;
  exists: boolean | null;
  isVisible: boolean;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ 
  teamName, 
  exists, 
  isVisible 
}) => {
  if (!isVisible || exists === null) return null;

  return (
    <div 
      className={cn(
        "mt-8 p-6 rounded-2xl glass result-card transition-all duration-500 animate-scale-in",
        exists ? "taken border-red-200" : "available border-green-200",
        isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-4"
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className={cn(
            "inline-flex items-center px-3 py-1 text-xs font-medium rounded-full mb-2",
            exists ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
          )}>
            {exists ? "Unavailable" : "Available"}
          </div>
          <h3 className="text-2xl font-medium text-gray-900">
            "{teamName}"
          </h3>
          <p className="mt-2 text-gray-600">
            {exists 
              ? "This team name is already taken. Please try another name." 
              : "This team name is available for registration."}
          </p>
        </div>
        <div className={cn(
          "flex items-center justify-center w-14 h-14 rounded-full",
          exists 
            ? "bg-red-100 text-red-500" 
            : "bg-green-100 text-green-500"
        )}>
          {exists ? <X size={24} /> : <Check size={24} />}
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
