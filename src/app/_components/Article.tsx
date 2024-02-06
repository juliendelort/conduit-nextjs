import { Article } from "@/types.ts/articles";

export interface ArticleProps {
  article: Article;
}

export function Article({ article }: ArticleProps) {
  return (
    <article className="border-b py-4 last-of-type:border-none">
      <h3 className="line-clamp-2 text-ellipsis text-xl font-semibold text-black">
        {article.title}
      </h3>
      <div className="line-clamp-3 text-ellipsis font-light">
        {article.description}
      </div>
    </article>
  );
}
