"use client";

import { AutoGrowingTextArea } from "@/app/_components/AutoGrowingTextArea";
import { ErrorMessage } from "@/app/_components/ErrorMessage";
import { classMerge } from '@/app/classMerge';
import { createComment } from "@/server/actions/comments";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import { Comment } from "./Comment";

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
  const formRef = useRef<HTMLFormElement>(null);

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
      formRef.current?.reset();
    });
  };
  return (
    <form action={formAction} ref={formRef}>
      <Comment
        content={
          <AutoGrowingTextArea
            name="text"
            placeholder="Write a comment..."
            inputClassName="bg-surfaceprimary p-4 text-onsurfaceprimary placeholder:text-onsurfaceprimaryhighest"
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
              className={classMerge(
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
