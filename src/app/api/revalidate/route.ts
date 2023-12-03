import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const tag = req.nextUrl.searchParams.get("tag");
  const secret = req.nextUrl.searchParams.get("secret");
  const token = process.env.REVALIDATE_TOKEN;

  if (secret !== token) {
    return NextResponse.json({ isSucceeded: false, message: "Invalid Secret" });
  }
  if (!tag) {
    return NextResponse.json({
      isSucceeded: false,
      message: "Missing tag param",
    });
  }
  revalidateTag(tag);

  return NextResponse.json({
    isSucceeded: true,
    message: "Revalidate Success Anjay",
  });
}
