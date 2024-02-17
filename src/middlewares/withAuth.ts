import JwtDecodeCustom from "@/app/api/auth/[...nextauth]/options";
import { jwtDecode } from "jwt-decode";
import { getToken } from "next-auth/jwt";
import { signOut } from "next-auth/react";
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";

const onlyAdminPage = ["/admin"];
const authPage = ["/login", "/register"];

export default function withAuth(
  middleware: NextMiddleware,
  requireAuth: string[] = []
) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname;
    if (requireAuth.includes(pathname)) {
      const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
      });
      if (token?.token != null) {
        const decoded = jwtDecode<JwtDecodeCustom>(token?.token as string);
        var dateExp = new Date(decoded.exp != null ? decoded.exp * 1000 : 0);
        var dateNow = new Date(Date.now());
        console.log(dateExp.getTime() < dateNow.getTime());
        // console.log(dateExp.toLocaleDateString());
        // console.log(dateNow.toLocaleDateString());
        if (dateExp.getTime() < dateNow.getTime()) {
        }
      }

      if (!token && !authPage.includes(pathname)) {
        const url = new URL("/login", req.url);
        url.searchParams.set("callbackUrl", encodeURI(req.url));

        return NextResponse.redirect(url);
      }
      if (token) {
        if (authPage.includes(pathname)) {
          return NextResponse.redirect(new URL("/", req.url));
        }
        if (token?.role !== "admin" && onlyAdminPage.includes(pathname)) {
          return NextResponse.redirect(new URL("/404", req.url));
        }
      }
    }
    return middleware(req, next);
  };
}
