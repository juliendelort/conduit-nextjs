import { FollowButton } from "@/app/(main)/_components/FollowButton";
import { fetchProfileAPI } from "@/server/service/profiles";
import { getSession } from "@/server/utils/session";
import { cookies } from "next/headers";
import Image from "next/image";

export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  const session = await getSession(cookies());
  const { profile } = await fetchProfileAPI({
    username: params.username,
    token: session.token,
  });
  return (
    <header className="bg-surfacesecondary py-8 text-onsurfacesecondary">
      <div className="container mx-auto flex flex-col items-center gap-4">
        <Image
          src={profile.image}
          alt=""
          className="row-span-2 rounded-full"
          width={64}
          height={64}
        />
        <h1 className="text-3xl font-bold text-onsurfacesecondary">
          {profile.username}
        </h1>
        <FollowButton
          isFollowing={profile.following}
          isAuthenticated={!!session.isAuthenticated}
          username={profile.username}
          className="self-end"
          activeContainerClassName="bg-surfacetertiary text-onsurfacetertiary hover:text-onsurfaceprimaryhigh hover:text-onsurfacesecondary hover:border-onsurfacesecondary hover:bg-transparent"
          inactiveContainerClassName="text-onsurfacesecondary border-onsurfacesecondary hover:bg-surfacetertiary hover:text-onsurfacetertiary"
        />
      </div>
    </header>
  );
}
