import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

const middleware = async (request: NextRequest) => {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/admin")) {
    // console.log(token?.user.confirmEmail);
    if (!token || token.email !== "admin@gmail.com") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  if (pathname.startsWith("/reservation")) {
    if (!token) {
      return NextResponse.redirect(new URL("/", request.url));
    } else if (
      token?.user.confirmEmail === false &&
      token?.user.password !== null
    ) {
      return NextResponse.redirect(new URL("/verifyEmail", request.url));
    }
  }
  if (pathname.startsWith("/favourite")) {
    if (!token) {
      return NextResponse.redirect(new URL("/", request.url));
    } else if (
      token?.user.confirmEmail === false &&
      token?.user.password !== null
    ) {
      return NextResponse.redirect(new URL("/verifyEmail", request.url));
    }
  }
  if (pathname.startsWith("/profile")) {
    if (!token) {
      return NextResponse.redirect(new URL("/", request.url));
    } else if (
      token?.user.confirmEmail === false &&
      token?.user.password !== null
    ) {
      return NextResponse.redirect(new URL("/verifyEmail", request.url));
    }
  }
  if (pathname.startsWith("/editprofile")) {
    if (
      !token ||
      token?.user.confirmEmail === false ||
      token?.user.password === null
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  return NextResponse.next();
};

export default middleware;
