/* eslint-disable @typescript-eslint/no-unused-vars */
import { faker } from "@faker-js/faker";
import type { Prisma } from "@prisma/client";
import prisma from "../src/server/lib/prisma";
import { hashPassword } from "../src/server/utils/auth";

// Run this using `npx ts-node src/scripts/dataingest.ts`

async function createUsers() {
  const USERS_COUNT = 50;
  const emails = faker.helpers.uniqueArray(faker.internet.email, USERS_COUNT);
  const usernames = faker.helpers.uniqueArray(
    faker.internet.userName,
    USERS_COUNT,
  );
  const users = await Promise.all(
    emails.map(async (email, index) => {
      const password = faker.internet.password();
      return {
        email: email,
        username: usernames[index]!,
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

  const articles = [...Array(300).fill(0)].map(() => {
    return {
      title: faker.lorem.sentence(),
      description: faker.lorem.paragraph(),
      body: faker.helpers.arrayElement(markdowns),
      author: {
        connect: { username: faker.helpers.arrayElement(users).username },
      },
      createdAt: faker.date.past({ years: 1 }),
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
      comments: {
        create: [...Array(faker.number.int({ min: 0, max: 100 })).fill(0)].map(
          () => ({
            author: {
              connect: { username: faker.helpers.arrayElement(users).username },
            },
            text: faker.lorem.paragraphs({ min: 1, max: 5 }, "\n\n"),
          }),
        ),
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
  // https://github.com/jaspervdj/lorem-markdownum#http-api
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

async function backfillComments() {
  const users = await prisma.user.findMany();
  const articles = await prisma.article.findMany();

  await prisma.$transaction(
    articles.map((a) =>
      prisma.article.update({
        where: { id: a.id },
        data: {
          comments: {
            create: [
              ...Array(faker.number.int({ min: 0, max: 100 })).fill(0),
            ].map((c) => ({
              author: {
                connect: {
                  username: faker.helpers.arrayElement(users).username,
                },
              },
              text: faker.lorem.paragraphs({ min: 1, max: 5 }, "\n\n"),
            })),
          },
        },
      }),
    ),
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

// @ts-ignore
await main();
