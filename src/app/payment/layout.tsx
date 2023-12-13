import React from "react";
import PaymentPage from "./page";
import Navbar from "@/components/Fragments/Navbar";
import Footer from "@/components/Fragments/Footer";

export default function Paymentlayout() {
  return (
    <>
      <Navbar />
      <title>Payment</title>
      <div>
        <PaymentPage />
      </div>
      <div className="my-20"></div>
      <Footer />
    </>
  );
}
