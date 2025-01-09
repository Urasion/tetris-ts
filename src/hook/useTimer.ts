import { BoardType } from './../constant/types';
import { useEffect, useRef } from 'react';
import useTetromino from './useTetromino';
import { useAtom } from 'jotai';
import { timerAtom } from '../store/atom';

export default function useTimer() {
  const [timerCount, setTimerCount] = useAtom<number>(timerAtom);
  const { tetromino, moveTetrominoBottom } = useTetromino();
  const timer = useRef<NodeJS.Timer>();
  const runTimer = () => {
    timer.current = setTimeout(function run() {
      moveTetrominoBottom();
      console.log(tetromino.position);
      setTimeout(run, 1000);
    }, 1000);
  };
  const resetTimer = () => {
    setTimerCount(0);
    runTimer();
  };
  const stopTimer = () => {
    clearTimeout(timer.current);
  };

  return { timerCount, runTimer, resetTimer, stopTimer };
}
