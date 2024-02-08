"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
      className={clsx(
        isActive ? "text-onsurfaceprimary" : "text-onsurfaceprimaryhighest",
        className,
      )}
      href={href}
      {...rest}
    />
  );
}
