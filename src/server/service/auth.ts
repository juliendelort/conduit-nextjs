"use server";

import { User } from "@/types.ts/auth";
import { BASE_URL, handleFetchResponse } from "./utils";

export async function loginAPI(email: string, password: string) {
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
