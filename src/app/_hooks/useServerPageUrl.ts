import { headers } from "next/headers";

export function useServerPageUrl() {
  // The x-url header is set in our custom middleware. This is not a standard next.js thing.
  return headers().get("x-url") as string;
}
