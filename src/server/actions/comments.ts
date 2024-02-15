"use server";

import { z } from "zod";
import { getSession } from "../utils/session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { validateFormData, handleActionError } from "./utils";
import { DBCreateComment, DBDeleteComment } from "../data/comments";

const createCommentSchema = z.object({
  articleId: z.coerce.number(),
  text: z.string().min(1),
});

export const createComment = async (formData: FormData) => {
  const session = await getSession(cookies());
  if (!session.user) {
    redirect("/signin");
  }
  try {
    const { articleId, text } = validateFormData(formData, createCommentSchema);
    await DBCreateComment({ articleId, authorId: session.user.id, text });
  } catch (e) {
    return handleActionError(e);
  }
};

const deleteCommentSchema = z.object({
  commentId: z.coerce.number(),
});

export const deleteComment = async (formData: FormData) => {
  const session = await getSession(cookies());
  if (!session.user) {
    redirect("/signin");
  }
  try {
    const { commentId } = validateFormData(formData, deleteCommentSchema);
    await DBDeleteComment({ id: commentId, currentUserId: session.user.id });
  } catch (e) {
    return handleActionError(e);
  }
};
