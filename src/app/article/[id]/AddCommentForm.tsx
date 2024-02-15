"use client";

import { ErrorMessage } from "@/app/_components/ErrorMessage";
import { createComment } from "@/server/actions/comments";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Comment } from "./Comment";
import { AutoGrowingTextArea } from "@/app/_components/AutoGrowingTextArea";
import Image from "next/image";
import clsx from "clsx";

export interface AddCommentFormProps {
  articleId: number;
  currentUserImage: string;
}

export function AddCommentForm({
  articleId,
  currentUserImage,
}: AddCommentFormProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const router = useRouter();

  const formAction = async (formData: FormData) => {
    if (isPending) {
      return;
    }
    startTransition(async () => {
      const result = await createComment(formData);
      if (result?.error) {
        setError(result.error);
      }
      router.refresh();
    });
  };
  return (
    <form action={formAction}>
      <Comment
        content={
          <AutoGrowingTextArea
            name="text"
            placeholder="Write a comment..."
            inputClassName="p-4 bg-surfaceprimary text-onsurfaceprimary placeholder:text-onsurfaceprimaryhighest"
          />
        }
        footer={
          <>
            <Image
              src={currentUserImage}
              alt=""
              className="mr-auto rounded-full"
              width={24}
              height={24}
            />
            {error ? <ErrorMessage>{error}</ErrorMessage> : null}
            <button
              type="submit"
              {...(isPending && { "aria-disabled": isPending })}
              className={clsx(
                "block rounded bg-brand px-2 py-1 text-sm font-bold text-onbrand transition-colors hover:bg-brandhover",
                isPending && "opacity-50",
              )}
            >
              Post Comment
            </button>
          </>
        }
      />
      <input type="hidden" name="articleId" value={String(articleId)} />
    </form>
  );
}
