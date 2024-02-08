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
import { Icon } from "./_components/Icon";
import { PreloadResources } from "./preload-resources";

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
        <PreloadResources />
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
              {session.isAuthenticated ? (
                <>
                  <li>
                    <NavLink
                      href="/article/new"
                      className="flex items-center gap-1"
                    >
                      <Icon
                        id="pencil-square"
                        className="h-5 w-5 text-inherit"
                      />
                      New Article
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      href="/settings"
                      className="flex items-center gap-1"
                    >
                      <Icon id="cog-8-tooth" className="h-5 w-5 text-inherit" />
                      Settings
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      href={`/profile/${session.username}`}
                      className="flex items-center gap-1"
                    >
                      <Icon id="face-smile" className="h-5 w-5 text-inherit" />
                      {session.username}
                    </NavLink>
                  </li>
                </>
              ) : (
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
