import React, { useState, useCallback, useEffect } from 'react';
import MainMenu from './components/MainMenu';
import Game from './components/Game';
import OrientationLock from './components/OrientationLock';
import { generateDungeon } from './hooks/useDungeonGenerator';
import { DungeonData } from './types';

type GameState = 'menu' | 'loading' | 'playing' | 'gameOver';

const LoadingScreen: React.FC<{ progress: number; message: string }> = ({ progress, message }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-white bg-gray-900">
      <div className="w-1/2 max-w-lg mb-4">
        <h1 className="text-3xl font-bold mb-4 text-center">Генерация подземелья...</h1>
        <div className="w-full bg-gray-700 rounded-full h-8 border-2 border-gray-600">
          <div
            className="bg-blue-600 h-full rounded-full text-center text-white flex items-center justify-center transition-all duration-300 ease-linear"
            style={{ width: `${progress}%` }}
          >
            {Math.round(progress)}%
          </div>
        </div>
        <p className="text-center mt-4 text-lg text-gray-400">{message}</p>
      </div>
    </div>
  );
};


const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('menu');
  const [gameId, setGameId] = useState(1);
  const [dungeonData, setDungeonData] = useState<DungeonData | null>(null);
  const [loadingProgress, setLoadingProgress] = useState({ progress: 0, message: '' });

  const [isTouchDevice] = useState('ontouchstart' in window || navigator.maxTouchPoints > 0);
  const [isPortrait, setIsPortrait] = useState(isTouchDevice ? window.matchMedia("(orientation: portrait)").matches : false);

  useEffect(() => {
    if (!isTouchDevice) return;

    const mediaQuery = window.matchMedia("(orientation: portrait)");
    const handleChange = (e: MediaQueryListEvent) => setIsPortrait(e.matches);
    
    mediaQuery.addEventListener('change', handleChange);
    
    // Initial check
    setIsPortrait(mediaQuery.matches);

    return () => {
        mediaQuery.removeEventListener('change', handleChange);
    };
  }, [isTouchDevice]);

  const enterFullScreen = useCallback(() => {
    const element = document.documentElement as HTMLElement & {
      mozRequestFullScreen?: () => Promise<void>;
      webkitRequestFullscreen?: () => Promise<void>;
      msRequestFullscreen?: () => Promise<void>;
    };

    const doc = document as Document & {
      mozFullScreenElement?: Element;
      webkitFullscreenElement?: Element;
      msFullscreenElement?: Element;
    };

    if (
      !doc.fullscreenElement &&
      !doc.webkitFullscreenElement &&
      !doc.mozFullScreenElement &&
      !doc.msFullscreenElement
    ) {
      if (element.requestFullscreen) {
        element.requestFullscreen().catch(err => {
            console.warn(`Fullscreen request failed: ${err.message}`);
        });
      } else if (element.mozRequestFullScreen) { // Firefox
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) { // Chrome, Safari & Opera
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) { // IE/Edge
        element.msRequestFullscreen();
      }
    }
  }, []);

  const startGame = useCallback(async () => {
    enterFullScreen();
    setGameState('loading');
    setLoadingProgress({ progress: 0, message: 'Начало генерации...' });
    
    const generator = generateDungeon(); 
    for await (const update of generator) {
        setLoadingProgress({ progress: update.progress, message: update.message });
        if (update.result) {
            setDungeonData(update.result);
            setGameState('playing');
        }
    }
  }, [enterFullScreen]);

  const endGame = useCallback(() => {
    setGameState('gameOver');
  }, []);

  const restartGame = useCallback(() => {
    setGameId(prevId => prevId + 1);
    startGame();
  }, [startGame]);

  const backToMenu = useCallback(() => {
    setGameId(prevId => prevId + 1);
    setDungeonData(null);
    setGameState('menu');
  }, []);

  const renderContent = () => {
    switch (gameState) {
      case 'loading':
        return <LoadingScreen progress={loadingProgress.progress} message={loadingProgress.message} />;
      case 'playing':
        if (!dungeonData) return null; // Should not happen in normal flow
        return <Game key={gameId} onGameOver={endGame} dungeonData={dungeonData} />;
      case 'gameOver':
        return (
          <div className="flex flex-col items-center justify-center h-full text-white text-center p-4">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-red-500 leading-relaxed">Игра окончена</h1>
            <p className="text-base md:text-lg mb-8">Вы были повержены.</p>
            <div className="space-x-4">
              <button
                onClick={restartGame}
                className="px-6 py-3 md:px-8 md:py-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-base md:text-lg font-semibold transition-transform transform hover:scale-105"
              >
                Попробовать снова
              </button>
              <button
                onClick={backToMenu}
                className="px-6 py-3 md:px-8 md:py-4 bg-gray-700 hover:bg-gray-600 rounded-lg text-base md:text-lg font-semibold transition-transform transform hover:scale-105"
              >
                Главное меню
              </button>
            </div>
          </div>
        );
      case 'menu':
      default:
        return <MainMenu onStartGame={startGame} />;
    }
  };

  return (
    <div className="bg-gray-900 h-screen w-screen flex flex-col">
       {isTouchDevice && isPortrait ? (
         <OrientationLock />
       ) : (
         <div className="flex-grow min-h-0">
           {renderContent()}
         </div>
       )}
    </div>
  );
};

export default App;