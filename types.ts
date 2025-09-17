export enum TileType {
  FLOOR,
  WALL,
}

export enum Visibility {
  HIDDEN,
  EXPLORED,
  VISIBLE,
}

export enum EnemyState {
  PATROLLING,
  HUNTING,
  SEARCHING,
}

export interface Position {
  x: number;
  y: number;
}

export interface Enemy {
  id: number;
  pos: Position;
  health: number;
  state: EnemyState;
  lastKnownPlayerPos: Position | null;
  path: Position[] | null;
  patrolCenter: Position;
  patrolTarget: Position | null;
}

export interface Player {
  pos: Position;
  health: number;
}

export interface Room {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface DungeonData {
  map: TileType[][];
  playerStart: Position;
  enemiesStart: Enemy[];
}

export interface DungeonGenerationProgress {
    progress: number;
    message: string;
    result?: DungeonData;
}

export interface Viewport {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface DebugOptions {
  godMode: boolean;
  revealMap: boolean;
  showEnemyVision: boolean;
  showEnemyPaths: boolean;
  showEnemyStates: boolean;
}