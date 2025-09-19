import React from 'react';

interface StatusBarProps {
  playerHealth: number;
  maxHealth: number;
}

const StatusBar: React.FC<StatusBarProps> = ({ playerHealth, maxHealth }) => {
  const healthPercentage = Math.max(0, (playerHealth / maxHealth) * 100);

  const getHealthColor = () => {
    if (healthPercentage > 60) return 'bg-green-500';
    if (healthPercentage > 30) return 'bg-yellow-500';
    return 'bg-red-600';
  };

  return (
    <header className="w-full bg-gray-800 p-2 border-b-2 border-gray-600 shadow-lg flex items-center space-x-2 md:space-x-4 flex-shrink-0">
      <div className="font-bold text-sm md:text-base text-gray-300">HP:</div>
      <div className="w-32 md:w-48 h-5 md:h-6 bg-gray-900 rounded overflow-hidden border border-gray-600">
        <div
          className={`h-full ${getHealthColor()} transition-all duration-300 ease-out`}
          style={{ width: `${healthPercentage}%` }}
        ></div>
      </div>
      <div className="text-sm md:text-base text-gray-200">
        {Math.max(0, playerHealth)}/{maxHealth}
      </div>
    </header>
  );
};

export default StatusBar;