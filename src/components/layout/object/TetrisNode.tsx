type Props = {
  isGameOver: boolean;
  isDropTeromino: boolean;
  isTeromino: boolean;
  isTerominoNodeEmpty: boolean;
  isBoardNodeEmpty: boolean;
};
export default function TetrisNode({
  isGameOver,
  isTeromino,
  isDropTeromino,
  isTerominoNodeEmpty,
  isBoardNodeEmpty,
}: Props) {
  return (
    <div
      className={`w-[45px] h-full rounded-lg  border ${
        isGameOver
          ? 'bg-gray-600'
          : isTeromino
          ? isTerominoNodeEmpty
            ? 'bg-green-300'
            : isDropTeromino && 'border-blue-300'
          : isDropTeromino
          ? 'border-blue-300'
          : isBoardNodeEmpty
          ? 'bg-violet-300'
          : 'bg-white'
      }`}
    />
  );
}
