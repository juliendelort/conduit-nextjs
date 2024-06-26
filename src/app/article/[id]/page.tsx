import { ErrorBoundary } from "@/app/_components/ErrorBoundary";
import { ErrorMessage } from "@/app/_components/ErrorMessage";
import { FavoriteButton } from "@/app/_components/articles/FavoriteButton";
import { FollowButton } from "@/app/_components/articles/FollowButton";
import { useServerPageUrl } from "@/app/_hooks/useServerPageUrl";
import { DBFetchArticle } from "@/server/data/articles";
import { DEFAULT_USER_IMAGE_URL } from "@/server/utils/const";
import { getSession } from "@/server/utils/session";
import { DateTime } from "luxon";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import Markdown from "react-markdown";
import { z } from "zod";
import { AddCommentForm } from "./AddCommentForm";
import { CommentsSection } from "./CommentsSection";

const urlParamsSchema = z.object({
  id: z.coerce.number(),
});

export default async function Page({ params }: { params: { id: string } }) {
  const session = await getSession(cookies());
  const result = urlParamsSchema.safeParse(params);
  const currentUrl = useServerPageUrl();

  if (!result.success) {
    return <ErrorMessage className="text-center">Invalid URL</ErrorMessage>;
  }

  const { id } = result.data;

  const article = await DBFetchArticle({
    id,
    userId: session.user?.id,
  });

  if (!article) {
    return (
      <ErrorMessage className="text-center">Article not found</ErrorMessage>
    );
  }

  const isCurrentUser = session.user?.id === article.author.id;
  return (
    <>
      <header className="bg-surfaceinverted py-8 text-onsurfaceinverted">
        <div className="container mx-auto">
          <h1 className="text-4xl font-semibold">{article.title}</h1>
          <p className="font-light text-onsurfaceinvertedhigh">
            {article.description}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <div className="inline-grid grid-cols-[auto_auto] grid-rows-2 items-center gap-x-2">
              <Image
                src={article.author.image ?? DEFAULT_USER_IMAGE_URL}
                alt=""
                className="row-span-2 rounded-full"
                width={32}
                height={32}
              />
              <Link
                href={`/profile/${article.author.username}`}
                className="text-md leading-none hover:underline"
              >
                {article.author.username}
              </Link>
              <div className="self-start text-sm font-light text-onsurfaceinvertedhigh">
                {DateTime.fromJSDate(article.createdAt).toLocaleString(
                  DateTime.DATE_MED_WITH_WEEKDAY,
                )}
              </div>
            </div>
            <div className="inline-flex flex-wrap gap-2 sm:mt-0">
              <FavoriteButton
                isFavorited={article.favorited}
                favoritesCount={article.favoritesCount}
                id={article.id}
                isAuthenticated={!!session.user}
                text={`${article.favorited ? "Unfavorite" : "Favorite"} Article ({count})`}
              />
              {!isCurrentUser && (
                <FollowButton
                  isFollowing={!!article.author.following}
                  isAuthenticated={!!session.user}
                  userId={article.author.id}
                  username={article.author.username}
                  activeContainerClassName="bg-onsurfaceinvertedhigh text-surfaceinverted hover:border-onsurfaceinvertedhigh hover:bg-transparent hover:text-onsurfaceinvertedhigh"
                  inactiveContainerClassName="border-onsurfaceinvertedhigh text-onsurfaceinvertedhigh hover:bg-onsurfaceinvertedhigh hover:text-surfaceinverted"
                />
              )}
            </div>
          </div>
        </div>
      </header>
      <main className="container mx-auto">
        <div className="mt-4 flex gap-1">
          {article.tagList.map((t) => (
            <Link
              key={t.name}
              href={`/?tag=${t.name}`}
              className="rounded-xl border px-2 py-1 text-xs text-onsurfaceprimaryhighest hover:underline"
            >
              {t.name}
            </Link>
          ))}
        </div>
        <Markdown className="prose mb-8 mt-8 max-w-none text-lg text-onsurfaceprimary dark:prose-invert prose-pre:whitespace-break-spaces prose-pre:break-all dark:prose-pre:bg-surfacesecondary">
          {article.body}
        </Markdown>

        <hr />
        <div className="mx-auto max-w-5xl">
          {!!session.user ? (
            <AddCommentForm
              articleId={id}
              currentUserImage={session.user.image ?? DEFAULT_USER_IMAGE_URL}
            />
          ) : (
            <div className="mt-4 text-center">
              <Link
                href={`/signin?redirecturl=${currentUrl}`}
                className="text-brand hover:underline"
              >
                Sign in
              </Link>{" "}
              or{" "}
              <Link
                href={`/signup?redirecturl=${currentUrl}`}
                className="text-brand hover:underline"
              >
                Sign up
              </Link>{" "}
              to add comments
            </div>
          )}
          <ErrorBoundary
            fallback={
              <ErrorMessage className="text-center">
                Failed to load comments
              </ErrorMessage>
            }
          >
            <Suspense fallback={<div>Loading comments...</div>}>
              <CommentsSection articleId={id} />
            </Suspense>
          </ErrorBoundary>
        </div>
      </main>
    </>
  );
}
