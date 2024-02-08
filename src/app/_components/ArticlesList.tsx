import { listArticlesAPI } from "@/server/service/articles";
import { ErrorMessage } from "./FormError";
import { Article } from "./Article";
import { Pages } from "./Pages";
import { getSession } from "@/server/utils/session";
import { cookies } from "next/headers";

export interface ArticlesListProps {
  page: number;
  isFeed: boolean;
  tag?: string;
}

const PAGE_SIZE = 10;

export async function ArticlesList({ page, tag, isFeed }: ArticlesListProps) {
  const session = await getSession(cookies());
  const { error, data } = await listArticlesAPI({
    limit: PAGE_SIZE,
    offset: (page - 1) * PAGE_SIZE,
    tag,
    token: session.token,
    feed: isFeed,
  });

  if (error) {
    return <ErrorMessage>{error.message}</ErrorMessage>;
  }
  return (
    <>
      {data.articles.length === 0 && (
        <div className="text-center">No articles are here... yet.</div>
      )}
      {data.articles.map((a) => (
        <Article
          key={a.slug}
          article={a}
          isAuthenticated={!!session.isAuthenticated}
        />
      ))}
      <Pages currentPage={page} pagesCount={data.pagesCount} currentTag={tag} />
    </>
  );
}
