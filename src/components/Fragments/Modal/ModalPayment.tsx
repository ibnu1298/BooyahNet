import Currency from "@/components/Elements/Function/Currency";
import { Payments } from "@/interface/payment";

import React, { useEffect, useState } from "react";
import ModalMakeSure from "./ModalMakeSure";

import UploadImagePayment from "@/components/Elements/UploadFile/UploadImagePayment";

const ModalPayment = ({
  payments,
  show,
  showModal,
  paymentId,
}: {
  payments: Payments[];
  show: string;
  showModal: any;
  paymentId?: number;
}) => {
  const defaultId = paymentId || payments[payments.length - 1].id;
  const defaultPrice = payments[payments.length - 1].package?.pricePackage;
  const [selectedPayments, setSelectedPayments] = useState([defaultId]);
  const [cursor, setCursor] = useState("cursor-pointer");
  const [showMakeSureModal, setShowMakeSureModal] = useState("hidden");
  const [urlImage, setUrlImage] = useState("");
  const [selectedPricePayments, setSelectedPricePayments] = useState([
    defaultPrice as number,
  ]);

  const initialValue = 0;
  const TotalTagihan = selectedPricePayments.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initialValue
  );

  const handleSelectUser = (event: any) => {
    const paymentId = event.target.id;
    const paymentPrice = event.target.value;

    if (!selectedPayments.includes(Number(paymentId) as never)) {
      setSelectedPayments([...selectedPayments, Number(paymentId) as never]); //add Payment
      setSelectedPricePayments([
        ...selectedPricePayments,
        Number(paymentPrice) as never,
      ]); //add Price
    } else {
      const dataOf = selectedPayments.indexOf(Number(paymentId) as never);
      selectedPricePayments.splice(dataOf, 1); //Remove Price
      setSelectedPayments(
        selectedPayments.filter((selectedPaymentId) => {
          return selectedPaymentId !== Number(paymentId); //remove Payment
        })
      );
    }
  };
  const handleSelectAllUsers = () => {
    if (selectedPayments.length < payments.length) {
      setSelectedPayments(
        payments.map((payment: Payments) => payment.id as never)
      );
      setSelectedPricePayments(
        payments.map((price: Payments) => price.package?.pricePackage as never)
      );
    } else {
      setSelectedPayments([]);
      setSelectedPricePayments([]);
    }
  };
  const getImage = async (urlImage: string) => {
    setUrlImage(urlImage);
  };
  function MakeSureModal() {
    if (showMakeSureModal == "hidden") {
      setShowMakeSureModal("");
    } else {
      setShowMakeSureModal("hidden");
    }
  }

  useEffect(() => {
    if (urlImage == "") {
      setCursor("cursor-not-allowed");
    } else {
      setCursor("cursor-pointer");
    }
  }, [urlImage]);

  return (
    <>
      <ModalMakeSure
        totalTagihan={TotalTagihan}
        packageId={payments[0].package?.id as number}
        selectedPayments={selectedPayments}
        selectedPricePayments={selectedPricePayments}
        show={showMakeSureModal}
        showModal={MakeSureModal}
        urlImage={urlImage}
      />
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
            <div className="p-4 md:p-5  text-center flex flex-col">
              <h3 className=" text-2xl font-bold text-white pt-2">
                Tagihan WIFI
              </h3>
              <p className="text-xs">Silakan pilih tagihan yang akan dibayar</p>
              <table className="w-full text-sm text-left rtl:text-right  my-2">
                {payments.length > 1 && (
                  <thead className=" text-gray-700 uppercase ">
                    <tr className="text-lg text-white">
                      <th>
                        <div className="flex items-center">
                          <input
                            id="checkbox-all-search"
                            type="checkbox"
                            className="w-6 h-6 my-1 text-teal-800 bg-gray-100 border-gray-300 rounded-full focus:ring-teal-800 dark:focus:ring-teal-800 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            checked={
                              selectedPayments.length === payments.length
                            }
                            onChange={handleSelectAllUsers}
                          />
                          <label
                            htmlFor="checkbox-all-search"
                            className="sr-only"
                          >
                            checkbox
                          </label>
                        </div>
                      </th>
                      <th>Tanggal</th>
                      <th>Harga</th>
                    </tr>
                  </thead>
                )}
                <tbody>
                  {payments.map((payment: Payments) => (
                    <tr key={payment.id} className="text-md">
                      <td>
                        {" "}
                        <div className="flex items-center">
                          <input
                            id={`${payment.id}`}
                            type="checkbox"
                            className="w-6 h-6 my-1 text-teal-800 bg-gray-100 border-gray-300 rounded-full focus:ring-teal-800 dark:focus:ring-teal-800 focus:dark:ring-4 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            onChange={handleSelectUser}
                            value={payment.package?.pricePackage}
                            checked={selectedPayments.includes(
                              Number(payment.id) as never
                            )}
                          />
                          <label
                            htmlFor="checkbox-table-search-1"
                            className="sr-only"
                          >
                            checkbox
                          </label>
                        </div>
                      </td>
                      <td>{payment.billingDateDesc}</td>
                      <td>
                        <Currency
                          value={payment.package?.pricePackage as number}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <hr />
              <div className="my-2">
                <div className="flex justify-between px-10 md:px-[46px]">
                  Total Tagihan :{" "}
                  <Currency
                    classname="text-bold text-xl"
                    value={TotalTagihan as number}
                  />
                </div>
                <p className="text-xs">
                  Silahkan <span className="text-bold">Upload</span> Bukti
                  Pembayaran
                </p>
              </div>
              <hr />
              <div className="flex justify-center items-center my-2 gap-2">
                <button
                  onClick={showModal}
                  type="button"
                  className="w-20  h-fit text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  Nanti
                </button>
                <button
                  className={`w-20 h-fit text-white bg-teal-800 focus:bg-teal-950 focus:outline-none hover:bg-teal-600 transition duration-500 delay-100 focus:ring-4 font-medium rounded-lg text-sm flex justify-center items-center px-5 py-2.5 text-center `}
                >
                  <UploadImagePayment
                    buttonUpload={<>Upload</>}
                    getImage={getImage}
                  />
                </button>
                <button
                  type="button"
                  disabled={urlImage == "" ? true : false}
                  onClick={MakeSureModal}
                  className={`w-20 ${cursor} h-fit  ${
                    urlImage != ""
                      ? `bg-teal-800 focus:bg-teal-950 focus:outline-none hover:bg-teal-600 focus:ring-4 text-white`
                      : `bg-gray-600 text-gray-400`
                  }  transition duration-500 delay-100 font-medium rounded-lg text-sm flex justify-center items-center px-5 py-2.5 text-center `}
                >
                  Lanjut
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalPayment;
