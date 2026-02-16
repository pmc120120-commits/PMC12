
import React from 'react';

const Logo: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const dimensions = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-24 h-24'
  };

  return (
    <div className={`relative flex items-center justify-center ${dimensions[size]}`}>
      {/* Background Circle */}
      <div className="absolute inset-0 bg-white rounded-full shadow-lg border-2 border-blue-100 flex items-center justify-center overflow-hidden">
        {/* Shield and Content Simulation */}
        <div className="w-[80%] h-[80%] bg-blue-700 rounded-b-full relative flex flex-col items-center justify-center text-white overflow-hidden">
            <div className="absolute top-0 w-full h-1/3 bg-blue-900 opacity-20"></div>
            <span className="font-bold text-[8px] sm:text-[10px] tracking-widest mt-1">PMC</span>
            <span className="text-[6px] sm:text-[8px] opacity-80">12</span>
            {/* Laurel wreath simulation */}
            <div className="absolute bottom-0 w-full flex justify-between px-1 opacity-40">
                <div className="w-1 h-2 bg-yellow-400 rounded-full rotate-45"></div>
                <div className="w-1 h-2 bg-yellow-400 rounded-full -rotate-45"></div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Logo;
