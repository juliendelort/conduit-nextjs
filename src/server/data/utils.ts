import { SafeMessageError } from "@/types/errors";

export const BASE_URL = "https://api.realworld.io";

export async function handleFetchResponse<T>(response: Response) {
  if (!response.ok) {
    throw new SafeMessageError(
      response.status < 500
        ? await response.text()
        : "An error occurred, please try again later",
    );
  }

  return (await response.json()) as T;
}
