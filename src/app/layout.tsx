import { getSession } from "@/server/utils/session";
import clsx from "clsx";
import { cookies } from "next/headers";
import { FlashMessage } from "./_components/FlashMessage";
import { NavLink } from "./_components/NavLink";
import { ToastRoot } from "./_components/ToastRoot";
import { sourceSans, titillium_web } from "./fonts";
import "./globals.css";
import { ThemeSwitcher } from "./_components/ThemeSwitcher";
import { getCurrentTheme } from "@/server/actions/theme";

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
          "bg-surpaceprimary text-onsurfaceprimary",
        )}
      >
        <ToastRoot />
        <FlashMessage />
        <div className="container mx-auto flex gap-4 py-4">
          <nav className="flex-1">
            <ul className="flex items-center gap-4">
              <li className="mr-auto">
                <a
                  href="/"
                  className={`${titillium_web.className} text-2xl text-brand`}
                >
                  conduit
                </a>
              </li>
              <li>
                <NavLink
                  href={session.isAuthenticated ? "/feed" : "/"}
                  activePaths={["/feed", "/"]}
                >
                  Home
                </NavLink>
              </li>
              {session.isAuthenticated ? null : (
                <>
                  <li>
                    <NavLink href="/signin">Sign in</NavLink>
                  </li>
                  <li>
                    <NavLink href="/signup">Sign up</NavLink>
                  </li>
                </>
              )}
            </ul>
          </nav>
          <ThemeSwitcher currentTheme={currentTheme} />
        </div>

        {children}
      </body>
    </html>
  );
}
