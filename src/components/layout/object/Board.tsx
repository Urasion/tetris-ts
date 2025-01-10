import { useEffect } from 'react';
import { BoardType } from '../../../constant/types';
import useTetromino from '../../../hook/useTetromino';
import { useAtomValue } from 'jotai';
import { boardAtom } from '../../../store/atom';

type BoardProps = {};
export default function Board({}: BoardProps) {
  const board = useAtomValue(boardAtom);
  const {
    tetromino,
    checkIsRange,
    moveTetrominoLeft,
    moveTetrominoRight,
    moveTetrominoBottom,
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
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [tetromino]);
  return (
    <div className="w-[450px] h-[900px] flex flex-col bg-rose-300 p-4">
      {board.map((col, colIndex) => (
        <div className="w-full h-[45px] flex bg-violet-300">
          {col.map((row, rowIndex) => (
            <div
              className={`w-[45px] h-full  border ${
                checkIsRange(colIndex, rowIndex) && row === 0
                  ? tetromino.shape[colIndex - tetromino.position.y][
                      rowIndex - tetromino.position.x
                    ] === 1
                    ? 'bg-green-300'
                    : 'bg-blue-300'
                  : row === 1
                  ? 'bg-violet-300'
                  : 'bg-blue-300'
              }`}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
}
