import { titillium_web } from "./fonts";
import { cookies } from "next/headers";
import { clsx } from "clsx";
import { getSession } from "@/server/utils/session";

export default async function Home() {
  const session = await getSession(cookies());
  return (
    <>
      <header
        className={clsx("bg-brand py-8 text-center text-white shadow-inner", {
          "sr-only": session.isAuthenticated,
        })}
      >
        <h1
          className={clsx(
            titillium_web.className,
            "mb-4 text-5xl drop-shadow-md",
          )}
        >
          conduit
        </h1>
        <p className="text-2xl font-light">A place to share your knowledge</p>
      </header>
    </>
  );
}
