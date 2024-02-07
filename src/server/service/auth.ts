"use server";

import { User } from "@/types.ts/auth";
import { BASE_URL, handleFetchResponse } from "./utils";
import { experimental_taintUniqueValue as taintUniqueValue } from "react";

export interface LoginAPIParams {
  email: string;
  password: string;
}

export async function loginAPI({ email, password }: LoginAPIParams) {
  const response = await fetch(`${BASE_URL}/api/users/login`, {
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

  const result = await handleFetchResponse<{
    user: User;
  }>(response);

  if (result.data) {
    taintUniqueValue(
      "Do not pass token to the client",
      result.data.user,
      result.data.user.token,
    );
  }
  return result;
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
  const response = await fetch(`${BASE_URL}/api/users`, {
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

  const result = await handleFetchResponse<{
    user: User;
  }>(response);

  if (result.data) {
    taintUniqueValue(
      "Do not pass token to the client",
      result.data.user,
      result.data.user.token,
    );
  }
  return result;
}
