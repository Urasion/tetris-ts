import { BoardType } from './../constant/types';
import { useEffect, useRef, useState } from 'react';
import useTetromino from './useTetromino';
import { useAtom, useAtomValue } from 'jotai';
import { boardAtom, timerAtom } from '../store/atom';

export default function useTimer() {
  const [timerCount, setTimerCount] = useAtom<number>(timerAtom);
  const [board] = useAtom(boardAtom);
  const [isStop, setIsStop] = useState<boolean>(true);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const {
    tetromino,
    moveTetrominoBottom,
    checkTetrominoLand,
    generateTetromino,
    renderBoard,
    setDropPostion,
    checkGameOver,
  } = useTetromino();
  const timer = useRef<NodeJS.Timer>();
  useEffect(() => {
    setDropPostion();
    if (checkTetrominoLand(tetromino.position)) {
      renderBoard();
      if (checkGameOver(board)) {
        setIsGameOver(true);
        stopTimer();
      } else {
        generateTetromino();
      }
    }
  }, [tetromino, timerCount]);
  const runTimer = () => {
    setIsStop(false);
    timer.current = setInterval(() => {
      setTimerCount((prev) => prev + 1);
      moveTetrominoBottom();
    }, 1000);
  };
  const reRunTimer = () => {
    if (isStop) {
      runTimer();
    }
  };
  const stopTimer = () => {
    setIsStop(true);
    clearInterval(timer.current);
  };

  return { timerCount, runTimer, reRunTimer, stopTimer, isGameOver };
}
