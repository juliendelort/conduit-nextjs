import "server-only";
import prisma from "../lib/prisma";

export async function DBListTags() {
  return prisma.tag.findMany();
}
