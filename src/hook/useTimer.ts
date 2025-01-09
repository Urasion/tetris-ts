import { BoardType, Position } from './../constant/types';
import { useEffect, useRef, useState } from 'react';
import useUser from './useUser';
import useTetromino from './useTetromino';
import { useAtom } from 'jotai';
import { timerAtom } from '../store/atom';

export default function useTimer() {
  const [timerCount, setTimerCount] = useAtom<number>(timerAtom);
  const { moveTetrominoBottom, checkTetrominoLand } = useTetromino();
  const timer = useRef<NodeJS.Timer>();
  const runTimer = (board: BoardType) => {
    timer.current = setInterval(() => {
      setTimerCount((prev) => prev + 1);
      moveTetrominoBottom();
      if (checkTetrominoLand(board)) {
      } else {
      }
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
