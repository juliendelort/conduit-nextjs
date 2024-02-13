import "server-only";
import prisma from "../lib/prisma";

//////////////////////////////////////////////////////////////
// DBListArticles
//////////////////////////////////////////////////////////////
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
  feed,
}: DBListArticlesParams) {
  const whereFilters = getArticleWhereFilters({
    tag,
    author,
    favoritedBy,
    feed,
    userId,
  });

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

function getArticleWhereFilters({
  feed,
  tag,
  author,
  favoritedBy,
  userId,
}: Pick<
  DBListArticlesParams,
  "feed" | "tag" | "author" | "favoritedBy" | "userId"
>) {
  if (feed) {
    // Feed: get all the articles from the people the current user follows
    return {
      author: {
        followedBy: {
          some: {
            id: userId,
          },
        },
      },
    };
  }

  if (tag) {
    // Tag: get all the articles that have a specific tag
    return {
      tagList: {
        some: {
          name: tag,
        },
      },
    };
  }

  if (author) {
    // Author: get all the articles from a specific author
    return { author: { username: author } };
  }

  if (favoritedBy) {
    // Favorited by: get all the articles that have been favorited by a specific user
    return {
      favoritedBy: {
        some: {
          username: favoritedBy,
        },
      },
    };
  }

  return {};
}

export type DBListArticlesItem = Awaited<
  ReturnType<typeof DBListArticles>
>["articles"][number];

//////////////////////////////////////////////////////////////
// DBfavoriteArticle
//////////////////////////////////////////////////////////////

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

//////////////////////////////////////////////////////////////
// DBFetchArticle
//////////////////////////////////////////////////////////////

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

//////////////////////////////////////////////////////////////
// DBCreateArticle
//////////////////////////////////////////////////////////////

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
        connectOrCreate: tagList.map((name) => ({
          where: { name },
          create: { name },
        })),
      },
    },
    include: {
      tagList: true,
    },
  });
}
