import { useEffect, useState } from 'react';
import { generateTetromino } from '../util/tetrisUtil';
import { initTetrisBoard } from '../constant/tetris';
import { produce } from 'immer';
import Board from '../components/layout/object/Board';
import useTimer from '../hook/useTimer';
import useTetromino from '../hook/useTetromino';
import NextTetris from '../components/layout/object/NextTetris';
import Timer from '../components/layout/object/Timer';
import Button from '../components/layout/object/Button';

export default function PlayPage() {
  const { gameSetting, runTimer, stopTimer, reRunTimer, startTimer } =
    useTimer();

  const { tetromino } = useTetromino();

  useEffect(() => {
    startTimer();
  }, []);

  return (
    <div className="w-full h-full  flex justify-center items-center bg-[#9EAD86]">
      <Board gameSetting={gameSetting} />

      <div
        className=" h-full flex flex-col justify-around  items-center "
        style={{ aspectRatio: 1 / 3 }}
      >
        <Timer time={gameSetting.time} />
        <NextTetris />
        <Button
          className="bg-rose-500"
          onClick={() => {
            stopTimer('stop');
          }}
        >
          멈추기
        </Button>

        <Button
          className="bg-yellow-500"
          onClick={() => {
            reRunTimer();
          }}
        >
          재시작
        </Button>
      </div>
    </div>
  );
}
