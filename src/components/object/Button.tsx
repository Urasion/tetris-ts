import { ButtonHTMLAttributes, ReactNode } from 'react';

export default function Button({
  className,
  children,
  onClick,
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`size-32 rounded-full ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}
