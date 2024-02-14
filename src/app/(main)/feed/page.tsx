import { z } from "zod";
import {
  ArticlesContainer,
  ArticlesContainerProps,
} from "../../_components/articles/ArticlesContainer";
import { useProtectedRoute } from "@/app/_hooks/useProtectedRoute";

const pageSearchParamsSchema = z.object({
  page: z.coerce.number().optional().default(1),
});

export default async function Feed({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  await useProtectedRoute("/");
  const { page } = pageSearchParamsSchema.parse(searchParams);

  const props: ArticlesContainerProps = {
    isFeed: true,
    page,
    sections: [
      {
        title: `Your feed`,
        href: `/feed`,
        isActive: true,
      },
      {
        title: "Global Feed",
        href: "/",
        isActive: false,
      },
    ],
  };

  return <ArticlesContainer {...props} />;
}
