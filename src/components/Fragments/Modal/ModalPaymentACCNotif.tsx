"use client";
import SpinCircle from "@/components/Elements/Loading/spinCircle";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

const ModalPaymentACCNotif = ({
  payments,
  show,
  showModal,
  paymentId,
}: {
  payments: any[];
  show: string;
  showModal: any;
  paymentId: any[];
}) => {
  const { data: session }: { data: any } = useSession();

  return (
    <>
      <div
        id="popup-modal"
        className={`${show}  flex item-center justify-center flex-col items-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-10 w-full md:w-full md:inset-0 h-[calc(100%-1rem)] max-h-full backdrop-blur-sm`}
      >
        <div className="relative p-4 w-96 md:w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg  shadow dark:bg-gray-700">
            <button
              type="button"
              onClick={showModal}
              className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
            <div className="p-4 md:p-5  text-center flex flex-col gap-2">
              <h3 className=" text-2xl font-bold text-white pt-2">
                {paymentId?.length} Pending Payment
              </h3>
              <p className="text-xs">Perubahan Status Pembayaran Berhasil</p>

              <hr />
              <div className="flex justify-center items-center my-2 gap-2">
                <button
                  type="submit"
                  className={`w-20 text-white bg-teal-600 focus:bg-teal-950 focus:outline-none hover:bg-teal-800 transition duration-500 delay-100 focus:ring-4 font-medium rounded-lg text-sm flex justify-center items-center px-5 py-2.5 text-center cursor-pointer `}
                  onClick={() => window.location.reload()}
                >
                  <>OK</>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalPaymentACCNotif;
