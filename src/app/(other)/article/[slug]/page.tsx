import { FavoriteButton } from "@/app/(main)/_components/FavoriteButton";
import { FollowButton } from "@/app/(main)/_components/FollowButton";
import { fetchArticleAPI } from "@/server/service/articles";
import { getSession } from "@/server/utils/session";
import { DateTime } from "luxon";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";

export default async function Page({ params }: { params: { slug: string } }) {
  const session = await getSession(cookies());
  const { article } = await fetchArticleAPI({
    slug: params.slug,
    token: session.token,
  });
  return (
    <>
      <header className="bg-surfaceinverted text-onsurfaceinverted py-8">
        <div className="container mx-auto">
          <h1 className="text-4xl font-semibold">{article.title}</h1>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <div className="inline-grid grid-cols-[auto_auto] grid-rows-2 items-center gap-x-2">
              <Image
                src={article.author.image}
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
              <div className="text-onsurfaceinvertedhigh self-start text-sm font-light">
                {DateTime.fromISO(article.createdAt).toLocaleString(
                  DateTime.DATE_MED_WITH_WEEKDAY,
                )}
              </div>
            </div>
            <div className="inline-flex justify-center gap-2 sm:mt-0">
              <FollowButton
                isFollowing={article.author.following}
                isAuthenticated={!!session.isAuthenticated}
                username={article.author.username}
                activeContainerClassName="bg-onsurfaceinvertedhigh text-surfaceinverted hover:text-onsurfaceinvertedhigh hover:border-onsurfaceinvertedhigh hover:bg-transparent"
                inactiveContainerClassName="text-onsurfaceinvertedhigh border-onsurfaceinvertedhigh hover:bg-onsurfaceinvertedhigh hover:text-surfaceinverted"
              />

              <FavoriteButton
                isFavorited={article.favorited}
                favoritesCount={article.favoritesCount}
                slug={article.slug}
                isAuthenticated={!!session.isAuthenticated}
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
              key={`tag-${index}`}
              className="rounded-xl border px-2 py-1 text-xs text-onsurfaceprimaryhighest"
            >
              {t}
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
