import type { User } from "@prisma/client";

export type SafeUser = Omit<
  User,
  "encryptedPassword" | "createdAt" | "updatedAt"
>;
