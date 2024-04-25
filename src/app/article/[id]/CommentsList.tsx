"use client";

import type { CommentRecord} from "@/server/data/comments";
import { DBGetComments } from "@/server/data/comments";
import { DEFAULT_USER_IMAGE_URL } from "@/server/utils/const";
import clsx from "clsx";
import { DateTime } from "luxon";
import Image from "next/image";
import Link from "next/link";
import { useState, useTransition } from "react";
import { Comment } from "./Comment";
import { DeleteCommentForm } from "./DeleteCommentForm";

export interface CommentsListProps {
  firstCommentsPage: CommentRecord[];
  articleId: number;
  currentUserId?: number;
  initialHasMore: boolean;
}

export function CommentsList({
  firstCommentsPage,
  articleId,
  currentUserId,
  initialHasMore,
}: CommentsListProps) {
  const [additionalComments, setAdditionalComments] = useState<CommentRecord[]>(
    [],
  );
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [isPending, startTransition] = useTransition();
  const allComments = [...firstCommentsPage, ...additionalComments];

  const handleLoadMore = async () => {
    const lastComment = allComments[allComments.length - 1];
    startTransition(async () => {
      const { comments: newComments, hasMore } = await DBGetComments({
        articleId,
        fromId: lastComment?.id,
      });
      setHasMore(hasMore);
      setAdditionalComments([...additionalComments, ...newComments]);
    });
  };

  return (
    <>
      {allComments.map((c) => (
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
              {currentUserId === c.authorId && (
                <DeleteCommentForm className="ml-auto" commentId={c.id} />
              )}
            </>
          }
        />
      ))}
      {hasMore && (
        <button
          className={clsx(
            "mx-auto block text-brand",
            isPending && "opacity-50",
          )}
          onClick={handleLoadMore}
          {...(isPending && { "aria-disabled": true })}
        >
          Load more...
        </button>
      )}
    </>
  );
}
