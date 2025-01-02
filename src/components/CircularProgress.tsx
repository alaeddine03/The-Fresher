import React from 'react';

interface CircularProgressProps {
  value: number;
  max: number;
  label: string;
  color?: string;
}

export const CircularProgress = ({ value, max, label, color = 'primary' }: CircularProgressProps) => {
  const [currentValue, setCurrentValue] = React.useState(0);
  
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentValue(value);
    }, 100);
    return () => clearTimeout(timer);
  }, [value]);

  const percentage = (currentValue / max) * 100;
  const strokeDasharray = 2 * Math.PI * 45;
  const strokeDashoffset = strokeDasharray * ((100 - percentage) / 100);

  return (
    <div className="flex flex-col items-center group">
      <div className="relative w-32 h-32">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            className="text-gray-200"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r="45"
            cx="50"
            cy="50"
          />
          <circle
            className={`text-${color} transition-all duration-1000 ease-out`}
            strokeWidth="8"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="45"
            cx="50"
            cy="50"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold transition-transform duration-300 hover:scale-110">
            {currentValue}
          </span>
        </div>
      </div>
      <span className="mt-2 text-lg font-medium text-gray-700">{label}</span>
    </div>
  );
};