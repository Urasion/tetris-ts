import { useEffect } from 'react';
import { BoardType } from '../../../constant/types';
import useTimer from '../../../hook/useTimer';
import useTetromino from '../../../hook/useTetromino';

type BoardProps = {
  board: BoardType;
};
export default function Board({ board }: BoardProps) {
  const {
    tetromino,
    checkIsRange,
    moveTetrominoLeft,
    moveTetrominoRight,
    turnTetrominoLeft,
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
        case ' ':
          turnTetrominoLeft();
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  return (
    <div className="w-[450px] h-[900px] flex flex-col bg-rose-300 p-4">
      {board.map((col, colIndex) => (
        <div className="w-full h-[45px] flex bg-violet-300">
          {col.map((row, rowIndex) => (
            <div
              className={`w-[45px] h-full  border ${
                checkIsRange(colIndex, rowIndex)
                  ? 'bg-rose-300'
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
