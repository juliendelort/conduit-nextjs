import type { Metadata } from "next";
import "./globals.css";
import { sourceSans, titillium_web } from "./fonts";
import { NavLink } from "./_components/NavLink";
import { cookies } from "next/headers";
import { getSession } from "@/server/utils/session";
import { ToastRoot } from "./_components/ToastRoot";
import { FlashMessage } from "./_components/FlashMessage";
import { clsx } from "clsx";

export const metadata: Metadata = {
  title: "Conduit",
};

export default async function RootLayout({
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
              <NavLink href="/">Home</NavLink>
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
