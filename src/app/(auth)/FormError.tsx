import clsx from "clsx";
import { ReactNode } from "react";

export interface FormErrorProps {
  children: ReactNode;
  className?: string;
}

export function FormError({ children, className }: FormErrorProps) {
  return <div className={clsx("text-red-500", className)}>{children}</div>;
}
