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
    setDropPostion,
    checkGameOver,
  } = useTetromino();
  const timer = useRef<NodeJS.Timer>();
  useEffect(() => {
    setDropPostion();
    if (checkTetrominoLand(tetromino.position)) {
      if (checkGameOver(renderBoard())) {
        setBoard(initTetrisBoard);
        stopTimer('gameOver');
      } else {
        generateTetromino();
      }
    }
  }, [tetromino.position, tetromino.shape, gameSetting.state]);
  const runTimer = () => {
    setGameSetting((prev) => ({ ...prev, state: 'play' }));
    timer.current = setInterval(() => {
      setGameSetting((prev) => ({ ...prev, time: prev.time + 1 }));
      moveTetrominoBottom();
    }, 1000);
  };

  const startTimer = () => {
    setGameSetting((prev) => ({ ...prev, state: 'play', time: 0 }));
    console.log('start');
    generateTetromino();
    generateTetromino();
    timer.current = setInterval(() => {
      setGameSetting((prev) => ({ ...prev, time: prev.time + 1 }));
      moveTetrominoBottom();
    }, 1000);
  };
  const reRunTimer = () => {
    if (gameSetting.state === 'stop') {
      runTimer();
    } else if (gameSetting.state === 'gameOver') {
      startTimer();
    }
  };
  const stopTimer = (state: string) => {
    if (gameSetting.state === 'play' && state === 'stop') {
      setGameSetting((prev) => ({ ...prev, state: 'stop' }));
    } else if (gameSetting.state === 'play' && state === 'gameOver') {
      setGameSetting((prev) => ({ ...prev, state: 'gameOver' }));
    }
    clearInterval(timer.current);
  };

  return { gameSetting, runTimer, reRunTimer, stopTimer, startTimer };
}
