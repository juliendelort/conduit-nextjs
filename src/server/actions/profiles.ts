"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { DBFollowUser, DBUnfollowUser, DBUpdateUser } from "../data/users";
import { getSession, setAuthUser } from "../utils/session";
import { handleActionError, validateFormData } from "./utils";

const toggleFollowUserSchema = z.object({
  userId: z.coerce.number(),
  newFollowValue: z.enum(["true", "false"]).transform((v) => JSON.parse(v)),
});

export const toggleFollowUser = async (formData: FormData) => {
  const session = await getSession(cookies());
  if (!session.user) {
    redirect("/signin");
  }
  try {
    const { userId, newFollowValue } = validateFormData(
      formData,
      toggleFollowUserSchema,
    );
    if (newFollowValue) {
      await DBFollowUser({ userId, followerId: session.user.id });
    } else {
      await DBUnfollowUser({ userId, followerId: session.user.id });
    }
  } catch (e) {
    return handleActionError(e);
  }
};

const updateProfileActionSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).or(z.literal("")),
  username: z.string().min(3),
  bio: z.string().optional(),
  image: z.string().url().or(z.literal("")),
});

export const updateProfileAction = async (formData: FormData) => {
  const session = await getSession(cookies());
  if (!session.user) {
    redirect("/signin");
  }
  try {
    const apiParams = validateFormData(formData, updateProfileActionSchema);

    const user = await DBUpdateUser(apiParams);
    if (user) {
      await setAuthUser(session, user);
      await session.save();
    }
  } catch (e) {
    return handleActionError(e);
  }
};
