"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { loginAPI } from "../service/auth";
import { getSession, setAuthUser } from "../utils/session";
import { z } from "zod";
import { validatedAction } from "./utils";

const loginActionSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const loginAction = validatedAction(
  loginActionSchema,
  async ({ email, password }) => {
    const result = await loginAPI(email, password);
    if (result.error) {
      return result.error;
    }

    const session = await getSession(cookies());
    await setAuthUser(session, result.data.user);

    await session.save();
    return redirect("/");
  },
);
