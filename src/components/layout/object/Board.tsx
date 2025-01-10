import { useEffect } from 'react';
import useTetromino from '../../../hook/useTetromino';
import { useAtomValue } from 'jotai';
import { boardAtom } from '../../../store/atom';
import TetrisNode from './TetrisNode';

type BoardProps = { isGameOver: boolean };
export default function Board({ isGameOver }: BoardProps) {
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
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [tetromino]);
  return (
    <div className="w-[450px] h-[900px] flex flex-col p-4">
      {board.map(
        (col, colIndex) =>
          colIndex > 3 && (
            <div className="w-full h-[45px] flex ">
              {col.map((row, rowIndex) => (
                <TetrisNode
                  isGameOver={isGameOver}
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
