"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { loginAPI, signUpAPI } from "../data/auth";
import { deleteAuthUser, getSession, setAuthUser } from "../utils/session";
import { z } from "zod";
import { handleActionError, validateFormData } from "./utils";
import { setFlashMessage } from "../utils/flash";

const loginActionSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  redirecturl: z.string().optional(),
});

export const loginAction = async (formData: FormData) => {
  let redirectUrl;
  try {
    const { email, password, redirecturl } = validateFormData(
      formData,
      loginActionSchema,
    );
    redirectUrl = redirecturl;
    const { user } = await loginAPI({ email, password });

    const session = await getSession(cookies());

    await setAuthUser(session, user);
    await setFlashMessage({
      message: `Welcome back, ${user.username}!`,
      type: "success",
    });

    await session.save();
  } catch (e) {
    return handleActionError(e);
  }
  redirect(redirectUrl ?? "/feed");
};

const signupActionSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  username: z.string().min(3),
});

export const signupAction = async (formData: FormData) => {
  try {
    const { email, password, username } = validateFormData(
      formData,
      signupActionSchema,
    );
    const { user } = await signUpAPI({ username, email, password });
    const session = await getSession(cookies());
    await setAuthUser(session, user);
    await setFlashMessage({
      message: `Welcome, ${user.username}!`,
      type: "info",
    });

    await session.save();
  } catch (e) {
    return handleActionError(e);
  }
  return redirect("/feed");
};

export const signoutAction = async () => {
  try {
    const session = await getSession(cookies());
    await deleteAuthUser(session);
  } catch (e) {
    return handleActionError(e);
  }
  return redirect("/");
};
