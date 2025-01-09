import { LucideChevronLeft, LucideChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
type Menu = {
  label: string;
  value: string;
};
const menus: Menu[] = [
  {
    label: 'play',
    value: '/tetris/play',
  },
  {
    label: 'option',
    value: '/tetris/option',
  },
  {
    label: 'exit',
    value: '/tetris/exit',
  },
];
export default function StartPage() {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const navigate = useNavigate();
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          setSelectedIndex((prev) =>
            prev < menus.length - 1 ? prev + 1 : prev
          );
          break;
        case 'ArrowUp':
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
          break;
        case 'Enter':
          navigate(menus[selectedIndex].value);
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedIndex]);
  return (
    <main className="w-full h-full flex flex-col justify-center items-center">
      <div className="w-1/2 h-1/2">
        <div className="w-full text-center">
          <h1 className="font-black text-3xl select-none">TETRIS</h1>
        </div>
        <ul className="w-full h-full flex flex-col justify-end items-center space-y-2">
          {menus.map((menu) => (
            <li
              key={menu.label}
              className="w-full flex justify-center items-center"
            >
              <LucideChevronRight
                className={`${
                  menus[selectedIndex].label === menu.label
                    ? 'animate-sparkle'
                    : 'hidden'
                }`}
              />
              <p className="font-semibold text-xl select-none">{menu.label}</p>
              <LucideChevronLeft
                className={`${
                  menus[selectedIndex].label === menu.label
                    ? 'animate-sparkle'
                    : 'hidden'
                }`}
              />
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
