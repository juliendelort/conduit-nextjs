import { Prisma } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { hashPassword } from "../server/utils/auth";
import prisma from "../server/lib/prisma";

// Run this using `npx ts-node src/scripts/dataingest.ts`

async function createUsers() {
  const USERS_COUNT = 50;
  const emails = faker.helpers.uniqueArray(faker.internet.email, USERS_COUNT);
  const usernames = faker.helpers.uniqueArray(
    faker.internet.userName,
    USERS_COUNT,
  );
  const users: Prisma.UserCreateManyInput[] = await Promise.all(
    emails.map(async (email, index) => {
      const password = faker.internet.password();
      return {
        email: email,
        username: usernames[index],
        encryptedPassword: await hashPassword(password),
        bio: faker.person.bio() + `.\n Password for testing: ${password}`,
        image: faker.image.avatar(),
      };
    }),
  );
  return users;
}

function createTags() {
  return faker.helpers
    .uniqueArray(faker.science.chemicalElement, 15)
    .map((e) => e.name);
}

async function createArticles(
  users: Prisma.UserCreateManyInput[],
  tags: string[],
) {
  const markdowns = await Promise.all(
    [...Array(100).fill(0)].map(generateMarkdown),
  );

  const articles = [...Array(300).fill(0)].map((i) => {
    return {
      title: faker.lorem.sentence(),
      description: faker.lorem.paragraph(),
      body: faker.helpers.arrayElement(markdowns),
      author: {
        connect: { username: faker.helpers.arrayElement(users).username },
      },
      tagList: {
        connectOrCreate: faker.helpers
          .arrayElements(tags, { min: 0, max: 5 })
          .map((tag) => {
            return {
              where: {
                name: tag,
              },
              create: {
                name: tag,
              },
            };
          }),
      },
      favoritedBy: {
        connect: faker.helpers
          .arrayElements(users, {
            min: 0,
            max: faker.number.int({ min: 0, max: users.length / 2 }),
          })
          .map((user) => ({
            username: user.username,
          })),
      },
    };
  });

  return articles;
}

async function generateMarkdown() {
  const response = await fetch(
    "https://jaspervdj.be/lorem-markdownum/markdown.txt",
  );

  return response.ok ? response.text() : "";
}

async function backfillFollows() {
  const users = await prisma.user.findMany();

  await prisma.$transaction(
    users.map((u) => {
      const otherUsers = users.filter((user) => user.username !== u.username);
      return prisma.user.update({
        where: { id: u.id },
        data: {
          followedBy: {
            create: faker.helpers
              .arrayElements(otherUsers, { min: 0, max: users.length / 2 })
              .map((u) => ({
                following: { connect: { username: u.username } },
              })),
          },
        },
      });
    }),
  );
}

async function main() {
  const users = await createUsers();
  const tags = createTags();
  const articles = await createArticles(users, tags);

  await prisma.$transaction([
    prisma.user.createMany({ data: users }),
    ...articles.map((a) => prisma.article.create({ data: a })),
    ...users.map((u) => {
      const otherUsers = users.filter((user) => user.username !== u.username);
      return prisma.user.update({
        where: { username: u.username },
        data: {
          ...u,
          followedBy: {
            create: faker.helpers
              .arrayElements(otherUsers, { min: 0, max: users.length / 2 })
              .map((u) => ({
                following: { connect: { username: u.username } },
              })),
          },
        },
      });
    }),
  ]);
}

main();
