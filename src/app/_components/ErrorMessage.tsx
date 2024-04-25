import type { ReactNode } from "react";
import { classMerge } from '../classMerge';

export interface ErrorMessageProps {
  children: ReactNode;
  className?: string;
}

export function ErrorMessage({ children, className }: ErrorMessageProps) {
  return <div className={classMerge("text-red-500", className)}>{children}</div>;
}
