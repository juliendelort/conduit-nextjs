"use client";

import { AutoGrowingTextArea } from "@/app/_components/AutoGrowingTextArea";
import { ErrorMessage } from "@/app/_components/ErrorMessage";
import { inputClasses } from "@/app/_components/Input";
import { SubmitButton } from "@/app/_components/SubmitButton";
import { createArticle } from "@/server/actions/articles";
import clsx from "clsx";
import { useState, useTransition } from "react";
import Markdown from "react-markdown";

export interface CreateArticleFormProps {}

export function CreateArticleForm({}: CreateArticleFormProps) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [isPreview, setIsPreview] = useState(false);
  const [body, setBody] = useState("");
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
        <div>
          <button
            type="button"
            onClick={() => setIsPreview(!isPreview)}
            className="mb-1 ml-auto block text-sm hover:underline"
          >
            {isPreview ? "Edit" : "Preview"}
          </button>
          <Markdown
            className={clsx(
              "prose dark:prose-invert prose-pre:whitespace-break-spaces prose-pre:break-all w-full max-w-none rounded  bg-surfacesecondary p-4",
              !isPreview && "hidden",
            )}
          >
            {body}
          </Markdown>
          <AutoGrowingTextArea
            aria-label="Content"
            placeholder="Write your article (in markdown)"
            name="body"
            onChange={(e) => setBody(e.target.value)}
            value={body}
            required
            containerClassName={clsx(isPreview && "hidden")}
            inputClassName={inputClasses}
          />
        </div>
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
