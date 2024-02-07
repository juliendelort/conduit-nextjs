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
