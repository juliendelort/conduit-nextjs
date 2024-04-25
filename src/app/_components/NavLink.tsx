"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { classMerge } from '../classMerge';

export interface NavLinkProps extends React.ComponentProps<typeof Link> {
  href: string;
  activePaths?: string[];
  className?: string;
}

export function NavLink({
  href,
  activePaths,
  className,
  ...rest
}: NavLinkProps) {
  const pathname = usePathname();

  const isActive = activePaths
    ? activePaths.includes(pathname)
    : pathname === href;

  return (
    <Link
      className={classMerge(
        isActive ? "text-onsurfaceprimary" : "text-onsurfaceprimaryhighest",
        "whitespace-nowrap hover:text-onsurfaceprimary",
        className,
      )}
      href={href}
      {...rest}
    />
  );
}
