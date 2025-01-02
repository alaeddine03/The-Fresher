import React from 'react';

interface FreshnessBarProps {
  percentage: number;
}

export const FreshnessBar = ({ percentage }: FreshnessBarProps) => {
  const getColor = (value: number) => {
    if (value < 40) return 'bg-red-500';
    if (value < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="w-full group">
      <div className="flex justify-between mb-2">
        <span className="text-red-500 font-medium group-hover:scale-110 transition-transform duration-300">BAD</span>
        <span className="text-green-500 font-medium group-hover:scale-110 transition-transform duration-300">GOOD</span>
      </div>
      <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${getColor(percentage)} transition-all duration-1000 ease-out`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="text-right mt-1">
        <span className="font-medium group-hover:text-primary transition-colors duration-300">{percentage}%</span>
      </div>
    </div>
  );
};