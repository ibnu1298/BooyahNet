import { NextRequest, NextResponse } from "next/server";

const url = "https://booyahnetapi.azurewebsites.net/api/User/OTP-ForgotPasswod";

async function ForgotPasswod(
  usernameOrEmail: string,
  password: string,
  otp: string
) {
  console.log(usernameOrEmail, password, otp);

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      usernameOrEmail,
      password,
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
  const req = await request.json();
  console.log(req.email);
  const res = await ForgotPasswod(req.email, req.password, req.otp as string);
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
