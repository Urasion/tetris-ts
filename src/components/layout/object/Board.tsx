import { useEffect, useState } from 'react';
import useTetromino from '../../../hook/useTetromino';
import { useAtomValue } from 'jotai';
import { boardAtom } from '../../../store/atom';
import TetrisNode from './TetrisNode';
import { GameSetting } from '../../../constant/types';

export default function Board({ gameSetting }: { gameSetting: GameSetting }) {
  const board = useAtomValue(boardAtom);
  const {
    tetromino,
    checkIsRange,
    checkIsDropRange,
    moveTetrominoLeft,
    moveTetrominoRight,
    moveTetrominoBottom,
    dropTetrominoBottom,

    turnTetromino,
  } = useTetromino();
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          moveTetrominoLeft();
          break;
        case 'ArrowRight':
          moveTetrominoRight();
          break;
        case 'ArrowDown':
          moveTetrominoBottom();
          break;
        case 'ArrowUp':
          turnTetromino();
          break;
        case ' ':
          dropTetrominoBottom();
          break;
      }
    };
    if (gameSetting.state === 'play') {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [tetromino, gameSetting.state]);
  return (
    <div
      className="h-5/6 flex flex-col p-4 bg-[#9EAD86] border-black border-4 space-y-1"
      style={{ aspectRatio: 1 / 2 }}
    >
      {board.map(
        (col, colIndex) =>
          colIndex > 3 && (
            <div
              className="flex w-full space-x-1 "
              style={{ aspectRatio: 11 / 1 }}
            >
              {col.map((row, rowIndex) => (
                <TetrisNode
                  isDropTeromino={
                    checkIsDropRange(colIndex, rowIndex) &&
                    tetromino.shape[colIndex - tetromino.landPostion.y][
                      rowIndex - tetromino.landPostion.x
                    ] === 1
                  }
                  isTeromino={checkIsRange(colIndex, rowIndex) && row === 0}
                  isTerominoNodeEmpty={
                    checkIsRange(colIndex, rowIndex) &&
                    row === 0 &&
                    tetromino.shape[colIndex - tetromino.position.y][
                      rowIndex - tetromino.position.x
                    ] === 1
                  }
                  isBoardNodeEmpty={row === 1}
                />
              ))}
            </div>
          )
      )}
    </div>
  );
}
