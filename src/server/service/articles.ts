import "server-only";
import { Article } from "@/types.ts/articles";
import { BASE_URL, handleFetchResponse } from "./utils";

export interface ListArticlesAPIParams {
  limit: number;
  offset: number;
  token?: string;
  tag?: string;
}

export async function listArticlesAPI({
  limit,
  offset,
  token,
  tag,
}: ListArticlesAPIParams) {
  const url = new URL("api/articles", BASE_URL);
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("offset", String(offset));
  if (tag) {
    url.searchParams.set("tag", tag);
  }

  const response = await fetch(url, {
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  const result = await handleFetchResponse<{
    articles: Article[];
    articlesCount: number;
  }>(response);

  if (result.data) {
    return {
      ...result,
      data: {
        ...result.data,
        pagesCount: Math.ceil(result.data.articlesCount / limit),
      },
    };
  }

  return result;
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
