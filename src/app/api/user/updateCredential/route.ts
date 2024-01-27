import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

const url = "https://booyahnetapi.azurewebsites.net/api/User/UpdateCredential";

async function UpdateEmailUsername(
  id: string,
  email: string,
  userName: string,
  oldPassword: string,
  changePassword: boolean,
  token: string
) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      id,
      email,
      userName,
      oldPassword,
      changePassword,
    }),
  });
  if (res.status === 401) {
    return res;
  }
  if (!res.ok) {
    return res;
  }

  return res;
}
async function UpdatePassword(
  id: string,
  email: string,
  oldPassword: string,
  newPassword: string,
  changePassword: boolean,
  token: string
) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      id,
      email,
      oldPassword,
      newPassword,
      changePassword,
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

  let res;
  if (req.changePassword) {
    res = await UpdatePassword(
      req.id,
      req.email,
      req.oldPassword,
      req.newPassword,
      req.changePassword,
      authorization as string
    );
  } else {
    res = await UpdateEmailUsername(
      req.id,
      req.email,
      req.userName,
      req.oldPassword,
      req.changePassword,
      authorization as string
    );
  }
  const result = await res?.json();

  try {
    if (res?.status !== 401) {
      return NextResponse.json(result, { status: res?.status });
    }
    return NextResponse.json(
      {
        isSucceeded: false,
        message:
          result.message != "" ? result.message : `Silakan Cek Kembali token`,
      },
      { status: res?.status }
    );
  } catch (error) {
    return NextResponse.json(
      { isSucceeded: false, message: "Coba cek route api path ini" },
      { status: 500 }
    );
  }
}
