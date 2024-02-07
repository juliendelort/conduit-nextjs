"use client";

import { toggleTheme } from "@/server/actions/theme";
import Image from "next/image";

export interface ThemeSwitcherProps {
  currentTheme: "light" | "dark";
}

export function ThemeSwitcher({ currentTheme }: ThemeSwitcherProps) {
  const handleClick = async () => {
    await toggleTheme();
  };
  return (
    <button
      onClick={handleClick}
      aria-label={`Switch to ${currentTheme === "dark" ? "light" : "dark"} theme`}
    >
      {currentTheme === "dark" ? (
        <Image src="/sun_dark.svg" alt="sun icon" width={18} height={18} />
      ) : (
        <Image src="/moon_light.svg" alt="moon icon" width={18} height={18} />
      )}
    </button>
  );
}
