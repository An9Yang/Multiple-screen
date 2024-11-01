export interface Game {
  id: number;
  title: string;
  league: string;
  status: string;
  minute: string;
  score: string;
  streamUrl: string;
}

export interface WindowPosition {
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
}

export interface Position {
  x: number;
  y: number;
}