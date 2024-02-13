"server only";

import { Prisma, User } from "@prisma/client";
import prisma from "../lib/prisma";
import { experimental_taintUniqueValue as taintUniqueValue } from "react";
import { SafeMessageError } from "@/types/errors";
import { comparePassword, hashPassword } from "../utils/auth";

export interface DBCreateUserParams {
  email: string;
  password: string;
  username: string;
  image: string;
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
          "An account with this email already exists. Please login or use a different email.",
        );
      }
    }
    throw e;
  }
}

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

export interface DBFollowUserParams {
  username: string;
  currentUserId: number;
}
export async function DBFollowUser({
  username,
  currentUserId,
}: DBFollowUserParams) {
  return filterUserFields(
    await prisma.user.update({
      where: {
        username,
      },
      data: {
        followedBy: {
          connect: {
            id: currentUserId,
          },
        },
      },
    }),
  );
}

export async function DBUnfollowUser({
  username,
  currentUserId,
}: DBFollowUserParams) {
  return filterUserFields(
    await prisma.user.update({
      where: {
        username,
      },
      data: {
        followedBy: {
          disconnect: {
            id: currentUserId,
          },
        },
      },
    }),
  );
}

export interface DBGetUserParams {
  username: string;
  currentUserId?: number;
}
export async function DBGetUser({ username, currentUserId }: DBGetUserParams) {
  return prisma.user.findUnique({
    where: {
      username,
    },
  });
}

function filterUserFields(user: User) {
  const { encryptedPassword, ...restUser } = user;
  return restUser;
}
