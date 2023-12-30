"use client";
import Image from "next/image";
import React from "react";

const ModalPreviewPending = ({
  payment,
  show,
  showModal = () => {},
}: {
  payment: any;
  show?: string;
  showModal?: any;
}) => {
  return (
    <>
      <div
        id="popup-modal"
        className={`${show} flex item-center justify-center items-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50  w-full md:inset-0 h-[calc(100%-1rem)] max-h-full backdrop-blur-sm`}
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-900/90 backdrop-blur-sm">
            <button
              type="button"
              onClick={showModal}
              className="absolute top-3 end-2.5 text-gray-200 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="popup-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 0 0"
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
            <div className="p-4 md:px-12 text-center">
              <h3 className="text-2xl font-bold text-white ">
                Bukti Pembayaran
              </h3>
              <table className=" text-left text-[12px] my-2 font-extralight">
                <tbody>
                  <tr>
                    <td>Tanggal Pembayaran</td>
                    <td>: {payment != null && payment.paymentDateDesc}</td>
                  </tr>
                  <tr>
                    <td>Tanggal Tagihan</td>
                    <td>: {payment != null && payment.billingDateDesc}</td>
                  </tr>
                </tbody>
              </table>
              <a
                href={
                  payment != null
                    ? payment.urlImage.toString()
                    : "/images/people/default.jpg"
                }
              >
                <Image
                  className="rounded-md"
                  alt="Bukti Pembayaran"
                  src={
                    payment != null
                      ? payment.urlImage
                      : "/images/people/default.jpg"
                  }
                  width={500}
                  height={500}
                />
              </a>
              <div className="mt-4 flex justify-center gap-2">
                <button
                  onClick={showModal}
                  type="button"
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700/50 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  Kembali
                </button>
                <button
                  type="button"
                  className="text-white bg-teal-800 focus:bg-teal-950 focus:outline-none hover:bg-teal-600 transition duration-500 delay-100 focus:ring-4 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
                >
                  Ganti
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalPreviewPending;
