"use client";

import { ErrorMessage } from "@/app/_components/ErrorMessage";
import { deleteComment } from "@/server/actions/comments";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import clsx from "clsx";
import { Icon } from "@/app/_components/Icon";

export interface DeleteCommentFormProps {
  commentId: number;
  className?: string;
}

export function DeleteCommentForm({
  commentId,
  className,
}: DeleteCommentFormProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const router = useRouter();

  const formAction = async (formData: FormData) => {
    if (isPending) {
      return;
    }
    startTransition(async () => {
      const result = await deleteComment(formData);
      if (result?.error) {
        setError(result.error);
      }
      router.refresh();
    });
  };
  return (
    <form
      className={clsx("flex items-center gap-1", className)}
      action={formAction}
    >
      {error ? <ErrorMessage>{error}</ErrorMessage> : null}
      <input type="hidden" name="commentId" value={commentId} />
      <button
        type="submit"
        {...(isPending && { "aria-disabled": isPending })}
        className={clsx(isPending && "opacity-50")}
      >
        <Icon id="trash" className="h-4 w-4" />
      </button>
    </form>
  );
}
