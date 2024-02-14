import { DBListArticles } from "@/server/data/articles";
import { Pages } from "./Pages";
import { getSession } from "@/server/utils/session";
import { cookies } from "next/headers";
import { Article } from "./Article";

export interface ArticlesListProps {
  page: number;
  isFeed: boolean;
  tag?: string;
  author?: string;
  favoritedBy?: string;
}

const PAGE_SIZE = 10;

export async function ArticlesList({
  page,
  tag,
  isFeed,
  author,
  favoritedBy,
}: ArticlesListProps) {
  const session = await getSession(cookies());
  const { articles, pagesCount } = await DBListArticles({
    limit: PAGE_SIZE,
    offset: (page - 1) * PAGE_SIZE,
    tag,
    feed: isFeed,
    author,
    favoritedBy,
    userId: session.user?.id,
  });

  return (
    <>
      {articles.length === 0 && (
        <div className="text-center">No articles are here... yet.</div>
      )}
      {articles.map((a) => (
        <Article key={a.id} article={a} isAuthenticated={!!session.user} />
      ))}
      <Pages currentPage={page} pagesCount={pagesCount} />
    </>
  );
}
