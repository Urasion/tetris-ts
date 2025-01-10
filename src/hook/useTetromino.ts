import { useEffect, useRef, useState } from 'react';
import { BoardType, Position, Tetromino } from '../constant/types';
import { initPosition, tetrominos } from '../constant/tetris';
import { useAtom } from 'jotai';
import { boardAtom, tetrominoAtom } from '../store/atom';
import { produce } from 'immer';

export default function useTetromino() {
  const [tetromino, setTetromino] = useAtom(tetrominoAtom);
  const [board, setBoard] = useAtom(boardAtom);

  const generateTetromino = () => {
    const randomTetromino = Math.floor(Math.random() * 7);
    console.log(randomTetromino);
    setTetromino((prev) => ({
      position: initPosition,
      shape: tetrominos[randomTetromino],
    }));
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

  const moveTetrominoLeft = () => {
    if (checkPositionIsBorderLeft()) {
      setTetromino((prev) => ({
        ...prev,
        position: { x: prev.position.x - 1, y: prev.position.y },
      }));
    }
  };
  const turnTetromino = () => {
    const length = tetromino.shape[0].length - 1;
    const newShape = Array.from({ length: length + 1 }, () =>
      Array(length + 1).fill(0)
    );
    for (let col = 0; col <= length; col++) {
      for (let row = 0; row <= length; row++) {
        newShape[col][row] = tetromino.shape[length - row][col];
      }
    }
    setTetromino((prev) => ({ ...prev, shape: newShape }));
  };

  const moveTetrominoRight = () => {
    if (checkPositionIsBorderRight()) {
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
  const checkPositionIsBorderLeft = () => {
    return tetromino.shape.every((col, colIndex) =>
      col.every((row, rowIndex) => {
        if (row === 1 && tetromino.position.x + rowIndex === 0) {
          return false;
        }
        return true;
      })
    );
  };
  const checkPositionIsBorderRight = () => {
    return tetromino.shape.every((col, colIndex) =>
      col.every((row, rowIndex) => {
        if (
          row === 1 &&
          tetromino.position.x + rowIndex === board[0].length - 1
        ) {
          return false;
        }
        return true;
      })
    );
  };
  const renderBoard = () => {
    const newBoard = board.map((col, colIndex) =>
      col.map((row, rowIndex) => {
        if (checkIsRange(colIndex, rowIndex) && row === 0) {
          return tetromino.shape[colIndex - tetromino.position.y][
            rowIndex - tetromino.position.x
          ];
        }
        return row;
      })
    );
    checkTetris(newBoard);
    setBoard(newBoard);
  };
  const checkTetrominoLand = () => {
    return tetromino.shape.some((col, colIndex) =>
      col.some((row, rowIndex) => {
        if (row === 1 && tetromino.position.y + colIndex === board.length - 1) {
          return true;
        } else if (
          tetromino.position.y + colIndex < board.length - 2 &&
          row === 1 &&
          board[tetromino.position.y + colIndex + 1][
            tetromino.position.x + rowIndex
          ] === 1
        ) {
          return true;
        }
        return false;
      })
    );
  };

  const checkTetris = (board: BoardType) => {
    const index: number[] = [];
    board.map((col, colIndex) => {
      if (col.every((row) => row === 1)) {
        index.push(colIndex);
        return col;
      }
    });
    console.log(index);
    index.map((value, valueIndex) => {
      board.splice(value - valueIndex, 1);
    });
    index.map(() => {
      board.unshift(Array(board[0].length).fill(0));
    });
  };
  return {
    tetromino,
    checkTetrominoLand,
    checkTetris,
    generateTetromino,
    checkIsRange,
    moveTetrominoLeft,
    moveTetrominoRight,
    moveTetrominoBottom,
    turnTetromino,
    renderBoard,
  };
}
