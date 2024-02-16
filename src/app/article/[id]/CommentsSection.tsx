import { DBGetComments } from "@/server/data/comments";
import { getSession } from "@/server/utils/session";
import { cookies } from "next/headers";
import { CommentsList } from "./CommentsList";

export interface CommentsListProps {
  articleId: number;
}

export async function CommentsSection({ articleId }: CommentsListProps) {
  const session = await getSession(cookies());
  const { comments, hasMore } = await DBGetComments({ articleId });

  return (
    <CommentsList
      firstCommentsPage={comments}
      initialHasMore={hasMore}
      articleId={articleId}
      currentUserId={session.user?.id}
    />
  );
}
