import { listArticlesAPI } from "@/server/service/articles";
import Link from "next/link";
import { ErrorMessage } from "./FormError";
import { Article } from "./Article";
import { Pages } from "./Pages";

export interface ArticlesListProps {
  page: number;
  tag?: string;
}

const PAGE_SIZE = 10;

export async function ArticlesList({ page, tag }: ArticlesListProps) {
  const { error, data } = await listArticlesAPI({
    limit: PAGE_SIZE,
    offset: (page - 1) * PAGE_SIZE,
    tag,
  });

  if (error) {
    return <ErrorMessage>{error.message}</ErrorMessage>;
  }
  return (
    <>
      {data.articles.map((a) => (
        <Article key={a.slug} article={a} />
      ))}
      <Pages currentPage={page} pagesCount={data.pagesCount} currentTag={tag} />
    </>
  );
}
