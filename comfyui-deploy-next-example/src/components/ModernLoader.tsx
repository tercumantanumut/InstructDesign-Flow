import React from 'react';

interface ModernLoaderProps {
  status?: string;
  progress?: number;
}

export const ModernLoader: React.FC<ModernLoaderProps> = ({
  status = "Transforming your design",
  progress = 0
}) => {
  return (
    <div className="relative w-full h-full min-h-[400px] flex items-center justify-center">
      <div className="relative">
        {/* Simple spinner */}
        <div className="relative w-16 h-16 mx-auto mb-4">
          {/* Minimal progress ring */}
          <svg className="w-16 h-16 -rotate-90">
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              className="text-gray-200"
            />
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 28}`}
              strokeDashoffset={`${2 * Math.PI * 28 * (1 - progress / 100)}`}
              className="text-yellow-400 transition-all duration-700 ease-out"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Status text */}
        <div className="text-center">
          <p className="text-gray-400 text-sm">
            {status}
          </p>

          {/* Simple dots */}
          <div className="flex justify-center space-x-1 mt-2">
            <span className="w-1 h-1 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
            <span className="w-1 h-1 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '200ms' }} />
            <span className="w-1 h-1 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '400ms' }} />
          </div>
        </div>
      </div>
    </div>
  );
};