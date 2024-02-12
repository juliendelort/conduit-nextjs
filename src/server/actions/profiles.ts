"use server";

import { z } from "zod";
import { handleActionError, validateFormData } from "./utils";
import { getSession, setAuthUser } from "../utils/session";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import {
  followUserAPI,
  unFollowUserAPI,
  updateProfileAPI,
} from "../data/profiles";
import { setFlashMessage } from "../utils/flash";

const toggleFollowUserSchema = z.object({
  username: z.string(),
  newFollowValue: z.enum(["true", "false"]).transform((v) => JSON.parse(v)),
});

export const toggleFollowUser = async (formData: FormData) => {
  const session = await getSession(cookies());
  if (!session.isAuthenticated) {
    redirect("/signin");
  }
  try {
    const { username, newFollowValue } = validateFormData(
      formData,
      toggleFollowUserSchema,
    );
    if (newFollowValue) {
      await followUserAPI({ username, token: session.token });
    } else {
      await unFollowUserAPI({ username, token: session.token });
    }

    revalidateTag("article");
  } catch (e) {
    return handleActionError(e);
  }
};

const updateProfileActionSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).or(z.literal("")),
  username: z.string().min(3),
  bio: z.string().optional(),
  image: z.string().url(),
});

export const updateProfileAction = async (formData: FormData) => {
  const session = await getSession(cookies());
  if (!session.isAuthenticated) {
    redirect("/signin");
  }
  try {
    const apiParams = validateFormData(formData, updateProfileActionSchema);

    const { user } = await updateProfileAPI({
      ...apiParams,
      token: session.token,
    });
    await setAuthUser(session, user);
    await setFlashMessage({
      message: `Profile updated!`,
      type: "info",
    });

    await session.save();
  } catch (e) {
    return handleActionError(e);
  }
};
