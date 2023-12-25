import { NextRequest, NextResponse } from "next/server";
import withAuth from "./middlewares/withAuth";

export function mainMiddleware(request: NextRequest) {
  const res = NextResponse.next();
  return res;
}
export default withAuth(mainMiddleware, [
  "/",
  "/payment",
  "/products",
  "/package",
  "/login",
  "/register",
  "/profile-settings",
]);
