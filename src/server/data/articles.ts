import "server-only";
import { Article } from "@/types.ts/articles";
import { BASE_URL, handleFetchResponse } from "./utils";

export interface DBListArticlesParams {
  limit: number;
  offset: number;
  token?: string;
  tag?: string;
  feed?: boolean;
  author?: string;
  favoritedBy?: string;
}

export async function DBListArticles({
  limit,
  offset,
  token,
  tag,
  feed,
  author,
  favoritedBy,
}: DBListArticlesParams) {
  const url = new URL(`api/articles${feed ? "/feed" : ""}`, BASE_URL);
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("offset", String(offset));
  if (tag) {
    url.searchParams.set("tag", tag);
  }
  if (author) {
    url.searchParams.set("author", decodeURIComponent(author));
  }
  if (favoritedBy) {
    url.searchParams.set("favorited", decodeURIComponent(favoritedBy));
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

export interface DBFavoriteArticleParams {
  slug: string;
  token: string;
}
export async function DBfavoriteArticle({
  slug,
  token,
}: DBFavoriteArticleParams) {
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

export async function DBUnFavoriteArticle({
  slug,
  token,
}: DBFavoriteArticleParams) {
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

export interface DBCreateArticleParams {
  title: string;
  description: string;
  body: string;
  tagList: string[];
  token: string;
}

export async function DBCreateArticle({
  title,
  description,
  body,
  tagList,
  token,
}: DBCreateArticleParams) {
  const response = await fetch(`${BASE_URL}/api/articles`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      article: {
        title,
        description,
        body,
        tagList,
      },
    }),
  });

  return handleFetchResponse<{
    article: Article;
  }>(response);
}
