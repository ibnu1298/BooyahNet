import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const url = "https://booyahnetapi.azurewebsites.net/api/User/Register";
async function Registrasi(
  firstName: string,
  gender: number,
  userName: string,
  email: string,
  password: string
) {
  console.log(firstName, gender, userName, email, password);

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName,
      gender,
      userName,
      email,
      password,
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
  const page = request.nextUrl.searchParams.get("page");
  const headersInstance = headers();
  const authorization = headersInstance.get("authorization");
  const req = await request.json();
  const Sort = "Date";
  console.log(req);
  const res = await Registrasi(
    req.firstname,
    req.gender,
    req.username,
    req.email,
    req.password
  );
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
