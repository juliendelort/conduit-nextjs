import { User } from "@/types.ts/auth";
import { BASE_URL, handleFetchResponse } from "./utils";

export interface FollowUserParams {
  username: string;
  token: string;
}
export async function followUserAPI({ username, token }: FollowUserParams) {
  const response = await fetch(`${BASE_URL}/api/profiles/${username}/follow`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return handleFetchResponse<{
    profile: User;
  }>(response);
}

export async function unFollowUserAPI({ username, token }: FollowUserParams) {
  const response = await fetch(`${BASE_URL}/api/profiles/${username}/follow`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return handleFetchResponse<{
    profile: User;
  }>(response);
}

export interface FetchProfleAPIParams {
  username: string;
  token?: string;
}
export async function fetchProfileAPI({
  username,
  token,
}: FetchProfleAPIParams) {
  const url = new URL(`api/profiles/${username}`, BASE_URL);

  const response = await fetch(url, {
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    next: { tags: ["profile", `profile-${username}`] },
  });

  return handleFetchResponse<{
    profile: User & { following: boolean };
  }>(response);
}
