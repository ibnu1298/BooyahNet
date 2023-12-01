import { NextRequest, NextResponse } from "next/server";

interface reponseLogin {
  userId: string;
  firstname: string;
  lastname: string;
  address: string;
  email: string;
  gender: number;
  phoneNumber: string;
  username: string;
  token: string;
  message: string;
  isSucceeded: boolean;
}
const url = "https://booyahnetapi.azurewebsites.net/api/User/Login";

async function LoginAuth(user: string, pass: string) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      usernameOrEmail: user,
      password: pass,
    }),
  });
  console.log(res);
  if (!res.ok) {
    return res.json();
  }
  return res.json();
}

export async function POST(request: NextRequest) {
  const req = await request.json();
  console.log(req);

  try {
    return NextResponse.json(
      await LoginAuth(req.usernameOrEmail, req.password)
    );
  } catch (err) {
    return NextResponse.json({ status: 500, message: err });
  }
}
