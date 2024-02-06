import { titillium_web } from "./fonts";
import { cookies } from "next/headers";
import { clsx } from "clsx";
import { getSession } from "@/server/utils/session";
import { Suspense } from "react";
import { ArticlesList } from "./components/ArticlesList";
import { z } from "zod";

const pageSearchParamsSchema = z.object({
  page: z.coerce.number().optional(),
});

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getSession(cookies());
  const { page } = pageSearchParamsSchema.parse(searchParams);

  console.log("***page", page);

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
      <main>
        <Suspense fallback="Loading..." key={page ?? 1}>
          <ArticlesList page={page ?? 1} />
        </Suspense>
      </main>
    </>
  );
}
