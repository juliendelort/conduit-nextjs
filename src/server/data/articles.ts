import "server-only";
import prisma from "../lib/prisma";

export interface DBListArticlesParams {
  limit: number;
  offset: number;
  tag?: string;
  feed?: boolean;
  author?: string;
  favoritedBy?: string;
  userId?: number;
}

export async function DBListArticles({
  limit,
  offset,
  tag,
  author,
  favoritedBy,
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
    : author
      ? { author: { username: author } }
      : favoritedBy
        ? {
            favoritedBy: {
              some: {
                username: favoritedBy,
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
  id: number;
  userId: number;
}
export function DBfavoriteArticle({ id, userId }: DBFavoriteArticleParams) {
  return prisma.article.update({
    where: {
      id,
    },
    data: {
      favoritedBy: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

export function DBUnFavoriteArticle({ id, userId }: DBFavoriteArticleParams) {
  return prisma.article.update({
    where: {
      id,
    },
    data: {
      favoritedBy: {
        disconnect: {
          id: userId,
        },
      },
    },
  });
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
