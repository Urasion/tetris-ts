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
      colIndex >= position.y &&
      colIndex <= position.y + 3 &&
      rowIndex >= position.x &&
      rowIndex <= position.x + 3
    ) {
      return false;
    }
    return true;
  };

  const moveTetrominoLeft = () => {
    if (tetromino.position.x >= 0) {
      setTetromino((prev) => ({
        ...prev,
        position: { x: prev.position.x - 1, y: prev.position.y },
      }));
    }
  };
  const turnTetrominoLeft = () => {
    setTetromino(
      produce(tetromino, (draft) => {
        for (let i = 0; i < 4; i++) {
          for (let j = 0; j < 4; j++) {
            draft.shape[3 - j][i] = tetromino.shape[i][j];
          }
        }
      })
    );
  };
  const moveTetrominoRight = () => {
    if (tetromino.position.x < 9) {
      console.log(tetromino.position.x);
      setTetromino((prev) => ({
        ...prev,
        position: { x: prev.position.x + 1, y: prev.position.y },
      }));
    }
  };
  const moveTetrominoBottom = () => {
    setTetromino((prev) => ({
      ...prev,
      position: { x: prev.position.x, y: prev.position.y + 1 },
    }));
  };

  const checkTetrominoLand = (board: BoardType) => {
    for (let i = position.y; i < position.y + 4; i++) {
      for (let j = position.x; j < position.x; j++) {
        if (
          (shape[i][j] === 1 && board[i + 1][j] === 1) ||
          (shape[i][j] && i == 19)
        ) {
          return true;
        }
      }
    }
    return false;
  };
  const checkTetris = (board: BoardType) => {
    let tetrisPosition = [];
    for (let i = position.y + 3; i >= position.y; i--) {
      let tetrisFlag = true;
      for (let j = 0; j < 10; j++) {
        if (board[i][j] === 0) {
          tetrisFlag = false;
        }
      }
      if (tetrisFlag) {
        tetrisPosition.push(i);
      }
    }
    return tetrisPosition;
  };
  return {
    position,
    shape,
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
