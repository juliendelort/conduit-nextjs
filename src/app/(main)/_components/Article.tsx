import { Article } from "@/types.ts/articles";
import { FavoriteButton } from "./FavoriteButton";
import Link from "next/link";
import { DateTime } from "luxon";
import Image from "next/image";

export interface ArticleProps {
  article: Article;
  isAuthenticated: boolean;
}

export function Article({ article, isAuthenticated }: ArticleProps) {
  return (
    <article className="border-b  border-borderprimary py-4 last-of-type:border-none">
      <div className="mb-4 grid grid-cols-[auto_1fr_auto] grid-rows-2 items-center gap-x-2">
        <Image
          src={article.author.image}
          alt=""
          className="row-span-2 rounded-full"
          width={32}
          height={32}
        />
        <Link
          href={`/profile/${article.author.username}`}
          className="text-md self-end leading-none text-brand"
        >
          {article.author.username}
        </Link>
        <div className="row-span-2">
          <FavoriteButton
            isFavorited={article.favorited}
            favoritesCount={article.favoritesCount}
            slug={article.slug}
            isAuthenticated={isAuthenticated}
            text={"{count}"}
          />
        </div>
        <div className="self-start text-sm font-light text-onsurfaceprimaryhighest">
          {DateTime.fromISO(article.createdAt).toLocaleString(
            DateTime.DATE_MED_WITH_WEEKDAY,
          )}
        </div>
      </div>
      <Link href={`/article/${article.slug}`}>
        <h3 className="line-clamp-2 text-ellipsis text-xl font-semibold text-onsurfaceprimary">
          {article.title}
        </h3>
        <div className="line-clamp-3 text-ellipsis font-light text-onsurfaceprimaryhigh">
          {article.description}
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-2 text-xs font-light text-onsurfaceprimaryhighest">
          <div>Read more...</div>
          <div className="flex flex-wrap gap-1">
            {article.tagList.map((t, index) => (
              <div
                key={`tag-${index}`}
                className="rounded-xl border border-borderprimary px-2 py-1"
              >
                {t}
              </div>
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
}
