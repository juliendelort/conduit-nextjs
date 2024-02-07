import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <div className="container mx-auto text-center">{children}</div>;
}
