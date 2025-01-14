import {
  LucideArrowDown,
  LucideArrowLeft,
  LucideArrowRight,
  LucideArrowUp,
  LucideSpace,
} from 'lucide-react';

export default function Guide() {
  return (
    <div className="h-full flex flex-col justify-evenly items-center px-12 whitespace-nowrap">
      <h1 className="text-3xl font-bold">조작 가이드</h1>
      <section className="flex flex-col text-xl font-bold space-y-5">
        <div className="w-full flex justify-center">
          <LucideArrowLeft /> 왼쪽이동
        </div>
        <div className="w-full flex justify-center">
          <LucideArrowRight /> 오른쪽이동
        </div>
        <div className="w-full flex justify-center">
          <LucideArrowDown /> 아래쪽이동
        </div>
        <div className="w-full flex justify-center">
          <LucideArrowUp /> 블록회전
        </div>
        <div className="w-full flex justify-center">
          <LucideSpace /> 블록놓기
        </div>
      </section>
    </div>
  );
}
