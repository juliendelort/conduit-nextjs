import { cookies } from "next/headers";
import { getSession } from "@/server/utils/session";
import { z } from "zod";
import {
  ArticlesContainer,
  ArticlesContainerProps,
} from "./_components/ArticlesContainer";

const pageSearchParamsSchema = z.object({
  page: z.coerce.number().optional().default(1),
  tag: z.string().optional(),
});

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getSession(cookies());
  const { page, tag } = pageSearchParamsSchema.parse(searchParams);

  const props: ArticlesContainerProps = {
    page,
    tag,
    sections: [
      ...(session.isAuthenticated
        ? [
            {
              title: `Your feed`,
              href: `/feed`,
              isActive: false,
            },
          ]
        : []),
      {
        title: "Global Feed",
        href: "/",
        isActive: !tag,
      },
      ...(tag
        ? [
            {
              title: `#${tag}`,
              href: `/?tag=${tag}`,
              isActive: true,
            },
          ]
        : []),
    ],
  };

  return <ArticlesContainer {...props} />;
}
