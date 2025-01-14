import { useEffect, useState } from 'react';

import Board from '../components/layout/object/Board';
import useTimer from '../hook/useTimer';
import useTetromino from '../hook/useTetromino';
import NextTetris from '../components/layout/object/NextTetris';
import Timer from '../components/layout/object/Timer';
import Button from '../components/layout/object/Button';
import Score from '../components/layout/object/Score';
import Level from '../components/layout/object/Level';

export default function PlayPage() {
  const { gameSetting, runTimer, stopTimer, reRunTimer, startTimer } =
    useTimer();

  const { tetromino } = useTetromino();

  useEffect(() => {
    stopTimer('gameOver');
    startTimer();
  }, [gameSetting.level]);

  return (
    <div className="w-full h-full  flex justify-center items-center bg-[#9EAD86]">
      <Board gameSetting={gameSetting} />

      <div
        className=" h-full flex flex-col justify-around  items-center "
        style={{ aspectRatio: 1 / 3 }}
      >
        <Timer time={gameSetting.time} />
        <Score score={gameSetting.score} />
        <Level level={gameSetting.level} />
        <NextTetris />
        <div className="w-full flex justify-between text-2xl font-bold">
          <Button
            className="bg-red-500"
            onClick={(e) => {
              e.currentTarget.blur();

              stopTimer('stop');
            }}
          >
            멈추기
          </Button>
          <Button
            className="bg-blue-500"
            onClick={(e) => {
              e.currentTarget.blur();
              reRunTimer();
            }}
          >
            재시작
          </Button>
        </div>
      </div>
    </div>
  );
}
