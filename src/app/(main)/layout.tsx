import { getSession } from "@/server/utils/session";
import clsx from "clsx";
import { cookies } from "next/headers";
import { Suspense } from "react";
import { TagsList } from "../_components/TagsList";
import { titillium_web } from "../fonts";
export * from "../metadata";

export default async function MainPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession(cookies());

  return (
    <>
      <header
        className={clsx("text-onbrand bg-brand py-8 text-center shadow-inner", {
          "sr-only": session.isAuthenticated,
        })}
      >
        <h1
          className={clsx(
            titillium_web.className,
            "mb-4 text-5xl drop-shadow-md",
          )}
        >
          conduit
        </h1>
        <p className="text-2xl font-light">A place to share your knowledge</p>
      </header>
      <main className="container mx-auto mt-8 grid items-start gap-8 lg:grid-cols-[1fr_250px]">
        <div className="bg-surfacesecondary rounded p-3  lg:col-start-2">
          <h2 className="text-md mb-2">Popular Tags</h2>
          <Suspense fallback="Loading...">
            <TagsList />
          </Suspense>
        </div>
        <div className="lg:col-start-1 lg:row-start-1">
          <h2 className="sr-only">Articles</h2>
          {children}
        </div>
      </main>
    </>
  );
}
