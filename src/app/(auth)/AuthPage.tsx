import { ReactNode } from "react";

export interface AuthPageProps {
  children: ReactNode;
  title: string;
}
export function AuthPage({ children, title }: AuthPageProps) {
  return (
    <div className="text-center">
      <h1 className="mb-4 text-4xl">{title}</h1>
      {children}
    </div>
  );
}
