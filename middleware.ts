// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Path yang butuh autentikasi
const protectedRoutes = ["/home", "/todo", "/profile"];

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const pathname = req.nextUrl.pathname;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected && !token) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  if ((pathname === "/login" || pathname === "/register" || pathname === "/") && token) {
    const homeUrl = new URL("/home", req.url);
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}
