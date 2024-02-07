import { listArticlesAPI } from "@/server/service/articles";
import { ErrorMessage } from "./FormError";
import { Article } from "./Article";
import { Pages } from "./Pages";
import { getSession } from "@/server/utils/session";
import { cookies } from "next/headers";

export interface ArticlesListProps {
  page: number;
  tag?: string;
}

const PAGE_SIZE = 10;

export async function ArticlesList({ page, tag }: ArticlesListProps) {
  const session = await getSession(cookies());
  const { error, data } = await listArticlesAPI({
    limit: PAGE_SIZE,
    offset: (page - 1) * PAGE_SIZE,
    tag,
    token: session.token,
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
