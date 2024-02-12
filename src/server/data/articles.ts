import "server-only";
import { Article } from "@/types/articles";
import { BASE_URL, handleFetchResponse } from "./utils";
import prisma from "../lib/prisma";

export interface DBListArticlesParams {
  limit: number;
  offset: number;
  tag?: string;
  feed?: boolean;
  authorId?: number;
  favoritedByUserId?: number;
  userId?: number;
}

export async function DBListArticles({
  limit,
  offset,
  tag,
  authorId,
  favoritedByUserId,
  userId,
}: DBListArticlesParams) {
  const whereFilters = tag
    ? {
        tagList: {
          some: {
            name: tag,
          },
        },
      }
    : authorId
      ? { authorId }
      : favoritedByUserId
        ? {
            favoritedBy: {
              some: {
                id: favoritedByUserId,
              },
            },
          }
        : {};

  const [articles, count] = await prisma.$transaction([
    prisma.article.findMany({
      skip: offset,
      take: limit,
      where: whereFilters,
      include: {
        author: true,
        tagList: true,
        favoritedBy: { select: { id: true } },
      },
    }),
    prisma.article.count({
      where: whereFilters,
    }),
  ]);

  return {
    articles: articles.map((article) => ({
      ...article,
      favoritesCount: article.favoritedBy.length,
      favorited: !!article.favoritedBy.find((u) => u.id === userId),
    })),
    articlesCount: count,
    pagesCount: Math.ceil(count / limit),
  };
}

export type DBListArticlesItem = Awaited<
  ReturnType<typeof DBListArticles>
>["articles"][number];

export interface DBFavoriteArticleParams {
  slug: string;
  token: string;
}
export async function DBfavoriteArticle({
  slug,
  token,
}: DBFavoriteArticleParams) {
  const response = await fetch(`${BASE_URL}/api/articles/${slug}/favorite`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return handleFetchResponse<{
    article: Article;
  }>(response);
}

export async function DBUnFavoriteArticle({
  slug,
  token,
}: DBFavoriteArticleParams) {
  const response = await fetch(`${BASE_URL}/api/articles/${slug}/favorite`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return handleFetchResponse<{
    article: Article;
  }>(response);
}

export interface DBFetchArticleParams {
  id: number;
  userId?: number;
}

export async function DBFetchArticle({ id, userId }: DBFetchArticleParams) {
  const article = await prisma.article.findUnique({
    where: {
      id,
    },
    include: {
      author: true,
      tagList: true,
      favoritedBy: { select: { id: true } },
    },
  });

  return article
    ? {
        ...article,
        favoritesCount: article.favoritedBy.length,
        favorited: !!article.favoritedBy.find((u) => u.id === userId),
      }
    : null;
}

export interface DBCreateArticleParams {
  title: string;
  description: string;
  body: string;
  tagList: string[];
  authorId: number;
}

export async function DBCreateArticle({
  title,
  description,
  body,
  tagList,
  authorId,
}: DBCreateArticleParams) {
  return await prisma.article.create({
    data: {
      title,
      description,
      body,
      authorId,
      tagList: {
        create: tagList.map((name) => ({ name })),
      },
    },
    include: {
      tagList: true,
    },
  });
}
