import { tetrominos } from './../constant/tetris';
import { BoardType, Position } from './../constant/types';
import { useEffect, useRef, useState } from 'react';
import useUser from './useUser';
import useTetromino from './useTetromino';
import { useAtom } from 'jotai';
import { timerAtom } from '../store/atom';

export default function useTimer() {
  const [timerCount, setTimerCount] = useAtom<number>(timerAtom);
  const { tetromino, moveTetrominoBottom, checkTetrominoLand } = useTetromino();
  const timer = useRef<NodeJS.Timer>();
  useEffect(() => {
    console.log(tetromino.position);
  }, [timerCount]);

  const runTimer = () => {
    if (timer.current) return;
    timer.current = setInterval(() => {
      setTimerCount((prev) => prev + 1);
      moveTetrominoBottom();
    }, 1000);
  };
  const resetTimer = () => {
    setTimerCount(0);
  };
  const stopTimer = () => {
    clearInterval(timer.current);
  };

  return { timerCount, runTimer, resetTimer, stopTimer };
}
