"use server";

import { z } from "zod";
import { handleActionError, validateFormData } from "./utils";
import { getSession } from "../utils/session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  DBCreateArticle,
  DBfavoriteArticle,
  DBUnFavoriteArticle,
} from "../data/articles";

const toggleFavoriteArticleSchema = z.object({
  id: z.coerce.number(),
  newFavoriteValue: z.enum(["true", "false"]).transform((v) => JSON.parse(v)),
});

export const toggleFavoriteArticle = async (formData: FormData) => {
  const session = await getSession(cookies());
  if (!session.user) {
    redirect("/signin");
  }
  try {
    const { id, newFavoriteValue } = validateFormData(
      formData,
      toggleFavoriteArticleSchema,
    );
    if (newFavoriteValue) {
      await DBfavoriteArticle({ id, userId: session.user.id });
    } else {
      await DBUnFavoriteArticle({ id, userId: session.user.id });
    }
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
  if (!session.user) {
    redirect("/signin");
  }
  try {
    const articlesParams = validateFormData(formData, createArticleSchema);
    await DBCreateArticle({ ...articlesParams, authorId: session.user.id });
  } catch (e) {
    return handleActionError(e);
  }
  redirect("/");
};
