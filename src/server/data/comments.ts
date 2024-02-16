"use server";

import prisma from "../lib/prisma";

export interface DBGetCommentsParams {
  articleId: number;
  fromId?: number;
  pageSize?: number;
}

export type CommentRecord = Awaited<
  ReturnType<typeof DBGetComments>
>["comments"][number];

// TODO: add cursor based pagination
export async function DBGetComments({
  articleId,
  fromId,
  pageSize = 10,
}: DBGetCommentsParams) {
  const comments = await prisma.comment.findMany({
    take: pageSize,
    ...(fromId && {
      cursor: {
        id: fromId,
      },
      skip: 1, // Skip the comment with the cursor
    }),
    orderBy: [
      {
        createdAt: "desc",
      },
      {
        id: "asc",
      },
    ],
    where: {
      articleId,
    },
    include: {
      author: true,
    },
  });
  return { comments, hasMore: comments.length === pageSize };
}

export interface DBCreateCommentParams {
  articleId: number;
  text: string;
  authorId: number;
}

export async function DBCreateComment({
  articleId,
  text,
  authorId,
}: DBCreateCommentParams) {
  return prisma.comment.create({
    data: {
      articleId,
      text,
      authorId,
    },
  });
}

export interface DBDeleteCommentParams {
  id: number;
  currentUserId: number;
}

export async function DBDeleteComment({
  id,
  currentUserId,
}: DBDeleteCommentParams) {
  return prisma.comment.delete({
    where: {
      id,
      authorId: currentUserId,
    },
  });
}

export interface DBUpdateCommentParams {
  id: number;
  text: string;
  currentUserId: number;
}

export async function DBUpdateComment({
  id,
  text,
  currentUserId,
}: DBUpdateCommentParams) {
  return prisma.comment.update({
    where: {
      id,
      authorId: currentUserId,
    },
    data: {
      text,
    },
  });
}
