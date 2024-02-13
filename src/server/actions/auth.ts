"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { deleteAuthUser, getSession, setAuthUser } from "../utils/session";
import { z } from "zod";
import { handleActionError, validateFormData } from "./utils";
import { setFlashMessage } from "../utils/flash";
import { SafeMessageError } from "@/types/errors";
import { DBCreateUser, DBGetUserByEmailAndPassword } from "../data/users";
import { getEnv } from "../utils/env";

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
    const user = await DBGetUserByEmailAndPassword({ email, password });

    if (!user) {
      throw new SafeMessageError("Invalid email or password");
    }

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
    const createdUser = await DBCreateUser({
      username,
      email,
      password,
      image: getEnv("DEFAULT_USER_IMAGE_URL"),
    });
    const session = await getSession(cookies());
    await setAuthUser(session, {
      id: createdUser.id,
      email: createdUser.email,
      username: createdUser.username,
      bio: createdUser.bio,
      image: createdUser.image,
    });
    await setFlashMessage({
      message: `Welcome, ${createdUser.username}!`,
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
