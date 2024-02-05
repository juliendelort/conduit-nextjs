import { titillium_web } from "./fonts";
import { cookies } from "next/headers";
import classNames from "classnames";
import { getSession } from "@/server/utils/session";

export default async function Home() {
  const session = await getSession(cookies());

  return (
    <header
      className={classNames(
        "bg-primary py-8 text-center text-white shadow-inner",
        { "sr-only": session.isAuthenticated },
      )}
    >
      <h1
        className={classNames(
          titillium_web.className,
          "mb-4 text-5xl drop-shadow-md",
        )}
      >
        conduit
      </h1>
      <p className="text-2xl font-light">A place to share your knowledge</p>
    </header>
  );
}
