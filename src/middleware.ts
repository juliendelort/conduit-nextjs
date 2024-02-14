import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Adding a custom header so that we can read the current URL from a server component
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-url", request.url);
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
