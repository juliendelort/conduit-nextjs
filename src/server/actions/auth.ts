"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { loginAPI, signUpAPI } from "../service/auth";
import { getSession, setAuthUser } from "../utils/session";
import { z } from "zod";
import { validatedAction } from "./utils";
import { setFlashMessage } from "../utils/flash";
import { revalidatePath } from "next/cache";

const loginActionSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const loginAction = validatedAction(
  loginActionSchema,
  async ({ email, password }) => {
    const result = await loginAPI({ email, password });
    if (result.error) {
      return { error: result.error.message };
    }

    const session = await getSession(cookies());
    await setAuthUser(session, result.data.user);
    await setFlashMessage({
      message: `Welcome back, ${result.data.user.username}!`,
      type: "info",
    });

    await session.save();
    return redirect("/feed");
  },
);

const signupActionSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  username: z.string().min(3),
});

export const signupAction = validatedAction(
  signupActionSchema,
  async ({ email, password, username }) => {
    const result = await signUpAPI({ username, email, password });
    if (result.error) {
      return { error: result.error.message };
    }

    const session = await getSession(cookies());
    await setAuthUser(session, result.data.user);
    await setFlashMessage({
      message: `Welcome, ${result.data.user.username}!`,
      type: "info",
    });

    await session.save();
    return redirect("/feed");
  },
);
