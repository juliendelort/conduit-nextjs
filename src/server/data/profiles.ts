"server only";

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

export interface DBGetUserParams {
  username: string;
  currentUserId?: number;
}
export async function DBGetUser({ username, currentUserId }: DBGetUserParams) {
  return prisma.user.findUnique({
    where: {
      username,
    },
  });
}
