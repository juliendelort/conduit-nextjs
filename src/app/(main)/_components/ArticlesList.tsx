import { DBListArticles } from "@/server/data/articles";
import { Article } from "../_components/Article";
import { Pages } from "./Pages";
import { getSession } from "@/server/utils/session";
import { cookies } from "next/headers";

export interface ArticlesListProps {
  page: number;
  isFeed: boolean;
  tag?: string;
  author?: string;
  favoritedBy?: string;
  pageUrl: string;
}

const PAGE_SIZE = 10;

export async function ArticlesList({
  page,
  tag,
  isFeed,
  author,
  favoritedBy,
  pageUrl,
}: ArticlesListProps) {
  const session = await getSession(cookies());
  const { articles, pagesCount } = await DBListArticles({
    limit: PAGE_SIZE,
    offset: (page - 1) * PAGE_SIZE,
    tag,
    token: session.token,
    feed: isFeed,
    author,
    favoritedBy,
  });

  const getPageUrl = (page: number) => {
    const url = new URL(pageUrl, "http://dummy");
    url.searchParams.set("page", String(page));
    return decodeURIComponent(`${url.pathname}${url.search}`);
  };

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
      <Pages
        currentPage={page}
        pagesCount={pagesCount}
        getPageUrl={getPageUrl}
      />
    </>
  );
}
