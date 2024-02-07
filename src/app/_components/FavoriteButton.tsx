"use client";
import { favoriteArticle, unFavoriteArticle } from "@/server/actions/articles";
import clsx from "clsx";
import Image from "next/image";
import { useFormState } from "react-dom";

export interface FavoriteButtonProps {
  favoritesCount: number;
  isFavorited: boolean;
  slug: string;
}

export function FavoriteButton({
  favoritesCount,
  isFavorited,
  slug,
}: FavoriteButtonProps) {
  const [state, action] = useFormState(
    isFavorited ? unFavoriteArticle : favoriteArticle,
    {
      error: { message: "" },
      data: undefined,
    },
  );

  const favorited = state.data?.article?.favorited ?? isFavorited;
  const count = state.data?.article?.favoritesCount ?? favoritesCount;
  return (
    <form action={action}>
      <button
        className={clsx(
          "flex items-center gap-1 rounded border border-brand p-1 text-sm",
          favorited ? "text-onbrand bg-brand" : "bg-transparent text-brand",
        )}
      >
        <input type="hidden" name="slug" value={slug} />
        <Image
          src={favorited ? "/heart_onbrand_solid.svg" : "heart_brand_solid.svg"}
          alt=""
          width={18}
          height={18}
        />
        {count}
      </button>
    </form>
  );
}
