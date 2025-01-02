import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '@/components/Logo';

const Home = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/pair');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 animate-fade-in">
      <img src="src/assets/logo.png" alt="logo" width={200} height={200}/>
    </div>
  );
};

export default Home;