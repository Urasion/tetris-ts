import { useAtomValue } from 'jotai';
import { gameSettingAtom } from '../../store/atom';

type Props = {
  isDropTeromino: boolean;
  isTeromino: boolean;
  isTerominoNodeEmpty: boolean;
  isBoardNodeEmpty: boolean;
};
export default function TetrisNode({
  isTeromino,
  isDropTeromino,
  isTerominoNodeEmpty,
  isBoardNodeEmpty,
}: Props) {
  const gameSetting = useAtomValue(gameSettingAtom);
  return (
    <div
      className={`h-full border p-1 ${
        gameSetting.state === 'gameOver'
          ? 'border-gray-600 border-4'
          : isTeromino
          ? isTerominoNodeEmpty
            ? 'border-black border-4'
            : isDropTeromino
            ? 'border-gray-600 border-4'
            : 'border-[#929F7B] border-4'
          : isDropTeromino
          ? 'border-gray-600 border-4'
          : isBoardNodeEmpty
          ? 'border-black border-4  '
          : 'border-[#929F7B] border-4'
      }`}
      style={{
        aspectRatio: 1 / 1,
      }}
    >
      <div
        className={`h-full   ${
          gameSetting.state === 'gameOver'
            ? 'bg-gray-600'
            : isTeromino
            ? isTerominoNodeEmpty
              ? 'bg-black '
              : isDropTeromino
              ? 'bg-gray-600'
              : 'bg-[#929F7B]'
            : isDropTeromino
            ? 'bg-gray-600'
            : isBoardNodeEmpty
            ? 'bg-black'
            : 'bg-[#929F7B]'
        }`}
      ></div>
    </div>
  );
}
