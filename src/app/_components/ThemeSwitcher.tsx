"use client";

import { toggleTheme } from "@/server/actions/theme";
import { Icon } from "./Icon";

export interface ThemeSwitcherProps {
  currentTheme: "light" | "dark";
  className?: string;
}

export function ThemeSwitcher({ currentTheme, className }: ThemeSwitcherProps) {
  const handleClick = async () => {
    await toggleTheme();
  };
  return (
    <button
      onClick={handleClick}
      aria-label={`Switch to ${currentTheme === "dark" ? "light" : "dark"} theme`}
      title={`Switch to ${currentTheme === "dark" ? "light" : "dark"} theme`}
      className={className}
    >
      <Icon id={currentTheme === "dark" ? "sun" : "moon"} className="h-4 w-4" />
    </button>
  );
}
