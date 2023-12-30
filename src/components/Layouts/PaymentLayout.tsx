import { options } from "@/app/api/auth/[...nextauth]/options";
import { AuthOptions, getServerSession } from "next-auth";
import React from "react";

import { sessionCustom } from "@/interface/user";
import TablePayment from "../Fragments/Table/TablePayment";

const getUserPayment = async (userId: string, token: string) => {
  if (token != undefined) {
    const res = await fetch(`${process.env.NEXT_URL_PUBLIC}/api/payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId,
      }),
    });

    const response = await res.json();
    if (!response.isSucceeded) {
      return { response };
    }

    return response;
  }
};

const PaymentLayout = async () => {
  const session = await getServerSession<AuthOptions, sessionCustom>(options);
  const tokenSession = session?.user?.token as string;
  const userIdSession = session?.user?.id as string;

  const { payments } = await getUserPayment(userIdSession, tokenSession);
  console.log(payments);

  return (
    <div className=" sm:absolute relative m-3 flex justify-center items-center">
      <TablePayment paymentsBase={payments != null ? payments : []} />
    </div>
  );
};

export default PaymentLayout;
