import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

const url = "https://booyahnetapi.azurewebsites.net/api/User/UpdateImage";
const urlPayment =
  "https://booyahnetapi.azurewebsites.net/api/Payment/UpdateImage";

async function UpdateImage(id: string, imageURL: string, token: string) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      id,
      imageURL,
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
async function UpdateImagePayment(
  id: string,
  userId: string,
  URLImage: string,
  token: string
) {
  const res = await fetch(urlPayment, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      id,
      userId,
      URLImage,
      status: 1,
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

export async function POST(request: NextRequest) {
  const headersInstance = headers();
  const authorization = headersInstance.get("authorization");
  const req = await request.json();
  let res;
  if (req.from == "payment") {
    res = await UpdateImagePayment(
      req.id,
      req.userId,
      req.imageURL,
      authorization as string
    );
  } else {
    res = await UpdateImage(req.id, req.imageURL, authorization as string);
  }

  const result = await res.json();

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
