import { listArticlesAPI } from "@/server/service/articles";
import { ErrorMessage } from "../../_components/ErrorMessage";
import { Article } from "../_components/Article";
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
  const { articles, pagesCount } = await listArticlesAPI({
    limit: PAGE_SIZE,
    offset: (page - 1) * PAGE_SIZE,
    tag,
    token: session.token,
    feed: isFeed,
  });

  return (
    <>
      {articles.length === 0 && (
        <div className="text-center">No articles are here... yet.</div>
      )}
      {articles.map((a) => (
        <Article
          key={a.slug}
          article={a}
          isAuthenticated={!!session.isAuthenticated}
        />
      ))}
      <Pages currentPage={page} pagesCount={pagesCount} currentTag={tag} />
    </>
  );
}
