import { Payments } from "@/interface/payment";
import { Radio } from "@nextui-org/react";
import React, { useState } from "react";

const ModalPayment = ({
  payments,
  show,
  showModal,
}: {
  payments: Payments[];
  show: string;
  showModal: any;
}) => {
  const [selectedPayments, setSelectedPayments] = useState([]);
  const handleSelectUser = (event: any) => {
    const paymentId = event.target.value;

    if (!selectedPayments.includes(Number(paymentId) as never)) {
      setSelectedPayments([...selectedPayments, Number(paymentId) as never]);
    } else {
      setSelectedPayments(
        selectedPayments.filter((selectedPaymentId) => {
          return selectedPaymentId !== Number(paymentId);
        })
      );
    }
  };
  const handleSelectAllUsers = () => {
    if (selectedPayments.length < payments.length) {
      setSelectedPayments(
        payments.map((patment: Payments) => patment.id as never)
      );
    } else {
      setSelectedPayments([]);
    }
  };
  console.log(selectedPayments);

  return (
    <div
      id="popup-modal"
      className={`${show} flex item-center justify-center items-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50  w-full md:inset-0 h-[calc(100%-1rem)] max-h-full backdrop-blur-sm`}
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
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
            <h3 className=" text-lg font-normal text-white py-2">
              Anda Punya tagihan WIFI
            </h3>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 my-4">
              <thead className=" text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr className="text-lg">
                  <th>
                    <div className="flex items-center">
                      <input
                        id="checkbox-all-search"
                        type="checkbox"
                        className="w-6 h-6 my-1 text-teal-800 bg-gray-100 border-gray-300 rounded-full focus:ring-teal-800 dark:focus:ring-teal-800 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        checked={selectedPayments.length === payments.length}
                        onChange={handleSelectAllUsers}
                      />
                      <label htmlFor="checkbox-all-search" className="sr-only">
                        checkbox
                      </label>
                    </div>
                  </th>
                  <th>Tanggal</th>
                  <th>Harga</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment: Payments) => (
                  <tr key={payment.id} className="text-md">
                    <td>
                      {" "}
                      <div className="flex items-center">
                        <input
                          id={`${payment.id}`}
                          type="checkbox"
                          className="w-6 h-6 my-1 text-teal-800 bg-gray-100 border-gray-300 rounded-full focus:ring-teal-800 dark:focus:ring-teal-800 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          onChange={handleSelectUser}
                          value={payment.id}
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
                    <td>Rp {payment.package?.pricePackage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-center">
              <button
                onClick={showModal}
                type="button"
                className="w-20 me-2 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                Nanti
              </button>
              <button
                type="button"
                className="w-20 text-white bg-teal-800 focus:bg-teal-950 focus:outline-none hover:bg-teal-600 transition duration-500 delay-100 focus:ring-4 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center "
              >
                Bayar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalPayment;
