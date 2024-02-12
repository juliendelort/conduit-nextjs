"use server";

import { z } from "zod";
import { handleActionError, validateFormData } from "./utils";
import { getSession } from "../utils/session";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import {
  createArticleAPI,
  favoriteArticleAPI,
  unFavoriteArticleAPI,
} from "../service/articles";

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

const createArticleSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  body: z.string().min(1),
  tagList: z
    .string()
    .optional()
    .transform((value) => (value?.trim() ? value.split(",") : []))
    .pipe(z.array(z.string())),
});

export const createArticle = async (formData: FormData) => {
  const session = await getSession(cookies());
  if (!session.isAuthenticated) {
    redirect("/signin");
  }
  try {
    const articlesParams = validateFormData(formData, createArticleSchema);
    console.log("***articlesParams", articlesParams);
    await createArticleAPI({ ...articlesParams, token: session.token });
  } catch (e) {
    return handleActionError(e);
  }
  redirect("/");
};
