"use client";

import { useState } from "react";
import { Icon } from "./Icon";
import { LogoutButton } from "./LogoutButton";
import { NavLink } from "./NavLink";
import clsx from "clsx";
import React from "react";
import Image from "next/image";

export interface HeaderNavProps {
  user?: {
    username: string;
    image: string;
  };
}

export function HeaderNav({ user }: HeaderNavProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const ulRef = React.useRef<HTMLUListElement>(null);

  const handleBlur = (e: React.FocusEvent<HTMLUListElement, Element>) => {
    if (e.relatedTarget && !ulRef.current?.contains(e.relatedTarget)) {
      setMenuOpen(false);
    }
  };

  return (
    <nav className="grow">
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="absolute right-0 top-1 sm:hidden"
        aria-expanded={menuOpen}
        aria-controls="menu"
        aria-label="Navigation menu"
      >
        <Icon id="bars-3" className="h-6 w-6" />
      </button>
      <ul
        id="menu"
        className={clsx(
          "flex-wrap items-stretch gap-4",
          menuOpen ? "flex justify-center" : "hidden",
          "sm:flex sm:justify-end",
        )}
        onBlur={handleBlur}
        ref={ulRef}
      >
        <li className="flex items-center">
          <NavLink href={!!user ? "/feed" : "/"} activePaths={["/feed", "/"]}>
            Home
          </NavLink>
        </li>
        {!!user ? (
          <>
            <li className="flex items-center">
              <NavLink href="/article/new" className="flex items-center gap-1">
                <Icon id="pencil-square" className="h-5 w-5 text-inherit" />
                New Article
              </NavLink>
            </li>
            <li className="flex items-center">
              <NavLink href="/settings" className="flex items-center gap-1">
                <Icon id="cog-8-tooth" className="h-5 w-5 text-inherit" />
                Settings
              </NavLink>
            </li>
            <li className="flex items-center">
              <NavLink
                href={`/profile/${user.username}`}
                className="flex items-center gap-1"
              >
                <Image
                  src={user.image}
                  alt=""
                  className="rounded-full"
                  width={24}
                  height={24}
                />
                {user.username}
              </NavLink>
            </li>
            <li className="flex items-center">
              <LogoutButton />
            </li>
          </>
        ) : (
          <>
            <li className="flex items-center">
              <NavLink href="/signin">Sign in</NavLink>
            </li>
            <li className="flex items-center">
              <NavLink href="/signup">Sign up</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
