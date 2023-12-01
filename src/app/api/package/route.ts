import { NextRequest, NextResponse } from "next/server";
import { Interface } from "readline";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJpYm51YXFpbDEyOThAZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiYWRtaW4iLCJleHAiOjE3MDE0NDA3MzF9.t3BJwty76Xcoi-8GE49hYEP1hkcRgEjSZZBSfu5Ehic";
export async function GET() {
  const res = await fetch(
    "https://booyahnetapi.azurewebsites.net/api/Package",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!res.ok) {
    throw new Error("Gagal Fetching Data");
  }
  const data = await res.json();
  console.log(data);
  return Response.json({ data });
}
