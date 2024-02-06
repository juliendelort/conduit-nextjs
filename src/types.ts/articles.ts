import { User } from "./auth";

export interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: Pick<User, "username" | "bio" | "image"> & { following: boolean };
}
