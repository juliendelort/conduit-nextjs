import prisma from "../lib/prisma";

export interface DBGetCommentsParams {
  articleId: number;
}

// TODO: add cursor based pagination
export async function DBGetComments({ articleId }: DBGetCommentsParams) {
  return prisma.comment.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      articleId,
    },
    include: {
      author: true,
    },
  });
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
