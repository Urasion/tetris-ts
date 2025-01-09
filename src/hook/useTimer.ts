import { BoardType } from './../constant/types';
import { useEffect, useRef } from 'react';
import useTetromino from './useTetromino';
import { useAtom } from 'jotai';
import { timerAtom } from '../store/atom';

export default function useTimer() {
  const [timerCount, setTimerCount] = useAtom<number>(timerAtom);
  const { tetromino, moveTetrominoBottom } = useTetromino();
  const timer = useRef<NodeJS.Timer>();
  useEffect(() => {
    console.log(11);
  }, [timerCount]);
  const runTimer = () => {
    timer.current = setInterval(() => {
      setTimerCount((prev) => prev + 1);
      moveTetrominoBottom();
    }, 1000);
  };
  const resetTimer = () => {
    setTimerCount(0);
    runTimer();
  };
  const stopTimer = () => {
    clearInterval(timer.current);
  };

  return { timerCount, runTimer, resetTimer, stopTimer };
}
