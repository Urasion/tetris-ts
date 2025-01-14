import { GameSetting } from './../constant/types';
import { useEffect, useRef, useState } from 'react';
import useTetromino from './useTetromino';
import { useAtom } from 'jotai';
import { boardAtom, gameSettingAtom } from '../store/atom';
import { initTetrisBoard } from '../constant/tetris';

export default function useTimer() {
  const [gameSetting, setGameSetting] = useAtom<GameSetting>(gameSettingAtom);
  const [board, setBoard] = useAtom(boardAtom);
  const {
    tetromino,
    moveTetrominoBottom,
    checkTetrominoLand,
    generateTetromino,
    renderBoard,
    checkGameOver,
  } = useTetromino();
  const timer = useRef<NodeJS.Timer>();
  useEffect(() => {
    if (checkTetrominoLand(tetromino.position, tetromino.shape)) {
      renderBoard();
    }
  }, [tetromino.position, tetromino.shape, gameSetting.state]);
  useEffect(() => {
    if (checkGameOver()) {
      stopTimer('gameOver');
    } else {
      generateTetromino();
    }
  }, [board]);
  const runTimer = () => {
    if (timer.current) clearInterval(timer.current);
    setGameSetting((prev) => ({ ...prev, state: 'play' }));
    timer.current = setInterval(() => {
      setGameSetting((prev) => ({ ...prev, time: prev.time + 1 }));
      moveTetrominoBottom();
    }, 1000 / gameSetting.level);
  };

  const startTimer = () => {
    if (timer.current) clearInterval(timer.current);
    setGameSetting((prev) => ({ ...prev, state: 'play', time: 0 }));
    generateTetromino();
    generateTetromino();
    timer.current = setInterval(() => {
      setGameSetting((prev) => ({ ...prev, time: prev.time + 1 }));
      moveTetrominoBottom();
    }, 1000 / gameSetting.level);
  };
  const reRunTimer = () => {
    if (gameSetting.state === 'stop') {
      runTimer();
    } else if (gameSetting.state === 'gameOver') {
      startTimer();
    }
  };
  const stopTimer = (state: string) => {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
    if (state === 'stop') {
      setGameSetting((prev) => ({ ...prev, state: 'stop' }));
    } else if (state === 'gameOver') {
      setBoard(initTetrisBoard);
      setGameSetting((prev) => ({ ...prev, state: 'gameOver' }));
    }
  };

  return { gameSetting, runTimer, reRunTimer, stopTimer, startTimer };
}
