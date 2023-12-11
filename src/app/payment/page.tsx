import TablePayment from "@/components/Fragments/Table/TablePayment";
import TablePaymentServer from "@/components/Fragments/Table/TablePaymentServer";
export default async function PaymentPage() {
  return (
    <div className="mt-5">
      <TablePayment />
      {/* <TablePaymentServer /> */}
    </div>
  );
}
