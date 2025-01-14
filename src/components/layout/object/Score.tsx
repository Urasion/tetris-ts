export default function Score({ score }: { score: number }) {
  return (
    <div className="w-full max-w-[200px] h-full max-h-[80px] flex flex-col ">
      <span className="w-full grow font-bold text-2xl ">score</span>
      <span className="w-full font-bold text-2xl text-center">{score}</span>
    </div>
  );
}
