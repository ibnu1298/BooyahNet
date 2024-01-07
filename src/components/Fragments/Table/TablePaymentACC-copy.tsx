"use client";
import { Pagination } from "@nextui-org/react";
import Image from "next/image";
import React, { useMemo, useState } from "react";
import { FaSortDown, FaSortUp } from "react-icons/fa6";

const TablePaymentACC = ({ paymentsBase }: { paymentsBase: any[] }) => {
  const [hidePagination, setHidePagination] = useState("");
  const [showModal, setShowModal] = useState("");
  const [showModalPending, setShowModalPending] = useState("hidden");
  const [ascStatus, setAscStatus] = useState(false);
  const [ascDate, setAscDate] = useState(false);
  const [payments, setPayments] = useState(paymentsBase);
  const [paymentSelectedId, setPaymentSelectedId] = useState(0);
  const [payment, setPayment] = useState(null);
  const [page, setPage] = useState(1);
  const rowsPerPage = 8;

  const notPayment = payments.filter(function (payment) {
    return payment.status == 0;
  });

  function sortData(sortBy: string) {
    return sortBy == "status" ? sortStatus() : sortDate();
    function sortStatus() {
      if (!ascStatus) {
        setAscStatus(true);
        setPayments(payments.sort((a, b) => a.status - b.status));
      } else {
        setAscStatus(false);
        setPayments(payments.sort((a, b) => b.status - a.status));
      }
    }
    function sortDate() {
      if (!ascDate) {
        setAscDate(true);
        setPayments(
          payments.sort((a, b) => b.billingDatelong - a.billingDatelong)
        );
      } else {
        setAscDate(false);
        setPayments(
          payments.sort((a, b) => a.billingDatelong - b.billingDatelong)
        );
      }
    }
  }
  const PaymentModal = (status: number, payment: any) => {
    if (status == 0) {
      if (showModal == "hidden") {
        setShowModal("");
        setPaymentSelectedId(payment.id);
      } else {
        setShowModal("hidden");
      }
    }

    if (status == 1) {
      if (showModalPending == "hidden") {
        setShowModalPending("");
        setPayment(payment);
      } else {
        setShowModalPending("hidden");
        setPayment(payment);
      }
    }
  };

  const pages = Math.ceil(payments.length / rowsPerPage);
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    ascStatus;
    ascDate;
    return payments.slice(start, end);
  }, [page, payments, ascDate, ascStatus]);

  console.log(items);

  return (
    <div className="m-4">
      {payments.length > 0 ? (
        <>
          <div className="relative w-[600px] sm:w-full flex flex-col justify-center shadow-xl rounded-lg sm:absolute backdrop-blur-sm bg-gray-700/70">
            <div className="flex justify-center py-4 w-full text-2xl md:text-3xl text-bold text-white">
              Riwayat Pembayaran
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr className="text-base md:text-lg text-white">
                  <th scope="col" className="px-6 py-3">
                    <a
                      className="cursor-pointer flex "
                      onClick={() => sortData("date")}
                    >
                      Tanggal
                      <div className="opacity-0 hover:opacity-100 duration-700 w-32 pl-20 sm:pl-[90px] absolute">
                        {ascDate ? (
                          <FaSortDown />
                        ) : (
                          <div className="mt-2">
                            <FaSortUp />
                          </div>
                        )}
                      </div>
                    </a>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <a
                      className="cursor-pointer flex"
                      onClick={() => sortData("status")}
                    >
                      Status
                      <div className="opacity-0 hover:opacity-100 duration-700 w-32 pl-16 sm:pl-20 absolute">
                        {!ascStatus ? (
                          <FaSortDown />
                        ) : (
                          <div className="mt-2">
                            <FaSortUp />
                          </div>
                        )}
                      </div>
                    </a>
                  </th>
                  <th className="px-6 py-3">Customer</th>
                </tr>
              </thead>
              <tbody>
                {items.length > 0 &&
                  items.map((payment: any) => (
                    <tr
                      className={` bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 ${
                        payment.status == 0 && "cursor-pointer"
                      }`}
                      key={payment.id}
                      onClick={() => PaymentModal(payment.status, payment)}
                    >
                      <td className="px-6 py-4">
                        {payment.status == 0
                          ? payment.billingDateDesc
                          : payment.paymentDateDesc}
                      </td>
                      <td className="px-6 py-4 sm:w-60  w-[180px]">
                        {payment.status == 2 && (
                          <div className="text-emerald-300 bg-emerald-500/30 rounded-full px-4 py-1 w-20 flex justify-center">
                            {payment.statusDesc}
                          </div>
                        )}
                        {payment.status == 1 && (
                          <div className="relative">
                            <div className="absolute px-2 w-fit h-full  sm:px-4 py-1 rounded-full z-10  bg-gray-50 dark:bg-gray-600 text-white flex flex-col items-center justify-center opacity-0  hover:opacity-100 cursor-pointer bg-opacity-90 duration-300">
                              <p>Klik Untuk Lihat</p>
                            </div>
                            <div className="text-yellow-300 bg-yellow-500/30 rounded-full px-4 py-1 w-24 flex justify-center">
                              {payment.statusDesc}
                            </div>
                          </div>
                        )}
                        {payment.status == 0 && (
                          <div className="relative">
                            <div className="absolute px-2 w-fit h-full  sm:px-4 py-1 rounded-full z-10  bg-gray-50 dark:bg-gray-600 text-white flex flex-col items-center justify-center opacity-0  hover:opacity-100 cursor-pointer bg-opacity-90 duration-300">
                              <p>Klik Untuk Bayar</p>
                            </div>
                            <div className="text-red-300  bg-red-500/30 rounded-full px-4 w-fit text-center py-1 ">
                              {payment.statusDesc}
                            </div>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-gray-200 w-fit">
                        <span className="flex flex-row gap-2 items-center">
                          <span>
                            <Image
                              className="h-8 w-8 rounded-full"
                              width={500}
                              height={500}
                              alt="profile"
                              src={`${
                                payment.user.urlImage != null
                                  ? payment.user.urlImage
                                  : `/images/people/default.jpg`
                              }`}
                            />
                          </span>
                          <span className="flex flex-col">
                            <span className="text-lg -mb-1">
                              {payment.user.firstName}
                            </span>
                            <span className="text-xs -mt-1">
                              {payment.user.userName}
                            </span>
                          </span>
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div className={`h-fit py-3 flex justify-center ${hidePagination}`}>
              <Pagination
                isCompact
                showControls
                showShadow
                color="secondary"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default TablePaymentACC;
