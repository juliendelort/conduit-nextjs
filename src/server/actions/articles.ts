"use server";

import { z } from "zod";
import { validatedAction } from "./utils";
import { favoriteArticleAPI, unFavoriteArticleAPI } from "../service/articles";
import { getSession } from "../utils/session";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

const toggleFavoriteArticleSchema = z.object({
  slug: z.string(),
  newFavoriteValue: z.enum(["true", "false"]).transform((v) => JSON.parse(v)),
});

export const toggleFavoriteArticle = validatedAction(
  toggleFavoriteArticleSchema,
  async ({ slug, newFavoriteValue }) => {
    const session = await getSession(cookies());
    if (!session.isAuthenticated) {
      redirect("/signin");
    }
    const result = newFavoriteValue
      ? await favoriteArticleAPI({ slug, token: session.token })
      : await unFavoriteArticleAPI({ slug, token: session.token });
    if (result.error) {
      return { error: result.error };
    }

    revalidateTag("articles");

    return {
      favorited: result.data.article.favorited,
      favoritesCount: result.data.article.favoritesCount,
    };
  },
);
