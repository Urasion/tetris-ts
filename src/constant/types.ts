export type BoardType = Array<number[]>;

export type Position = {
  x: number;
  y: number;
};

export type UserType = {
  name: string;
  isPlay: boolean;
};

export type Tetromino = Array<number[]>;

export type TetromioState = {
  position: Position;
  shape: Tetromino;
  landPostion: Position;
  nextShape: Tetromino;
};

export type GameSetting = {
  time: number;
  score: number;
  cleanlines: number;
  level: number;
  state: 'ready' | 'stop' | 'gameOver' | 'play';
};
