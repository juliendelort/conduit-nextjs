import { getSession } from "@/server/utils/session";
import { cookies } from "next/headers";
import { Suspense } from "react";
import { ErrorBoundary } from "../_components/ErrorBoundary";
import { ErrorMessage } from "../_components/ErrorMessage";
import { classMerge } from '../classMerge';
import { titillium_web } from "../fonts";
import { MainTabs } from './_components/MainTabs';
import { TagsList } from "./_components/TagsList";

export default async function MainPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession(cookies());

  return (
    <>
      <header
        className={classMerge("bg-brand py-8 text-center text-onbrand shadow-inner", {
          hidden: !!session.user,
        })}
      >
        <h1
          className={classMerge(
            titillium_web.className,
            "mb-4 text-5xl drop-shadow-md",
          )}
        >
          conduit
        </h1>
        <p className="text-2xl font-light">A place to share your knowledge</p>
      </header>
      <main className="container mx-auto mt-8 grid items-start gap-8 lg:grid-cols-[1fr_250px]">
        <aside className="rounded bg-surfacesecondary p-3 lg:col-start-2">
          <h2 className="text-md mb-2 text-onsurfacesecondary">Popular Tags</h2>
          <ErrorBoundary
            fallback={<ErrorMessage>Error loading tags</ErrorMessage>}
          >
            <Suspense fallback="Loading...">
              <TagsList />
            </Suspense>
          </ErrorBoundary>
        </aside>
        <div className="lg:col-start-1 lg:row-start-1">
          <h2 className="sr-only">Articles</h2>
          <MainTabs isAuthenticated={!!session.user} />
          {children}
        </div>
      </main>
    </>
  );
}
