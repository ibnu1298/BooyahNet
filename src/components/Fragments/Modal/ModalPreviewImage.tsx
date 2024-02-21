"use client";
import React, { useState } from "react";
import Image from "next/image";
import SpinCircle from "@/components/Elements/Loading/spinCircle";
import { useSession } from "next-auth/react";

const ModalPreviewImage = ({
  src,
  show,
  showModal,
  payment,
  ACC,
  showModalNotif,
}: {
  showModal: any;
  payment: any;
  show: string;
  src: string;
  ACC?: boolean;
  showModalNotif: any;
}) => {
  console.log(ACC);

  const [isLoading, setIsLoading] = useState(false);
  const { data: session }: { data: any } = useSession();

  const [cursor, setCursor] = useState("");
  if (payment != null) {
    console.log(payment.user.id);
  }

  const paymentACC = async (token: string, accept: boolean) => {
    setIsLoading(true);
    setCursor("cursor-wait");
    if (token != undefined && payment != null) {
      const res = await fetch(`/api/payment/paymentACC`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: [payment.user.id],
          paymentId: [payment.id],
          accept: [accept],
        }),
      });

      const response = await res.json();
      console.log(response);

      if (!response.isSucceeded) {
        return { response };
      }
      setIsLoading(false);
      setCursor("");
      showModalNotif();
      showModal();
      return response;
    }
  };
  return (
    <div
      id="popup-modal"
      className={`${show} bg-gray-800/70 p-4 gap-5 flex item-center justify-center flex-col items-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-10 w-full md:w-full md:inset-0 h-[calc(100%-1rem)] max-h-full backdrop-blur-sm`}
    >
      <div className="bg-gray-900/20 p-5 rounded-lg backdrop-blur-md  flex flex-col items-center gap-3">
        <table className="text-left text-[15px] font-medium">
          <tbody>
            <tr>
              <td>Payment Date</td>
              <td>: {payment != null && payment.paymentDateDesc}</td>
            </tr>
            <tr>
              <td>Billing Date</td>
              <td>: {payment != null && payment.billingDateDesc}</td>
            </tr>
            <tr>
              <td>Customer</td>
              <td>
                :{" "}
                {payment != null && payment.user.asName == null
                  ? `${payment.user.firstName} ${payment.user.lastName}`
                  : payment?.user.asName}
              </td>
            </tr>
          </tbody>
        </table>
        <div>
          <a href={src}>
            <Image
              alt="Preview Image"
              width={500}
              height={500}
              src={src}
              className="rounded-xl max-h-96 w-fit"
            />
          </a>
        </div>
        {ACC && (
          <div className="flex justify-center items-center mt-1 gap-3">
            <button
              type="submit"
              className={`w-20 text-white bg-red-600 focus:bg-red-950 focus:outline-none hover:bg-red-800 transition duration-500 delay-100 focus:ring-4 font-medium rounded-md text-sm flex justify-center items-center px-2 py-1 text-center ${cursor} `}
              onClick={() => paymentACC(session?.user.token, false)}
            >
              {isLoading ? (
                <SpinCircle size={6} className="mx-3 flex justify-center" />
              ) : (
                <>Reject</>
              )}
            </button>
            <button
              type="submit"
              className={`w-20 text-white bg-teal-600 focus:bg-teal-950 focus:outline-none hover:bg-teal-800 transition duration-500 delay-100 focus:ring-4 font-medium rounded-md text-sm flex justify-center items-center px-2 py-1 text-center ${cursor} `}
              onClick={() => paymentACC(session?.user.token, true)}
            >
              {isLoading ? (
                <SpinCircle size={6} className="mx-3 flex justify-center" />
              ) : (
                <>Accept</>
              )}
            </button>
          </div>
        )}
      </div>
      <div>
        <button
          type="button"
          onClick={showModal}
          className=" text-gray-100 border-2 rounded-full bg-transparent hover:bg-gray-200 hover:text-gray-400 text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-400/50 dark:hover:text-white"
          data-modal-hide="popup-modal"
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ModalPreviewImage;
