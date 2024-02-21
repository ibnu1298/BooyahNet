import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

const url = "https://booyahnetapi.azurewebsites.net/api/User/UpdateUser";

async function UpdateUser(
  id: string,
  firstName: string,
  lastName: string,
  address: string,
  gender: string,
  phoneNumber: string,
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
      firstName,
      lastName,
      address,
      gender,
      phoneNumber,
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
async function UpdateWIFI(
  id: string,
  UserNameWifi: string,
  PasswordWifi: string,
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
      UserNameWifi,
      PasswordWifi,
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
async function UpdateCustomer(id: string, asName: string, token: string) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      id,
      asName,
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
  let res;
  if (req.type == "WIFI") {
    res = await UpdateWIFI(
      req.id,
      req.userName,
      req.password,
      authorization as string
    );
  } else if (req.type == "admin") {
    res = await UpdateCustomer(req.id, req.asName, authorization as string);
  } else {
    res = await UpdateUser(
      req.id,
      req.firstName,
      req.lastName,
      req.address,
      req.gender,
      req.phoneNumber,
      authorization as string
    );
  }
  console.log(res);
  const result = await res?.json();
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
