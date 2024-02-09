import { Icon } from "@/app/_components/Icon";
import { fetchArticleAPI } from "@/server/service/articles";
import clsx from "clsx";
import { DateTime } from "luxon";
import Image from "next/image";
import Link from "next/link";

export default async function Page({ params }: { params: { slug: string } }) {
  const { article } = await fetchArticleAPI({ slug: params.slug });
  return (
    <>
      <header className="bg-surfaceinverted text-onsurfaceinverted py-8">
        <div className="container mx-auto">
          <h1 className=" text-4xl font-semibold">{article.title}</h1>
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
                href={`profile/${article.author.username}`}
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
              <button className="text-onsurfaceinvertedhigh border-onsurfaceinvertedhigh hover:bg-onsurfaceinvertedhigh hover:text-surfaceinverted rounded border px-2 py-1 text-sm">
                {article.author.following ? "Unfollow" : "Follow"}{" "}
                {article.author.username}
              </button>

              <button
                className={clsx(
                  " flex items-center gap-1 rounded border border-brand px-2 py-1 text-sm",
                  article.favorited
                    ? "bg-brand text-onbrand hover:bg-onbrand hover:text-brand"
                    : "text-brand hover:bg-brand hover:text-onbrand",
                )}
              >
                <Icon id="heart" className="h-4 w-4" />
                {article.favorited ? "Unfavorite" : "Favorite"} Article (
                {article.favoritesCount})
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
