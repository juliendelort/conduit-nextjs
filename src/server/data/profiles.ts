import { AuthenticatedUser, User } from "@/types/auth";
import { BASE_URL, handleFetchResponse } from "./utils";
import prisma from "../lib/prisma";
import { experimental_taintUniqueValue as taintUniqueValue } from "react";

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

export interface UpdateProfileAPIParams {
  email: string;
  password?: string;
  username: string;
  image: string;
  bio?: string;
  token: string;
}

export async function updateProfileAPI({
  username,
  email,
  password,
  image,
  bio,
  token,
}: UpdateProfileAPIParams) {
  const response = await fetch(`${BASE_URL}/api/user`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      user: {
        email,
        password,
        username,
        image,
        bio,
      },
    }),
  });

  return handleFetchResponse<{
    user: AuthenticatedUser;
  }>(response);
}
