import { FollowButton } from "@/app/_components/articles/FollowButton";
import { ErrorMessage } from "@/app/_components/ErrorMessage";
import { DBGetUser } from "@/server/data/users";
import { DEFAULT_USER_IMAGE_URL } from "@/server/utils/const";
import { getSession } from "@/server/utils/session";
import { cookies } from "next/headers";
import Image from "next/image";
import { ReactNode } from "react";

export default async function Layout({
  params,
  children,
}: {
  params: { username: string };
  children: ReactNode;
}) {
  const session = await getSession(cookies());
  const user = await DBGetUser({
    username: params.username,
    currentUserId: session.user?.id,
  });
  if (!user) {
    return <ErrorMessage className="text-center">User not found</ErrorMessage>;
  }
  const isCurrentUser = session.user?.id === user?.id;
  return (
    <>
      <header className="bg-surfacesecondary pb-4 pt-8 text-onsurfacesecondary">
        <div className="container mx-auto flex flex-col items-center">
          <Image
            src={user.image ?? DEFAULT_USER_IMAGE_URL}
            alt=""
            className="row-span-2 mb-1 rounded-full"
            width={96}
            height={96}
          />
          <h1 className="mt-4 text-3xl font-bold text-onsurfacesecondary">
            {user.username}
          </h1>
          <p className="text-sm font-extralight">{user.email}</p>
          <p className="mt-4 whitespace-pre text-center font-light">
            {user.bio}
          </p>
          {!isCurrentUser && (
            <FollowButton
              isFollowing={!!user.following}
              isAuthenticated={!!session.user}
              userId={user.id}
              username={user.username}
              className="self-end"
              activeContainerClassName="bg-surfacetertiary text-onsurfacetertiary hover:text-onsurfaceprimaryhigh hover:text-onsurfacesecondary hover:border-onsurfacesecondary hover:bg-transparent"
              inactiveContainerClassName="text-onsurfacesecondary border-onsurfacesecondary hover:bg-surfacetertiary hover:text-onsurfacetertiary"
            />
          )}
        </div>
      </header>
      <main className="container mx-auto mt-16 max-w-5xl">{children}</main>
    </>
  );
}
