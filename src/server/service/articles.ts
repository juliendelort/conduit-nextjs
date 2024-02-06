import { Article } from "@/types.ts/articles";
import { BASE_URL, handleFetchResponse } from "./utils";

export interface ListArticlesAPIParams {
  limit: number;
  offset: number;
  token?: string;
}

export async function listArticlesAPI({
  limit,
  offset,
  token,
}: ListArticlesAPIParams) {
  const url = new URL("api/articles", BASE_URL);
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("offset", String(offset));

  await new Promise((resolve) => setTimeout(resolve, 2000));

  const response = await fetch(url, {
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  return handleFetchResponse<{
    articles: Article[];
    articlesCount: number;
  }>(response);
}
