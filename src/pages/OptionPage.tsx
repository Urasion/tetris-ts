import { useAtom } from 'jotai';
import { gameSettingAtom } from '../store/atom';
import { LucideChevronLeft, LucideChevronRight } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OptionPage() {
  const [gameSetting, setGameSetting] = useAtom(gameSettingAtom);
  const navigate = useNavigate();
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          handleOnLevelDown();
          break;
        case 'ArrowRight':
          handleOnLevelUp();
          break;
        case 'Enter':
          navigate(-1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gameSetting.level]);

  const handleOnLevelDown = () => {
    if (gameSetting.level > 1) {
      setGameSetting((prev) => ({ ...prev, level: prev.level - 1 }));
    }
  };
  const handleOnLevelUp = () => {
    if (gameSetting.level < 9) {
      setGameSetting((prev) => ({ ...prev, level: prev.level + 1 }));
    }
  };
  return (
    <div className="w-full h-full flex flex-col justify-evenly items-center ">
      <h1 className="text-4xl font-bold">Select Level..</h1>
      <div className="w-full max-w-[200px] flex justify-between font-bold">
        <LucideChevronLeft
          className={`${
            gameSetting.level > 1 ? ' cursor-pointer' : 'opacity-0'
          }`}
          onClick={handleOnLevelDown}
        />
        <span className="select-none">Level {gameSetting.level}</span>
        <LucideChevronRight
          className={`${
            gameSetting.level < 9 ? ' cursor-pointer' : 'opacity-0'
          }`}
          onClick={handleOnLevelUp}
        />
      </div>
    </div>
  );
}
