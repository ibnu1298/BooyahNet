import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

const url = "https://booyahnetapi.azurewebsites.net/api/Payment/Page";

async function GetPaymentUser(userId: string, token: any, page: any) {
  const res = await fetch(`${url}?page=${page}&take=3`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      userId,
    }),
  });
  if (res.status === 401) {
    return res;
  }
  if (!res.ok) {
    return res;
  }
  console.log(res);
  return res;
}

export async function POST(request: NextRequest) {
  const page = request.nextUrl.searchParams.get("page");
  const headersInstance = headers();
  const authorization = headersInstance.get("authorization");
  // console.log(headersInstance.get("host"));
  const req = await request.json();
  const res = await GetPaymentUser(req.userId, authorization, page);
  const result = await res.json();
  try {
    if (res.status !== 401) {
      console.log(result);
      return NextResponse.json(result, { status: res.status });
    }
    return NextResponse.json(
      { isSucceeded: false, message: "Silakan Cek Kembali token" },
      { status: res.status }
    );
  } catch (error) {
    return NextResponse.json(
      { isSucceeded: false, message: "Coba cek route api path ini" },
      { status: 500 }
    );
  }
}
