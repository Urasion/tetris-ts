import { ButtonHTMLAttributes, ReactNode } from 'react';

export default function Button({
  className,
  children,
  onClick,
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`size-36 rounded-full ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}
