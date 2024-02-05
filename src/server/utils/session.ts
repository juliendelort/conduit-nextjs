import { IronSession, getIronSession } from "iron-session";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { getEnv } from "./env";
import { User } from "@/types.ts/auth";

export interface SessionData extends User {
  isAuthenticated?: true;
}

export function getSession(cookies: ReadonlyRequestCookies) {
  return getIronSession<SessionData>(cookies, {
    password: getEnv("SESSION_PWD"),
    cookieName: "__session",
  });
}

export async function setAuthUser(
  session: IronSession<SessionData>,
  user: User,
) {
  Object.keys(user).forEach((k) => {
    const key = k as keyof User;
    session[key] = user[key];
  });

  session.isAuthenticated = true;
  await session.save();
}
