"use server";
import { cookies } from "next/headers";

const THEME_COOKIE_NAME = "theme";

type Theme = "light" | "dark";

export async function toggleTheme() {
  const currentTheme = await getCurrentTheme();

  await cookies().set(
    THEME_COOKIE_NAME,
    currentTheme === "light" ? "dark" : ("light" satisfies Theme),
  );
}

export async function getCurrentTheme() {
  return (cookies().get(THEME_COOKIE_NAME)?.value ?? "light") as Theme;
}
