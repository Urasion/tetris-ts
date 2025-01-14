import { BoardType, GameSetting, TetromioState } from './../constant/types';
import { atom } from 'jotai';
import { UserType } from '../constant/types';
import { initPosition, initTetrisBoard, tetrominos } from '../constant/tetris';

export const userAtom = atom<UserType>({
  name: 'jjw',
  isPlay: false,
});

export const gameSettingAtom = atom<GameSetting>({
  time: 0,
  score: 0,
  state: 'ready',
  level: 1,
  cleanlines: 0,
});
export const boardAtom = atom<BoardType>(initTetrisBoard);
export const tetrominoAtom = atom<TetromioState>({
  position: initPosition,
  shape: tetrominos[0],
  landPostion: initPosition,
  nextShape: tetrominos[0],
});
export const timerAtom = atom<NodeJS.Timer>();
