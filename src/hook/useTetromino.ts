import { useEffect, useRef, useState } from 'react';
import { BoardType, Position, Tetromino } from '../constant/types';
import { initPosition, tetrominos } from '../constant/tetris';
import { useAtom } from 'jotai';
import { tetrominoAtom } from '../store/atom';
import { produce } from 'immer';

export default function useTetromino() {
  const [tetromino, setTetromino] = useAtom(tetrominoAtom);

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
    }
    return false;
  };

  const moveTetrominoLeft = () => {
    {
      console.log(tetromino.position.x);
      setTetromino((prev) => ({
        ...prev,
        position: { x: prev.position.x - 1, y: prev.position.y },
      }));
    }
  };
  const turnTetrominoLeft = () => {
    setTetromino(
      produce(tetromino, (draft) => {
        for (let i = 0; i < tetromino.shape[0].length; i++) {
          for (let j = 0; j < tetromino.shape[0].length; j++) {
            draft.shape[tetromino.shape[0].length - 1 - j][i] =
              tetromino.shape[i][j];
          }
        }
      })
    );
  };
  const moveTetrominoRight = () => {
    if (tetromino.position.x < 9) {
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

  const checkTetrominoException = (board: BoardType) => {
    console.log(
      tetromino.shape.some((col, colIndex) => {
        col.some((row, rowIndex) => {
          const checkLeft =
            tetromino.position.x <= 0 && col[rowIndex - tetromino.position.x];
        });
      })
    );
  };

  const checkTetrominoLand = (board: BoardType) => {};
  const checkTetris = (board: BoardType) => {};
  return {
    tetromino,
    initTetromino,
    checkTetrominoLand,
    checkTetrominoException,
    checkTetris,
    generateTetromino,
    checkIsRange,
    moveTetrominoLeft,
    moveTetrominoRight,
    moveTetrominoBottom,
    turnTetrominoLeft,
  };
}
