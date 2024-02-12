"use server";

import { z } from "zod";
import { handleActionError, validateFormData } from "./utils";
import { getSession } from "../utils/session";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { favoriteArticleAPI, unFavoriteArticleAPI } from "../service/articles";

const toggleFavoriteArticleSchema = z.object({
  slug: z.string(),
  newFavoriteValue: z.enum(["true", "false"]).transform((v) => JSON.parse(v)),
});

export const toggleFavoriteArticle = async (formData: FormData) => {
  const session = await getSession(cookies());
  if (!session.isAuthenticated) {
    redirect("/signin");
  }
  try {
    const { slug, newFavoriteValue } = validateFormData(
      formData,
      toggleFavoriteArticleSchema,
    );
    if (newFavoriteValue) {
      await favoriteArticleAPI({ slug, token: session.token });
    } else {
      await unFavoriteArticleAPI({ slug, token: session.token });
    }

    revalidateTag("articles");
    revalidateTag(slug);
  } catch (e) {
    return handleActionError(e);
  }
};
