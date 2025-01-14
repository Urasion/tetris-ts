import { GameSetting } from './../constant/types';
import { useEffect, useRef, useState } from 'react';
import useTetromino from './useTetromino';
import { useAtom } from 'jotai';
import { boardAtom, gameSettingAtom, timerAtom } from '../store/atom';
import { initTetrisBoard } from '../constant/tetris';

export default function useTimer() {
  const [gameSetting, setGameSetting] = useAtom<GameSetting>(gameSettingAtom);
  const [timer, setTimer] = useAtom(timerAtom);
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
  }, [tetromino.position, tetromino.shape, gameSetting.state, board]);
  const runTimer = () => {
    setGameSetting((prev) => ({ ...prev, state: 'play' }));
    setTimer(
      setInterval(() => {
        setGameSetting((prev) => ({ ...prev, time: prev.time + 1 }));
        moveTetrominoBottom();
      }, 1000 / gameSetting.level)
    );
  };

  const startTimer = () => {
    setGameSetting((prev) => ({ ...prev, state: 'play', time: 0 }));
    generateTetromino();
    generateTetromino();
    setTimer(
      setInterval(() => {
        setGameSetting((prev) => ({ ...prev, time: prev.time + 1 }));
        moveTetrominoBottom();
      }, 1000 / gameSetting.level)
    );
  };
  const reRunTimer = () => {
    if (gameSetting.state === 'stop') {
      runTimer();
    } else if (gameSetting.state === 'gameOver') {
      startTimer();
    }
  };
  const stopTimer = (state: string) => {
    if (state === 'stop') {
      setGameSetting((prev) => ({ ...prev, state: 'stop' }));
    } else if (state === 'gameOver') {
      setGameSetting((prev) => ({ ...prev, state: 'gameOver' }));
    }
    clearInterval(timer);
  };

  return { gameSetting, runTimer, reRunTimer, stopTimer, startTimer };
}
