export const BASE_URL = "https://api.realworld.io";

export async function handleFetchResponse<T>(response: Response) {
  if (!response.ok) {
    return {
      status: response.status,
      error: { message: await response.text() },
    };
  }

  return {
    status: response.status,
    data: (await response.json()) as T,
  };
}
