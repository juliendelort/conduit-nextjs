"use client";

import { ErrorMessage } from "@/app/_components/ErrorMessage";
import { inputClasses } from "@/app/_components/Input";
import { SubmitButton } from "@/app/_components/SubmitButton";
import { createArticle } from "@/server/actions/articles";
import { useState, useTransition } from "react";

export interface CreateArticleFormProps {}

export function CreateArticleForm({}: CreateArticleFormProps) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const formAction = async (formData: FormData) => {
    startTransition(async () => {
      const result = await createArticle(formData);
      if (result.error) {
        setError(result.error);
      }
    });
  };
  return (
    <>
      {error ? <ErrorMessage>{error}</ErrorMessage> : null}
      <form className="grid gap-4" action={formAction}>
        <input
          aria-label="Title"
          placeholder="Article Title"
          name="title"
          className={inputClasses}
          required
        />
        <input
          aria-label="Description"
          placeholder="What's this article about?"
          name="description"
          className={inputClasses}
          required
        />
        <textarea
          aria-label="Content"
          placeholder="Write your article (in markdown)"
          name="body"
          className={inputClasses}
          required
        />
        <input
          aria-label="Tags"
          placeholder="Enter tags (comma separated)"
          name="tagList"
          className={inputClasses}
        />
        <SubmitButton text="Publish Article" isPending={pending} />
      </form>
    </>
  );
}
