import { Prisma, User } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { hashPassword } from "../server/utils/auth";
import prisma from "../server/lib/prisma";

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
        bio: faker.person.bio() + ` Password for testing: ${password}`,
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

function createArticles(users: Prisma.UserCreateManyInput[], tags: string[]) {
  const articles = [...Array(300).fill(0)].map((i) => {
    return {
      title: faker.lorem.sentence(),
      description: faker.lorem.paragraph(),
      body: faker.lorem.paragraphs(5),
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

async function main() {
  const users = await createUsers();
  const tags = createTags();
  const articles = createArticles(users, tags);

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
            connect: faker.helpers
              .arrayElements(otherUsers, { min: 0, max: users.length / 2 })
              .map((u) => ({ username: u.username })),
          },
        },
      });
    }),
  ]);
}

main();
