import Currency from "@/components/Elements/Function/Currency";
import SpinCircle from "@/components/Elements/Loading/spinCircle";

import { useSession } from "next-auth/react";
import React, { useState } from "react";

const ModalMakeSure = ({
  totalTagihan,
  show,
  showModal,
  packageId,
  selectedPayments,
  selectedPricePayments,
  urlImage,
}: {
  selectedPricePayments: number[];
  selectedPayments: number[];
  totalTagihan: number;
  packageId: number;
  show: string;
  showModal: any;
  urlImage: string;
}) => {
  const { data: session }: { data: any } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [cursor, setCursor] = useState("");

  const PaymentUser = async (
    paymentId: Array<number>,
    pricePayment: Array<number>,
    packageId: number,
    userId: string,
    UrlImage: string,
    token: string
  ) => {
    setIsLoading(true);
    setCursor("cursor-wait");
    if (token != undefined) {
      const res = await fetch(`/api/payment/paymentUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          paymentId,
          pricePayment,
          packageId,
          userId,
          urlImage,
        }),
      });

      const response = await res.json();
      if (!response.isSucceeded) {
        return { response };
      }
      setIsLoading(false);
      setCursor("");
      window.location.reload();
      return response;
    }
  };

  return (
    <>
      <div
        id="popup-modal"
        className={`${show} z-50 flex item-center justify-center flex-col items-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0  w-full md:inset-0 h-[calc(100%-1rem)] max-h-full backdrop-blur-sm`}
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
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
            <div className="p-4 md:p-5 text-center flex flex-col">
              <h3 className=" text-2xl font-bold text-white pt-2">
                Pembayaran WIFI
              </h3>
              <p className="text-xs ">
                Pastikan harga sudah benar <br />
                tekan <span className="text-red-500 text-bold">Bayar</span>{" "}
                untuk melakukan pembayaran
              </p>

              {/* <hr /> */}
              <div className="my-2">
                <div>
                  Total Tagihan :{" "}
                  <Currency
                    classname="text-bold text-xl"
                    value={totalTagihan}
                  />
                </div>
              </div>
              <div className="flex justify-center gap-2 mb-2">
                <button
                  type="submit"
                  onClick={() =>
                    PaymentUser(
                      selectedPayments,
                      selectedPricePayments,
                      packageId,
                      session.user.id,
                      urlImage,
                      session.user.token
                    )
                  }
                  className={`w-20 text-white bg-red-600 focus:bg-red-950 focus:outline-none hover:bg-red-800 transition duration-500 delay-100 focus:ring-4 font-medium rounded-lg text-sm flex justify-center items-center px-5 py-2.5 text-center ${cursor} `}
                >
                  {isLoading ? (
                    <SpinCircle size={6} className="mx-3 flex justify-center" />
                  ) : (
                    <>Bayar</>
                  )}
                </button>
                <button
                  onClick={showModal}
                  type="button"
                  className="w-20  text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  Nanti
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalMakeSure;
