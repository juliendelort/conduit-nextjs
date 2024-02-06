import { getSession } from "@/server/utils/session";
import clsx from "clsx";
import { cookies } from "next/headers";
import { sourceSans, titillium_web } from "../fonts";
import { FlashMessage } from "./FlashMessage";
import { NavLink } from "./NavLink";
import { ToastRoot } from "./ToastRoot";
import "../globals.css";

export async function BaseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession(cookies());

  return (
    <html lang="en">
      <body className={clsx(sourceSans.className, "text-primary")}>
        <ToastRoot />
        <FlashMessage />
        <nav className="container mx-auto py-4">
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
        {children}
      </body>
    </html>
  );
}
