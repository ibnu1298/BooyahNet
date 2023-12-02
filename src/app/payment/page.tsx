"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

export default function PaymentPage() {
  const router = useRouter();
  const { data: session, status }: { data: any; status: string } = useSession();

  return (
    <div className=" 2-fix; - hg-96 reunded-[12px] flex justify center items-center">
      <h1></h1>
      <div>Token: {session?.user.token}</div>
    </div>
  );
}
