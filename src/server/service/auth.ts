"use server";

import { User } from "@/types.ts/auth";
import { BASE_URL, handleFetchResponse } from "./utils";

export interface LoginAPIParams {
  email: string;
  password: string;
}

export async function loginAPI({ email, password }: LoginAPIParams) {
  const response = await fetch(`${BASE_URL}/users/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      user: {
        email,
        password,
      },
    }),
  });

  return handleFetchResponse<{
    user: User;
  }>(response);
}

export interface SignupAPIParams {
  email: string;
  password: string;
  username: string;
}

export async function signUpAPI({
  username,
  email,
  password,
}: SignupAPIParams) {
  const response = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      user: {
        email,
        password,
        username,
      },
    }),
  });

  return handleFetchResponse<{
    user: User;
  }>(response);
}
