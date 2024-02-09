import "server-only";
import { Article } from "@/types.ts/articles";
import { BASE_URL, handleFetchResponse } from "./utils";

export interface ListArticlesAPIParams {
  limit: number;
  offset: number;
  token?: string;
  tag?: string;
  feed?: boolean;
  author?: string;
  favoritedBy?: string;
}

export async function listArticlesAPI({
  limit,
  offset,
  token,
  tag,
  feed,
  author,
  favoritedBy,
}: ListArticlesAPIParams) {
  const url = new URL(`api/articles${feed ? "/feed" : ""}`, BASE_URL);
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("offset", String(offset));
  if (tag) {
    url.searchParams.set("tag", tag);
  }
  if (author) {
    url.searchParams.set("author", author);
  }
  if (favoritedBy) {
    url.searchParams.set("favorited", favoritedBy);
  }

  const response = await fetch(url, {
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    next: {
      tags: ["articles"],
    },
  });

  const result = await handleFetchResponse<{
    articles: Article[];
    articlesCount: number;
  }>(response);

  return {
    ...result,
    pagesCount: Math.ceil(result.articlesCount / limit),
  };
}

export interface FavoriteArticleParams {
  slug: string;
  token: string;
}
export async function favoriteArticleAPI({
  slug,
  token,
}: FavoriteArticleParams) {
  const response = await fetch(`${BASE_URL}/api/articles/${slug}/favorite`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return handleFetchResponse<{
    article: Article;
  }>(response);
}

export async function unFavoriteArticleAPI({
  slug,
  token,
}: FavoriteArticleParams) {
  const response = await fetch(`${BASE_URL}/api/articles/${slug}/favorite`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return handleFetchResponse<{
    article: Article;
  }>(response);
}

export interface FetchArticleAPIParams {
  slug: string;
  token?: string;
}
export async function fetchArticleAPI({ slug, token }: FetchArticleAPIParams) {
  const url = new URL(`api/articles/${slug}`, BASE_URL);

  const response = await fetch(url, {
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    next: { tags: ["article", `article-${slug}`] },
  });

  return handleFetchResponse<{
    article: Article;
  }>(response);
}
