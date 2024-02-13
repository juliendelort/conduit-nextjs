"server only";

import { Prisma } from "@prisma/client";
import prisma from "../lib/prisma";
import { experimental_taintUniqueValue as taintUniqueValue } from "react";
import { SafeMessageError } from "@/types/errors";
import { comparePassword, hashPassword } from "../utils/auth";

//////////////////////////////////////////////////////////////
// DBCreateUser
//////////////////////////////////////////////////////////////

export interface DBCreateUserParams {
  email: string;
  password: string;
  username: string;
}

export async function DBCreateUser({ password, ...rest }: DBCreateUserParams) {
  try {
    const user = await prisma.user.create({
      data: {
        ...rest,
        encryptedPassword: await hashPassword(password),
      },
    });
    taintUniqueValue(
      "Do not pass password to the client",
      user,
      user.encryptedPassword,
    );

    return filterUserFields(user);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        throw new SafeMessageError(
          "An account with this email or username already exists. Please login or use different values.",
        );
      }
    }
    throw e;
  }
}

//////////////////////////////////////////////////////////////
// DBGetUserByEmailAndPasswordParams
//////////////////////////////////////////////////////////////

export interface DBGetUserByEmailAndPasswordParams {
  email: string;
  password: string;
}

export async function DBGetUserByEmailAndPassword({
  email,
  password,
}: DBGetUserByEmailAndPasswordParams) {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    return null;
  }

  if (!(await comparePassword({ password, hash: user.encryptedPassword }))) {
    return null;
  }

  return filterUserFields(user);
}

//////////////////////////////////////////////////////////////
// DBUpdateUser
//////////////////////////////////////////////////////////////

export interface DBUpdateUserParams {
  email: string;
  password?: string;
  username: string;
  image: string;
  bio?: string;
}

export async function DBUpdateUser({
  username,
  email,
  password,
  image,
  bio,
}: DBUpdateUserParams) {
  const user = await prisma.user.update({
    where: {
      email,
    },
    data: {
      username,
      image,
      bio,
      ...(password && { encryptedPassword: await hashPassword(password) }),
    },
  });

  return filterUserFields(user);
}

//////////////////////////////////////////////////////////////
// DBFollowUser
//////////////////////////////////////////////////////////////

export interface DBFollowUserParams {
  userId: number;
  followerId: number;
}
export async function DBFollowUser({ userId, followerId }: DBFollowUserParams) {
  if (userId === followerId) {
    throw new SafeMessageError("You cannot follow yourself");
  }
  return filterUserFields(
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        followedBy: {
          create: [
            {
              followingId: followerId,
            },
          ],
        },
      },
    }),
  );
}

//////////////////////////////////////////////////////////////
// DBUnfollowUser
//////////////////////////////////////////////////////////////
export async function DBUnfollowUser({
  userId,
  followerId,
}: DBFollowUserParams) {
  await prisma.follow.delete({
    where: {
      followingId_followedById: {
        followingId: followerId,
        followedById: userId,
      },
    },
  });
}

//////////////////////////////////////////////////////////////
// DBGetUser
//////////////////////////////////////////////////////////////

export interface DBGetUserParams {
  username: string;
  currentUserId?: number;
}
export async function DBGetUser({ username, currentUserId }: DBGetUserParams) {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
    ...(!!currentUserId && {
      include: {
        _count: {
          select: {
            followedBy: {
              where: {
                followingId: currentUserId,
              },
            },
          },
        },
      },
    }),
  });

  return user
    ? filterUserFields({
        ...user,
        ...(!!currentUserId && {
          following: (user as any)._count.followedBy > 0,
        }),
      })
    : null;
}

function filterUserFields<T extends { encryptedPassword: string }>(user: T) {
  const { encryptedPassword, ...restUser } = user;
  return restUser;
}
