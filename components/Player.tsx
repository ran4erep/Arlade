import React from 'react';
import { Position } from '../types';
import { PLAYER_SPRITE_BASE64 } from '../assets/actors';

interface PlayerProps {
  pos: Position;
  tileSize: number;
}

const PlayerComponent: React.FC<PlayerProps> = ({ pos, tileSize }) => {
  return (
    <div
      className="absolute transition-all duration-150 ease-in-out"
      style={{
        left: pos.x * tileSize,
        top: pos.y * tileSize,
        width: tileSize,
        height: tileSize,
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