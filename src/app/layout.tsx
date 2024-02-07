import { getSession } from "@/server/utils/session";
import clsx from "clsx";
import { cookies } from "next/headers";
import { FlashMessage } from "./_components/FlashMessage";
import { NavLink } from "./_components/NavLink";
import { ToastRoot } from "./_components/ToastRoot";
import { sourceSans, titillium_web } from "./fonts";
import "./globals.css";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession(cookies());

  return (
    <html lang="en">
      <body className={clsx(sourceSans.className, "bg-surpaceprimary")}>
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
