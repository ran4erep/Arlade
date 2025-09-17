import React from 'react';
import { MAIN_MENU_BACKGROUND_BASE64 } from '../assets/ui';

interface MainMenuProps {
  onStartGame: () => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onStartGame }) => {
  const menuStyle: React.CSSProperties = {
    backgroundImage: `url(${MAIN_MENU_BACKGROUND_BASE64})`,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    imageRendering: 'pixelated',
  };

  return (
    <div 
      className="flex flex-col items-center justify-end h-full text-white text-center pb-[15%]" 
      style={menuStyle}
    >
      <div className="flex flex-col items-center space-y-4">
        <button
          onClick={onStartGame}
          className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-xl font-semibold transition-transform transform hover:scale-105 shadow-lg"
        >
          Начать новую игру
        </button>
        <button
          className="px-8 py-4 bg-gray-700 hover:bg-gray-600 rounded-lg text-xl font-semibold transition-transform transform hover:scale-105 shadow-lg cursor-not-allowed opacity-75"
          disabled
        >
          Настройки
        </button>
      </div>
    </div>
  );
};

export default MainMenu;