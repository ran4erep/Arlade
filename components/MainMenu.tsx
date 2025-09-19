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

  return (
    <div
      className="relative flex flex-col h-full text-white"
      style={menuStyle}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40 z-0"></div>
      
      <div className="relative z-10 flex flex-col flex-grow justify-between p-4 sm:p-8 md:p-12 lg:p-16">
        {/* Top-left aligned title */}
        <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-1 sm:mb-2 text-yellow-300" style={{ textShadow: '3px 3px 0px #000' }}>
              Arlade
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300" style={{ textShadow: '2px 2px 0px #000' }}>
                A roguelike adventure
            </p>
        </div>

        {/* Centered buttons */}
        <div className="flex flex-col items-center space-y-2 sm:space-y-4">
          <button
            onClick={onStartGame}
            className="px-4 py-2 text-sm sm:px-6 sm:py-3 sm:text-base md:px-8 md:py-4 md:text-xl bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-transform transform hover:scale-105 shadow-lg border-2 border-blue-400"
          >
            Начать новую игру
          </button>
          <button
            className="px-4 py-2 text-sm sm:px-6 sm:py-3 sm:text-base md:px-8 md:py-4 md:text-xl bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition-transform transform hover:scale-105 shadow-lg cursor-not-allowed opacity-75 border-2 border-gray-500"
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