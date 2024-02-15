import { cookies } from "next/headers";
import { getSession } from "@/server/utils/session";
import { z } from "zod";
import {
  ArticlesContainer,
  ArticlesContainerProps,
} from "../_components/articles/ArticlesContainer";
import { ErrorMessage } from "../_components/ErrorMessage";

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
  const result = pageSearchParamsSchema.safeParse(searchParams);

  if (!result.success) {
    return (
      <ErrorMessage className="text-center">Invalid search params</ErrorMessage>
    );
  }
  const { page, tag } = result.data;
  const props: ArticlesContainerProps = {
    page,
    tag,
    sections: [
      ...(session.user
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
