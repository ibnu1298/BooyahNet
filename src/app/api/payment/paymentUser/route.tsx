import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

const url = "https://booyahnetapi.azurewebsites.net/api/Payment/AddPayment";

async function PaymentUser(
  paymentId: Array<number>,
  pricePayment: Array<number>,
  packageId: number,
  userID: string,
  token: any
) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      userID,
      paymentId,
      pricePayment,
      packageId,
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

  const res = await PaymentUser(
    req.paymentId,
    req.pricePayment,
    req.packageId,
    req.userId,
    authorization
  );
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
