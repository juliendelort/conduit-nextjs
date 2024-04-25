import clsx from "clsx";
import type { ReactNode } from "react";

export interface ErrorMessageProps {
  children: ReactNode;
  className?: string;
}

export function ErrorMessage({ children, className }: ErrorMessageProps) {
  return <div className={clsx("text-red-500", className)}>{children}</div>;
}
