"use client";

import { toggleTheme } from "@/server/actions/theme";
import { Icon } from "./Icon";

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
      <Icon id={currentTheme === "dark" ? "sun" : "moon"} className="h-4 w-4" />
    </button>
  );
}
