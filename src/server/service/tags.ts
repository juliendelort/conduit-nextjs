import "server-only";
import { BASE_URL, handleFetchResponse } from "./utils";

export async function listTagsAPI() {
  const url = new URL("api/tags", BASE_URL);

  const response = await fetch(url);

  return handleFetchResponse<{
    tags: string[];
  }>(response);
}
