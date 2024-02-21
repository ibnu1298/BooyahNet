import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

const url =
  "https://booyahnetapi.azurewebsites.net/api/User/OTP-VerifikasiEmail";

async function VerifikasiEmail(
  usernameOrEmail: string,
  otp: string,
  token: string
) {
  console.log(usernameOrEmail, otp, token);

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      usernameOrEmail,
      otp,
    }),
  });
  console.log(res);

  if (res.status === 401) {
    return res;
  }
  if (!res.ok) {
    return res;
  }
  return res;
}

export async function POST(request: NextRequest) {
  const headersInstance = headers();
  const authorization = headersInstance.get("authorization");
  const req = await request.json();
  console.log(req);
  const res = await VerifikasiEmail(
    req.email,
    req.otp as string,
    authorization as string
  );
  console.log(res);
  const result = await res.json();
  console.log(result);

  try {
    if (res.status !== 401) {
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
