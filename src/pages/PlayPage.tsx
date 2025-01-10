import { useEffect, useState } from 'react';
import { generateTetromino } from '../util/tetrisUtil';
import { initTetrisBoard } from '../constant/tetris';
import { produce } from 'immer';
import Board from '../components/layout/object/Board';
import useTimer from '../hook/useTimer';
import useTetromino from '../hook/useTetromino';

export default function PlayPage() {
  const { timerCount, runTimer, stopTimer, reRunTimer, isGameOver } =
    useTimer();

  useEffect(() => {
    runTimer();
  }, []);

  return (
    <div className="w-full h-[911px] flex">
      <Board isGameOver={isGameOver} />

      <div className="flex justify-center">
        <span className="text-2xl font-bold">{timerCount}</span>
        <button
          onClick={() => {
            stopTimer();
          }}
        >
          멈추기
        </button>
        <button
          onClick={() => {
            reRunTimer();
          }}
        >
          초기화
        </button>
      </div>
    </div>
  );
}
