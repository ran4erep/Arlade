import React, { useState, useCallback } from 'react';
import MainMenu from './components/MainMenu';
import Game from './components/Game';
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

  const startGame = useCallback(async () => {
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
  }, []);

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
          <div className="flex flex-col items-center justify-center h-full text-white text-center">
            <h1 className="text-5xl font-bold mb-4 text-red-500 leading-relaxed">Игра окончена</h1>
            <p className="text-lg mb-8">Вы были повержены.</p>
            <div className="space-x-4">
              <button
                onClick={restartGame}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg font-semibold transition-transform transform hover:scale-105"
              >
                Попробовать снова
              </button>
              <button
                onClick={backToMenu}
                className="px-8 py-4 bg-gray-700 hover:bg-gray-600 rounded-lg text-lg font-semibold transition-transform transform hover:scale-105"
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
       <div className="flex-grow min-h-0">
         {renderContent()}
       </div>
    </div>
  );
};

export default App;
