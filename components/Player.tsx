import React from 'react';
import { Position } from '../types';
import { TILE_SIZE } from '../constants';
import { PLAYER_SPRITE_BASE64 } from '../assets/actors';

interface PlayerProps {
  pos: Position;
}

const PlayerComponent: React.FC<PlayerProps> = ({ pos }) => {
  return (
    <div
      className="absolute transition-all duration-150 ease-in-out"
      style={{
        left: pos.x * TILE_SIZE,
        top: pos.y * TILE_SIZE,
        width: TILE_SIZE,
        height: TILE_SIZE,
      }}
    >
      <img
        src={PLAYER_SPRITE_BASE64}
        alt="Player"
        className="w-full h-full"
        style={{ imageRendering: 'pixelated' }}
      />
    </div>
  );
};

export default PlayerComponent;