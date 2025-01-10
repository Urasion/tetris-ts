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
};
