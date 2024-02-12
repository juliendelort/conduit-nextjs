import { FollowButton } from "@/app/(main)/_components/FollowButton";
import { fetchProfileAPI } from "@/server/service/profiles";
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
  const { profile } = await fetchProfileAPI({
    username: params.username,
    token: session.token,
  });
  const isCurrentUser = session.username === profile.username;
  return (
    <>
      <header className="bg-surfacesecondary pb-4 pt-8 text-onsurfacesecondary">
        <div className="container mx-auto flex flex-col items-center gap-4">
          <Image
            src={profile.image}
            alt=""
            className="row-span-2 mb-1 rounded-full"
            width={96}
            height={96}
          />
          <h1 className="text-3xl font-bold text-onsurfacesecondary">
            {profile.username}
          </h1>
          {!isCurrentUser && (
            <FollowButton
              isFollowing={profile.following}
              isAuthenticated={!!session.isAuthenticated}
              username={profile.username}
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
