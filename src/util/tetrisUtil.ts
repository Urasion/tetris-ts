import { produce } from 'immer';
export function generateTetromino(
  map: Array<number[]>,
  setMap: React.Dispatch<React.SetStateAction<number[][]>>
) {
  const randomTetromino = Math.floor(Math.random() * 7);
  setMap(
    produce(map, (draft) => {
      for (let i = 0; i <= 3; i++) {
        for (let j = 3; j <= 6; j++) {}
      }
    })
  );
}
export function tetrisCheck(currentRow: number[], nextRow: number[]) {}
