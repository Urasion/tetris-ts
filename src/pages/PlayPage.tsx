import { useEffect, useState } from 'react';

import Board from '../components/object/Board';
import useTimer from '../hook/useTimer';
import useTetromino from '../hook/useTetromino';
import NextTetris from '../components/object/NextTetris';
import Timer from '../components/object/Timer';
import Button from '../components/object/Button';
import Score from '../components/object/Score';
import Level from '../components/object/Level';
import Guide from '../components/object/Guide';

export default function PlayPage() {
  const { gameSetting, stopTimer, reRunTimer, startTimer } = useTimer();
  useEffect(() => {
    startTimer();
    return () => {
      stopTimer('gameOver');
    };
  }, [gameSetting.level]);
  return (
    <div className="w-full h-full  flex justify-center items-center bg-[#9EAD86] space-x-10">
      <Guide />
      <Board gameSetting={gameSetting} />
      <div
        className=" h-full flex flex-col justify-around  items-center "
        style={{ aspectRatio: 1 / 3 }}
      >
        <Score score={gameSetting.score} />
        <Level level={gameSetting.level} />
        <NextTetris />
        <div className="w-full flex justify-between text-2xl font-bold">
          <Button
            className="bg-red-500"
            onClick={(e) => {
              if (gameSetting.state !== 'gameOver') {
                e.currentTarget.blur();
                stopTimer('stop');
              }
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
