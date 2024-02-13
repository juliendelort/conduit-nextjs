import { FavoriteButton } from "@/app/(main)/_components/FavoriteButton";
import { FollowButton } from "@/app/(main)/_components/FollowButton";
import { ErrorMessage } from "@/app/_components/ErrorMessage";
import { DBFetchArticle } from "@/server/data/articles";
import { DEFAULT_USER_IMAGE_URL } from "@/server/utils/const";
import { getSession } from "@/server/utils/session";
import { DateTime } from "luxon";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";

export default async function Page({ params }: { params: { id: string } }) {
  const session = await getSession(cookies());
  const article = await DBFetchArticle({
    id: Number(params.id), // TODO: use zod to parse this
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
                className="text-md leading-none"
              >
                {article.author.username}
              </Link>
              <div className="self-start text-sm font-light text-onsurfaceinvertedhigh">
                {DateTime.fromJSDate(article.createdAt).toLocaleString(
                  DateTime.DATE_MED_WITH_WEEKDAY,
                )}
              </div>
            </div>
            <div className="inline-flex justify-center gap-2 sm:mt-0">
              {!isCurrentUser && (
                <FollowButton
                  isFollowing={article.author.following}
                  isAuthenticated={!!session.user}
                  userId={article.author.id}
                  username={article.author.username}
                  activeContainerClassName="bg-onsurfaceinvertedhigh text-surfaceinverted hover:text-onsurfaceinvertedhigh hover:border-onsurfaceinvertedhigh hover:bg-transparent"
                  inactiveContainerClassName="text-onsurfaceinvertedhigh border-onsurfaceinvertedhigh hover:bg-onsurfaceinvertedhigh hover:text-surfaceinverted"
                />
              )}

              <FavoriteButton
                isFavorited={article.favorited}
                favoritesCount={article.favoritesCount}
                id={article.id}
                isAuthenticated={!!session.user}
                text={`${article.favorited ? "Unfavorite" : "Favorite"} Article ({count})`}
              />
            </div>
          </div>
        </div>
      </header>
      <main className="container mx-auto mt-8">
        <p className="mb-8 text-lg text-onsurfaceprimary">
          {article.description}
        </p>
        <div className="mb-8 text-lg text-onsurfaceprimary">
          <Markdown>{article.body}</Markdown>
        </div>
        <div className="flex gap-1">
          {article.tagList.map((t, index) => (
            <div
              key={t.name}
              className="rounded-xl border px-2 py-1 text-xs text-onsurfaceprimaryhighest"
            >
              {t.name}
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
