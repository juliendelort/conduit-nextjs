import { DBGetComments } from "@/server/data/comments";
import { DEFAULT_USER_IMAGE_URL } from "@/server/utils/const";
import { DateTime } from "luxon";
import Image from "next/image";
import Link from "next/link";
import { Comment } from "./Comment";
import { getSession } from "@/server/utils/session";
import { cookies } from "next/headers";
import { DeleteCommentForm } from "./DeleteCommentForm";

export interface CommentsListProps {
  articleId: number;
}

export async function CommentsList({ articleId }: CommentsListProps) {
  const session = await getSession(cookies());
  const comments = await DBGetComments({ articleId });
  return comments.map((c) => (
    <Comment
      key={c.id}
      content={c.text}
      contentClassName="p-4"
      footer={
        <>
          <Link
            href={`/profile/${c.author.username}`}
            className="flex items-center gap-1 text-brand hover:underline"
          >
            <Image
              src={c.author.image ?? DEFAULT_USER_IMAGE_URL}
              alt=""
              className="rounded-full"
              width={24}
              height={24}
            />
            {c.author.username}
          </Link>
          <div className="font-light text-onsurfaceprimaryhighest">
            {DateTime.fromJSDate(c.createdAt).toLocaleString(
              DateTime.DATE_MED_WITH_WEEKDAY,
            )}
          </div>
          {session.user?.id === c.authorId && (
            <DeleteCommentForm className="ml-auto" commentId={c.id} />
          )}
        </>
      }
    />
  ));
}
