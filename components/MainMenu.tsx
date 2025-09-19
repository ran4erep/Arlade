import React from 'react';
import { MAIN_MENU_BACKGROUND_URL } from '../assets/ui';

interface MainMenuProps {
  onStartGame: () => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onStartGame }) => {
  const menuStyle: React.CSSProperties = {
    backgroundImage: `url(${MAIN_MENU_BACKGROUND_URL})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    imageRendering: 'pixelated',
  };

  // Define dynamic styles using clamp for fluid scaling based on viewport size
  const titleStyle: React.CSSProperties = {
    fontSize: 'clamp(1rem, 4vw, 3rem)',
    textShadow: '3px 3px 0px #000',
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: 'clamp(0.75rem, 3vw, 1.5rem)',
    textShadow: '2px 2px 0px #000',
  };
  
  const buttonStyle: React.CSSProperties = {
    fontSize: 'clamp(0.8rem, 2vw, 1.1rem)',
    padding: 'clamp(0.5rem, 1.5vh, 0.8rem) clamp(1rem, 3vw, 1.75rem)',
  };

  return (
    <div
      className="relative flex flex-col h-full text-white"
      style={menuStyle}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40 z-0"></div>
      
      {/* Adjusted padding for smaller screens */}
      <div className="relative z-10 flex flex-col flex-grow justify-between p-4 md:p-8 lg:p-16">
        {/* Top-left aligned title */}
        <div>
            <h1 
              className="mb-1 sm:mb-2 text-yellow-300" 
              style={titleStyle}
            >
              Arlade
            </h1>
            <p 
              className="text-gray-300" 
              style={subtitleStyle}
            >
                A roguelike adventure
            </p>
        </div>

        {/* Centered buttons with dynamic sizing */}
        <div className="flex flex-col items-center space-y-2 sm:space-y-4">
          <button
            onClick={onStartGame}
            className="bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-transform transform hover:scale-105 shadow-lg border-2 border-blue-400"
            style={buttonStyle}
          >
            Начать новую игру
          </button>
          <button
            className="bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition-transform transform hover:scale-105 shadow-lg cursor-not-allowed opacity-75 border-2 border-gray-500"
            style={buttonStyle}
            disabled
          >
            Настройки
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
