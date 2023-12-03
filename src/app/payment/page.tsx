import TablePayment from "@/components/Fragments/Table/TablePayment";
export default async function PaymentPage() {
  // const session = await getServerSession<AuthOptions, sessionCustom>(options);
  return (
    <div className="mt-5">
      {/* <div>Nama : {session?.user?.name}</div> */}
      <TablePayment />
    </div>
  );
}
