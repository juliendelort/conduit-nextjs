# Conduit

This is a blogging platform that allows users to create, read, update, and delete articles. Users can also follow other users and favorite articles. This is a simplified implementation of the [RealWorld project](https://github.com/gothinkster/realworld?tab=readme-ov-file) and is built using the [Next.js](https://nextjs.org/) app router (React Server Components), [Prisma](https://www.prisma.io/), TypeScript, and [Tailwind CSS](https://tailwindcss.com/).

## Demo

This is deployed on Vercel and can be accessed [here](https://conduit-nextjs.vercel.app/). The data is hosted in a [Neon](https://neon.tech/) Postgres database.

This is a work in progress. Expect bugs.

## Running locally

Clone the repo, run `npm install` and create a local `.env` file at the root of the repo with the following environment variables:

```
# A ramdom string used to encrypt the session cookie
SESSION_PWD=<random_string>
# A postgres database url
DATABASE_URL=<db_url>
```

Intialize the database:

```bash
npm run db:deploy
```

Optionally, you can seed the database with some initial data:

```bash
npm run db:seed
```

Then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
