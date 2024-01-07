import { options } from "@/app/api/auth/[...nextauth]/options";
// import TableNext from "@/components/Fragments/Table/TableNext";
import TablePaymentACC from "@/components/Fragments/Table/TablePaymentACC";
import { sessionCustom } from "@/interface/user";
import { AuthOptions, getServerSession } from "next-auth";
import React from "react";

const getAllPayment = async (token: string) => {
  if (token != undefined) {
    const res = await fetch(
      `${process.env.NEXT_URL_PUBLIC}/api/payment/getAll`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res);

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

  const response = await getAllPayment(tokenSession);
  console.log(response.payments);

  return (
    <div className="m-4">
      <TablePaymentACC payments={response.payments} />
      {/* <TableNext /> */}
    </div>
  );
};

export default PaymentLayout;
