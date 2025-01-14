import useTetromino from '../../../hook/useTetromino';
import TetrisNode from './TetrisNode';

export default function NextTetris() {
  const { tetromino } = useTetromino();
  return (
    <div className="w-full max-w-[200px] flex flex-col justify-end items-end space-y-4">
      <span className="w-full grow font-bold text-2xl ">Next</span>
      <ul className="w-full max-w-[150px] h-full max-h-[150px]">
        {tetromino.nextShape.map((col, colIndex) => (
          <ul
            className="flex w-full"
            style={{ aspectRatio: 4 / 1 }}
            key={colIndex}
          >
            {col.map((row, rowIndex) => (
              <li
                className={`flex h-full p-1 ${
                  row === 1 && 'border-4 border-black'
                }`}
                style={{ aspectRatio: 1 / 1 }}
                key={rowIndex}
              >
                <div className={`w-full h-full ${row === 1 && ' bg-black'}`} />
              </li>
            ))}
          </ul>
        ))}
      </ul>
    </div>
  );
}
