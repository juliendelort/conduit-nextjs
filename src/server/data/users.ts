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

function filterUserFields(user: User) {
  const { encryptedPassword, ...restUser } = user;
  return restUser;
}
