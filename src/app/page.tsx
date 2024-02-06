import { titillium_web } from "./fonts";
import { cookies } from "next/headers";
import { clsx } from "clsx";
import { getSession } from "@/server/utils/session";
import { Suspense } from "react";
import { ArticlesList } from "./_components/ArticlesList";
import { z } from "zod";
import { TagsList } from "./_components/TagsList";
import Link from "next/link";

const pageSearchParamsSchema = z.object({
  page: z.coerce.number().optional().default(1),
  tag: z.string().optional(),
});

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getSession(cookies());
  const { page, tag } = pageSearchParamsSchema.parse(searchParams);

  return (
    <>
      <header
        className={clsx("bg-brand py-8 text-center text-white shadow-inner", {
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
        <div className="lg:col-start-2bg-gray-200 rounded bg-gray-200 p-3">
          <h2 className="text-md mb-2">Popular Tags</h2>
          <Suspense fallback="Loading...">
            <TagsList />
          </Suspense>
        </div>
        <div className="lg:col-start-1 lg:row-start-1">
          <h2 className="sr-only">Articles</h2>
          <nav className="mb-4 border-b">
            <ul className="flex gap-4">
              {session.isAuthenticated && (
                <li>
                  <Link
                    className={clsx(
                      "block p-2 text-gray-500",
                      !tag && "border-b-2 border-brand",
                    )}
                    href="/"
                  >
                    Your Feed
                  </Link>
                </li>
              )}
              <li>
                <Link
                  className={clsx(
                    "block p-2 text-gray-500",
                    !tag && "border-b-2 border-brand text-brand",
                  )}
                  href="/"
                >
                  Global Feed
                </Link>
              </li>
              {tag ? (
                <li>
                  <Link
                    className="block border-b-2 border-brand p-2 text-brand"
                    href="/"
                  >
                    #{tag}
                  </Link>
                </li>
              ) : null}
            </ul>
          </nav>
          <Suspense fallback="Loading..." key={`${page}-${tag}`}>
            <ArticlesList page={page} tag={tag} />
          </Suspense>
        </div>
      </main>
    </>
  );
}
