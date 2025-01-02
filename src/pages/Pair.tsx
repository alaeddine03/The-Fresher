import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Smartphone, Scan } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Pair = () => {
  const navigate = useNavigate();
  const [showDevices, setShowDevices] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const devices = [
    'FRSH-6523-UE76-123P',
    'FRSH-5488-YH78-P7KJ',
    'FRSH-8788-ON87-BEY7',
  ];

  const handleScan = () => {
    setIsScanning(true);
    // Simulate scanning delay
    setTimeout(() => {
      setIsScanning(false);
      setShowDevices(true);
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 animate-fade-in">
      <div className="w-16 h-16 mb-4 text-primary">
        <svg viewBox="0 0 24 24" className="w-full h-full">
          <path
            fill="currentColor"
            d="M12 3C7.41 3 3.86 4.53 0.957 6.79L3.79 9.62C6.04 7.91 8.5 7 12 7C15.5 7 17.96 7.91 20.21 9.62L23.04 6.79C20.14 4.53 16.59 3 12 3M12 11C10.04 11 8.14 11.47 6.41 12.4L9.24 15.23C10.13 14.77 11.05 14.5 12 14.5C12.95 14.5 13.87 14.77 14.76 15.23L17.59 12.4C15.86 11.47 13.96 11 12 11M12 19C11.05 19 10.13 18.73 9.24 18.27L6.41 21.1C8.14 22.03 10.04 22.5 12 22.5C13.96 22.5 15.86 22.03 17.59 21.1L14.76 18.27C13.87 18.73 12.95 19 12 19Z"
          />
        </svg>
      </div>

      {!showDevices && !isScanning && (
        <div className="text-center">
          <h2 className="text-xl font-bold mb-8">Ready to Connect</h2>
          <Button 
            onClick={handleScan}
            size="lg"
            className="gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
          >
            <Scan className="w-5 h-5" />
            Scan Devices
          </Button>
        </div>
      )}

      {isScanning && (
        <div className="text-center">
          <h2 className="text-xl font-bold mb-8">Scanning for Devices...</h2>
          <div className="relative w-20 h-20 mx-auto mb-4">
            <div className="absolute inset-0 border-4 border-primary rounded-full animate-ping opacity-20"></div>
            <div className="absolute inset-2 border-4 border-primary rounded-full animate-ping opacity-40 delay-300"></div>
            <div className="absolute inset-4 border-4 border-primary rounded-full animate-ping opacity-60 delay-600"></div>
          </div>
          <p className="text-gray-500 animate-pulse">This may take a moment</p>
        </div>
      )}

      {showDevices && !isScanning && (
        <>
          <h2 className="text-xl font-bold mb-8">Available Devices</h2>
          <div className="w-full max-w-md space-y-4">
            {devices.map((device, index) => (
              <button
                key={device}
                onClick={() => navigate('/search')}
                className={`w-full p-4 flex items-center space-x-3 border rounded-lg bg-white shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 animate-fade-in`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <Smartphone className="text-primary" />
                <span className="font-medium">{device}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Pair;