import TablePayment from "@/components/Fragments/Table/TablePayment";
import { sessionCustom } from "@/interface/payment";
import { AuthOptions } from "next-auth";
import { getServerSession } from "next-auth/next";
import { options } from "../api/auth/[...nextauth]/options";
export default async function PaymentPage() {
  const session = await getServerSession<AuthOptions, sessionCustom>(options);
  return (
    <div className="mt-5">
      <div className="flex justify-center my-5 text-3xl text-bold">
        Riwayat Pembayaran
      </div>
      <div>Nama : {session?.user?.name}</div>
      <TablePayment />
    </div>
  );
}
