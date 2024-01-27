import AdminLayouts from "@/components/Layouts/Admin/AdminLayouts";
import PaymentLayout from "@/components/Layouts/Admin/PaymentLayout";
import UserLayout from "@/components/Layouts/Admin/UserLayout";
import { sessionCustom } from "@/interface/user";
import { AuthOptions, getServerSession } from "next-auth";
import React from "react";
import { options } from "../api/auth/[...nextauth]/options";
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

const getAllUser = async (token: string) => {
  console.log(token);

  if (token != undefined) {
    const res = await fetch(`${process.env.NEXT_URL_PUBLIC}/api/user/getAll`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res);

    const response = await res.json();
    if (!response.isSucceeded) {
      return { response };
    }

    return response;
  }
};
const adminPage = async () => {
  const session = await getServerSession<AuthOptions, sessionCustom>(options);
  const tokenSession = session?.user?.token as string;

  const payments = await getAllPayment(tokenSession);
  const users = await getAllUser(tokenSession);
  console.log(users);

  return (
    <div className="lg:flex gap-4 m-5">
      <AdminLayouts payments={payments} users={users} />
    </div>
  );
};

export default adminPage;
