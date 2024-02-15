import { getSession } from "@/server/utils/session";
import clsx from "clsx";
import { cookies } from "next/headers";
import { FlashMessage } from "./_components/FlashMessage";
import { ToastRoot } from "./_components/ToastRoot";
import { sourceSans, titillium_web } from "./fonts";
import "./globals.css";
import { ThemeSwitcher } from "./_components/ThemeSwitcher";
import { getCurrentTheme } from "@/server/actions/theme";
import { PreloadResources } from "./preload-resources";
import Link from "next/link";
import { HeaderNav } from "./_components/HeaderNav";
import { DEFAULT_USER_IMAGE_URL } from "@/server/utils/const";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conduit",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession(cookies());
  const currentTheme = await getCurrentTheme();
  return (
    <html lang="en" data-theme={currentTheme}>
      <body
        className={clsx(
          sourceSans.className,
          "grid min-h-screen grid-rows-[auto_1fr_auto] gap-4 bg-surfaceprimary text-onsurfaceprimary",
        )}
      >
        <PreloadResources />
        <FlashMessage />
        <div className="container mx-auto py-4">
          <ToastRoot />
          <div className="relative flex flex-wrap items-center gap-4">
            <Link
              href="/"
              className={`${titillium_web.className} text-2xl text-brand`}
            >
              conduit
            </Link>
            <ThemeSwitcher currentTheme={currentTheme} className="mr-auto" />
            <HeaderNav
              user={
                session.user
                  ? {
                      username: session.user?.username,
                      image: session.user.image ?? DEFAULT_USER_IMAGE_URL,
                    }
                  : undefined
              }
            />
          </div>
        </div>
        <div>{children}</div>
        <footer className="mt-4 w-full bg-surfacesecondary p-4">
          <div className="container mx-auto text-center">
            <p className="text-xs font-light text-onsurfacesecondary">
              &copy; {new Date().getFullYear()} Conduit
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
