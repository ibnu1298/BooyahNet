import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

const url = "https://booyahnetapi.azurewebsites.net/api/Admin/AccPaymentUser";

async function PaymentACC(
  userID: Array<string>,
  paymentId: Array<number>,
  accept: Array<boolean>,
  token: any
) {
  console.log(userID, paymentId, accept);

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      userID,
      paymentId,
      accept,
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
  console.log(req.accept);

  const res = await PaymentACC(
    req.userId,
    req.paymentId,
    req.accept,
    authorization
  );
  const result = await res.json();
  console.log(res);
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
