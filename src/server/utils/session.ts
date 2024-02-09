import { IronSession, getIronSession } from "iron-session";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { getEnv } from "./env";
import { AuthenticatedUser } from "@/types.ts/auth";

export interface SessionData extends AuthenticatedUser {
  isAuthenticated?: true;
  flashMessage?: string;
}

const COOKIE_NAME = "__session";

export function getSession(cookies: ReadonlyRequestCookies) {
  return getIronSession<SessionData>(cookies, {
    password: getEnv("SESSION_PWD"),
    cookieName: COOKIE_NAME,
  });
}

export async function setAuthUser(
  session: IronSession<SessionData>,
  user: AuthenticatedUser,
) {
  Object.keys(user).forEach((k) => {
    const key = k as keyof AuthenticatedUser;
    session[key] = user[key];
  });

  session.isAuthenticated = true;
  await session.save();
}

export async function deleteAuthUser(session: IronSession<SessionData>) {
  await session.destroy();
}
