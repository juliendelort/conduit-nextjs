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
          "bg-surfaceprimary text-onsurfaceprimary",
        )}
      >
        <PreloadResources />
        <ToastRoot />
        <FlashMessage />
        <div className="container mx-auto py-4">
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

        {children}
      </body>
    </html>
  );
}
