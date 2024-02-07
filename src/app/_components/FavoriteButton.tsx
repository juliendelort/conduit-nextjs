"use client";
import { toggleFavoriteArticle } from "@/server/actions/articles";
import clsx from "clsx";
import Image from "next/image";
import { useFormState } from "react-dom";
import { useOptimistic } from "react";

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
  async function formAction(formData: FormData) {
    toggleFavoritedLocal(null);
    await toggleFavoriteArticle(null, formData);
  }
  const [favoritedData, toggleFavoritedLocal] = useOptimistic(
    {
      favorited: isFavorited,
      favoritesCount: favoritesCount,
      isOptimistic: false,
    },
    (state) => ({
      ...state,
      isOptimistic: true,
      favorited: !state.favorited,
      favoritesCount: state.favorited
        ? state.favoritesCount - 1
        : state.favoritesCount + 1,
    }),
  );

  const favorited = favoritedData.favorited;
  const count = favoritedData.favoritesCount;

  return (
    <form action={formAction}>
      <button
        className={clsx(
          "flex items-center gap-1 rounded border border-brand p-1 text-sm",
          favorited ? "text-onbrand bg-brand" : "bg-transparent text-brand",
          favoritedData.isOptimistic && "opacity-50",
        )}
      >
        <input type="hidden" name="slug" value={slug} />
        <input
          type="hidden"
          name="newFavoriteValue"
          value={(!favorited).toString()}
        />
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
