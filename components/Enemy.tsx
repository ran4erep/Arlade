import React from 'react';
import { Enemy, DebugOptions, EnemyState } from '../types';
import { TILE_SIZE } from '../constants';
import { ENEMY_SPRITE_BASE64 } from '../assets/actors';

interface EnemyProps {
  enemy: Enemy;
  debugOptions: DebugOptions;
}

const stateMap: { [key in EnemyState]: string } = {
  [EnemyState.PATROLLING]: 'P',
  [EnemyState.HUNTING]: 'H',
  [EnemyState.SEARCHING]: 'S',
};

const EnemyComponent: React.FC<EnemyProps> = ({ enemy, debugOptions }) => {
  return (
    <div
      className="absolute transition-all duration-150 ease-in-out z-20"
      style={{
        left: enemy.pos.x * TILE_SIZE,
        top: enemy.pos.y * TILE_SIZE,
        width: TILE_SIZE,
        height: TILE_SIZE,
      }}
    >
       <img
        src={ENEMY_SPRITE_BASE64}
        alt="Enemy"
        className="w-full h-full"
        style={{ imageRendering: 'pixelated' }}
      />
      {debugOptions.showEnemyStates && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-white text-xs font-bold"
             style={{ textShadow: '1px 1px 2px black' }}>
          {stateMap[enemy.state]}
        </div>
      )}
    </div>
  );
};

export default EnemyComponent;