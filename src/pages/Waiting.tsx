import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '@/components/Logo';

const Waiting = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/loading');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 animate-fade-in">
      <img src="src/assets/logo.png" alt="logo" width={200} height={200}/>
      <div className="mt-8 mb-8 w-64 h-64 relative overflow-hidden rounded-xl shadow-xl transform hover:scale-105 transition-transform duration-300">
        <img 
          src="src\assets\bowl.png" 
          alt="Bowl of fruits"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end justify-center p-4">
          <p className="text-white text-center font-medium">Ready for Testing</p>
        </div>
      </div>
      <div className="mt-4 max-w-xs text-center">
        <p className="text-red-500 italic text-lg animate-pulse">
          Please inject the device into the fruit or vegetable!
        </p>
      </div>
    </div>
  );
};

export default Waiting;