import { useState, useEffect, useCallback, useRef } from 'react';

export type GameAction = 
  'UP' | 'DOWN' | 'LEFT' | 'RIGHT' | 
  'UP_LEFT' | 'UP_RIGHT' | 'DOWN_LEFT' | 'DOWN_RIGHT' |
  'WAIT';

const keyMap: { [key: string]: GameAction } = {
    'KeyW': 'UP', 'ArrowUp': 'UP',
    'KeyS': 'DOWN', 'ArrowDown': 'DOWN',
    'KeyA': 'LEFT', 'ArrowLeft': 'LEFT',
    'KeyD': 'RIGHT', 'ArrowRight': 'RIGHT',
    'KeyQ': 'UP_LEFT',
    'KeyE': 'UP_RIGHT',
    'KeyZ': 'DOWN_LEFT',
    'KeyX': 'DOWN_RIGHT',
};

export const useGameInput = () => {
  const [action, setAction] = useState<GameAction | null>(null);
  const pressedKeysRef = useRef<Record<string, boolean>>({});

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (pressedKeysRef.current[e.code]) return; // Key already held down

    let gameAction: GameAction | null = null;

    if (e.shiftKey && e.code === 'KeyW') {
      gameAction = 'WAIT';
    } else if (keyMap[e.code]) {
      gameAction = keyMap[e.code];
    }

    if (gameAction) {
      e.preventDefault();
      pressedKeysRef.current[e.code] = true;
      setAction(gameAction);
    }
  }, []);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    if (pressedKeysRef.current[e.code]) {
      e.preventDefault();
      pressedKeysRef.current[e.code] = false;
    }
  }, []);


  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);
  
  // This effect resets the action immediately after it has been set.
  // This ensures the parent component only sees the action for a single render,
  // preventing movement loops.
  useEffect(() => {
    if (action) {
      setAction(null);
    }
  }, [action]);

  return action;
};