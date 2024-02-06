"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export interface NavLinkProps extends React.ComponentProps<typeof Link> {
  href: string;
  activePaths?: string[];
}

export function NavLink({ href, activePaths, ...rest }: NavLinkProps) {
  const pathname = usePathname();

  const isActive = activePaths
    ? activePaths.includes(pathname)
    : pathname === href;

  return (
    <Link
      className={isActive ? "text-black" : "text-gray-400"}
      href={href}
      {...rest}
    />
  );
}
