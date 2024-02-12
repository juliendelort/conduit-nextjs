import { IronSession, getIronSession } from "iron-session";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { getEnv } from "./env";
import { SafeUser } from "@/types/auth";

export interface SessionData {
  user?: SafeUser;
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
  user: SafeUser,
) {
  session.user = user;

  await session.save();
}

export async function deleteAuthUser(session: IronSession<SessionData>) {
  await session.destroy();
}
