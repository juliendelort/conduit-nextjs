import { z } from "zod";
import { ErrorMessage } from "../_components/ErrorMessage";
import {
  ArticlesContainer,
  ArticlesContainerProps,
} from "../_components/articles/ArticlesContainer";

const pageSearchParamsSchema = z.object({
  page: z.coerce.number().optional().default(1),
  tag: z.string().optional(),
});

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
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
  };

  return <ArticlesContainer {...props} />;
}
