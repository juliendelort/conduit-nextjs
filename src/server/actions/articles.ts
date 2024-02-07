"use server";

import { z } from "zod";
import { validatedAction } from "./utils";
import { favoriteArticleAPI, unFavoriteArticleAPI } from "../service/articles";
import { getSession } from "../utils/session";
import { cookies } from "next/headers";

const favoriteArticleSchema = z.object({
  slug: z.string(),
});

export const favoriteArticle = validatedAction(
  favoriteArticleSchema,
  async ({ slug }) => {
    const session = await getSession(cookies());
    const result = await favoriteArticleAPI({ slug, token: session.token });
    if (result.error) {
      return { error: result.error };
    }

    return { data: result.data };
  },
);

export const unFavoriteArticle = validatedAction(
  favoriteArticleSchema,
  async ({ slug }) => {
    const session = await getSession(cookies());
    const result = await unFavoriteArticleAPI({ slug, token: session.token });

    if (result.error) {
      return { error: result.error };
    }

    return { data: result.data };
  },
);
