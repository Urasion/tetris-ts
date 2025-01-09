import { useEffect, useState } from 'react';
import { generateTetromino } from '../util/tetrisUtil';
import { initTetrisBoard } from '../constant/tetris';
import { produce } from 'immer';
import Board from '../components/layout/object/Board';
import useTimer from '../hook/useTimer';
import useTetromino from '../hook/useTetromino';

export default function PlayPage() {
  const [tetrisBoard, setTetrisBoard] =
    useState<Array<number[]>>(initTetrisBoard);
  const { timerCount, runTimer, stopTimer, resetTimer } = useTimer();
  const { tetromino } = useTetromino();

  useEffect(() => {
    runTimer();
  }, []);

  return (
    <div className="w-full h-[911px] flex">
      <Board board={tetrisBoard} />
      <button
        onClick={() => {
          stopTimer();
        }}
      >
        멈추기
      </button>
      <button
        onClick={() => {
          resetTimer();
        }}
      >
        초기화
      </button>
      <span>{timerCount}</span>
    </div>
  );
}
