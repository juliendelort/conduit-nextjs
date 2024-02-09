"use server";

import { z } from "zod";
import { handleActionError, validateFormData } from "./utils";
import { getSession } from "../utils/session";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { followUserAPI, unFollowUserAPI } from "../service/profiles";

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
