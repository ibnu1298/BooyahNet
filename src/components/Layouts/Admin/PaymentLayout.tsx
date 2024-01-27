import TablePaymentACC from "@/components/Fragments/Table/TablePaymentACC";
import React from "react";

const PaymentLayout = ({ payments }: { payments: any }) => {
  const response = payments;
  return (
    <div className="m-4">
      <TablePaymentACC payments={response.payments} />
    </div>
  );
};

export default PaymentLayout;
