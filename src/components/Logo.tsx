import React from 'react';

export const Logo = () => {
  return (
    <div className="flex items-center space-x-2">
      <div className="relative w-10 h-10">
        <div className="absolute w-8 h-3 bg-secondary transform rotate-45 top-2 left-0"></div>
        <div className="absolute w-8 h-3 bg-primary transform -rotate-45 bottom-2 right-0"></div>
      </div>
      <h1 className="text-2xl font-bold">The Fresher</h1>
    </div>
  );
};