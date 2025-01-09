import { useRef, useState } from 'react';
import { BoardType, Position, Tetromino } from '../constant/types';
import { initPosition, tetrominos } from '../constant/tetris';
import { useAtom } from 'jotai';
import { tetrominoAtom } from '../store/atom';
import { produce } from 'immer';

export default function useTetromino() {
  const [tetromino, setTetromino] = useAtom(tetrominoAtom);
  const { position, shape } = tetromino;

  const initTetromino = () => {
    setTetromino((prev) => ({ ...prev, position: initPosition }));
  };

  const generateTetromino = () => {
    const randomTetromino = Math.floor(Math.random() * 7);
    setTetromino((prev) => ({ ...prev, shape: tetrominos[randomTetromino] }));
  };

  const checkIsRange = (colIndex: number, rowIndex: number) => {
    if (
      colIndex >= tetromino.position.y &&
      colIndex < tetromino.position.y + tetromino.shape[0].length &&
      rowIndex >= tetromino.position.x &&
      rowIndex < tetromino.position.x + tetromino.shape[0].length
    ) {
      return true;
    } else {
      return false;
    }
  };

  const moveTetrominoLeft = () => {};
  const turnTetrominoLeft = () => {};
  const moveTetrominoRight = () => {};
  const moveTetrominoBottom = () => {
    setTetromino((prev) => ({
      ...prev,
      position: { x: prev.position.x, y: prev.position.y + 1 },
    }));
  };

  const checkTetrominoLand = (board: BoardType) => {};
  const checkTetris = (board: BoardType) => {};
  return {
    tetromino,
    initTetromino,
    checkTetrominoLand,
    checkTetris,
    generateTetromino,
    checkIsRange,
    moveTetrominoLeft,
    moveTetrominoRight,
    moveTetrominoBottom,
    turnTetrominoLeft,
  };
}
