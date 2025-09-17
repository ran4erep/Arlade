import React from 'react';
import { DebugOptions } from '../types';

interface DebugMenuProps {
  options: DebugOptions;
  onOptionChange: <K extends keyof DebugOptions>(option: K, value: DebugOptions[K]) => void;
  onClose: () => void;
}

const DebugMenu: React.FC<DebugMenuProps> = ({ options, onOptionChange, onClose }) => {
  return (
    <div className="absolute top-4 right-4 bg-gray-800 bg-opacity-90 border-2 border-gray-600 rounded-lg p-4 text-white text-xs shadow-xl z-50">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-base font-bold text-gray-300">Отладка</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-white font-bold text-xl leading-none">&times;</button>
      </div>
      <ul className="space-y-3">
        <li>
          <label className="flex items-center space-x-2 cursor-pointer text-gray-300 hover:text-white">
            <input
              type="checkbox"
              checked={options.godMode}
              onChange={(e) => onOptionChange('godMode', e.target.checked)}
              className="h-4 w-4 text-blue-500 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-offset-0 focus:ring-2"
            />
            <span>Бессмертие</span>
          </label>
        </li>
        <li>
          <label className="flex items-center space-x-2 cursor-pointer text-gray-300 hover:text-white">
            <input
              type="checkbox"
              checked={options.revealMap}
              onChange={(e) => onOptionChange('revealMap', e.target.checked)}
               className="h-4 w-4 text-blue-500 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-offset-0 focus:ring-2"
            />
            <span>Открыть карту</span>
          </label>
        </li>
        <li>
          <label className="flex items-center space-x-2 cursor-pointer text-gray-300 hover:text-white">
            <input
              type="checkbox"
              checked={options.showEnemyVision}
              onChange={(e) => onOptionChange('showEnemyVision', e.target.checked)}
               className="h-4 w-4 text-blue-500 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-offset-0 focus:ring-2"
            />
            <span>Показать зрение врагов</span>
          </label>
        </li>
        <li>
          <label className="flex items-center space-x-2 cursor-pointer text-gray-300 hover:text-white">
            <input
              type="checkbox"
              checked={options.showEnemyPaths}
              onChange={(e) => onOptionChange('showEnemyPaths', e.target.checked)}
               className="h-4 w-4 text-blue-500 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-offset-0 focus:ring-2"
            />
            <span>Показать пути врагов</span>
          </label>
        </li>
        <li>
          <label className="flex items-center space-x-2 cursor-pointer text-gray-300 hover:text-white">
            <input
              type="checkbox"
              checked={options.showEnemyStates}
              onChange={(e) => onOptionChange('showEnemyStates', e.target.checked)}
               className="h-4 w-4 text-blue-500 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-offset-0 focus:ring-2"
            />
            <span>Показать состояния врагов</span>
          </label>
        </li>
      </ul>
    </div>
  );
};

export default DebugMenu;