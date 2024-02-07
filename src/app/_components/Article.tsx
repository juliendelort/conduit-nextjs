import { Article } from "@/types.ts/articles";

export interface ArticleProps {
  article: Article;
}

export function Article({ article }: ArticleProps) {
  return (
    <article className="border-borderprimary border-b  py-4 last-of-type:border-none">
      <div className="mb-4 grid grid-cols-[32px_1fr_auto] grid-rows-2 items-center gap-x-2">
        <img
          src={article.author.image}
          alt=""
          className="row-span-2 rounded-full"
        />
        <div className="text-md self-end leading-none text-brand">
          {article.author.username}
        </div>
        <div className="row-span-2">btn</div>
        <div className="text-onsurfaceprimaryhighest self-start text-sm font-light">
          {article.createdAt}
        </div>
      </div>
      <h3 className="text-onsurfaceprimary line-clamp-2 text-ellipsis text-xl font-semibold">
        {article.title}
      </h3>
      <div className="text-onsurfaceprimaryhigh line-clamp-3 text-ellipsis font-light">
        {article.description}
      </div>
    </article>
  );
}
