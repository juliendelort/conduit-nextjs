"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export interface NavLinkProps extends React.ComponentProps<typeof Link> {
  href: string;
}

export function NavLink({ href, ...rest }: NavLinkProps) {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Link
      className={isActive ? "text-black" : "text-gray-400"}
      href={href}
      {...rest}
    />
  );
}
