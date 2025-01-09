import { useEffect, useState } from 'react';
import { generateTetromino } from '../util/tetrisUtil';
import { initTetrisBoard } from '../constant/tetris';
import { produce } from 'immer';
import Board from '../components/layout/object/Board';
import useTimer from '../hook/useTimer';
const test = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16],
];
export default function PlayPage() {
  const [tetrisBoard, setTetrisBoard] =
    useState<Array<number[]>>(initTetrisBoard);
  const { timerCount, runTimer, stopTimer } = useTimer();
  useEffect(() => {
    runTimer(tetrisBoard);
  }, []);

  function turnRight() {
    let temp = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];

    return temp;
  }

  return (
    <div className="w-full h-[911px] flex">
      <Board board={tetrisBoard} />
      <button
        onClick={() => {
          stopTimer();
          console.log(turnRight());
        }}
      >
        asdasd
      </button>
      <span>{timerCount}</span>
    </div>
  );
}
