export const BASE_URL = "https://api.realworld.io";

export async function handleFetchResponse<T>(response: Response) {
  if (!response.ok) {
    throw new Error("An error occured");
  }

  return (await response.json()) as T;
}
