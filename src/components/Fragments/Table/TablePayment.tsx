"use client";
import React, { useEffect, useMemo, useState } from "react";
import ModalPayment from "../Modal/ModalPayment";
import { Payments } from "@/interface/payment";
import { Pagination } from "@nextui-org/react";
import { color } from "framer-motion";
const TablePayment = ({ payments }: { payments: Payments[] }) => {
  const [hidePagination, setHidePagination] = useState("");
  const [showModal, setShowModal] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 6;

  const PaymentModal = () => {
    if (showModal == "hidden") {
      setShowModal("");
    } else {
      setShowModal("hidden");
    }
  };

  const notPayment = payments.filter(function (payment) {
    return payment.status == "BelumDibayar";
  });

  useEffect(() => {
    if (payments.length <= rowsPerPage) {
      setHidePagination("invisible");
    }
  }, [payments]);

  const pages = Math.ceil(payments.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return payments.slice(start, end);
  }, [page, payments]);
  return (
    <div className="md:ml-9">
      {payments.length > 0 ? (
        <>
          {payments.length > 0 && notPayment.length > 0 && (
            <>
              {showModal == "" ? (
                <ModalPayment
                  payments={notPayment}
                  show={showModal}
                  showModal={PaymentModal}
                />
              ) : (
                <a onClick={PaymentModal}>
                  <div className="z-50 fixed bottom-8 end-2 md:hidden text-white bg-red-500 rounded-full px-4 text-center sm:px-5 py-1.5 cursor-pointer">
                    Bayar
                    <br />
                  </div>
                </a>
              )}
            </>
          )}

          <div className="relative w-[350px] md:w-[450px]  shadow-xl rounded-lg md:absolute backdrop-blur-sm bg-gray-700/70">
            <div className="flex justify-center mx-4 py-4 w-full text-2xl text-bold text-white">
              Riwayat Pembayaran
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Tanggal
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.length > 0 &&
                  items.map((payment: any) => (
                    <tr
                      className=" bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      key={payment.id}
                    >
                      <td className="px-6 py-4">
                        {payment.status == "BelumDibayar"
                          ? payment.billingDateDesc
                          : payment.paymentDateDesc}
                      </td>
                      <td className="px-6 py-4 ">
                        {payment.status == "Lunas" && (
                          <div className="text-emerald-300 bg-emerald-500/30 rounded-full px-4 py-1 w-20 flex justify-center">
                            {payment.status}
                          </div>
                        )}
                        {payment.status == "Pending" && (
                          <div className="text-yellow-300 bg-yellow-500/30 rounded-full px-4 py-1 w-24 flex justify-center">
                            {payment.status}
                          </div>
                        )}
                        {payment.status == "BelumDibayar" && (
                          <div className="relative">
                            <a
                              onClick={PaymentModal}
                              className="absolute px-2 w-fit h-full  sm:px-4 py-1 rounded-full z-10  bg-gray-50 dark:bg-gray-600 text-white flex flex-col items-center justify-center opacity-0  hover:opacity-100 cursor-pointer bg-opacity-90 duration-300"
                            >
                              <p>Klik Untuk Bayar</p>
                            </a>

                            <div className="text-red-300  bg-red-500/30 rounded-full px-2 w-fit text-center sm:px-4 py-1 ">
                              Belum Dibayar
                            </div>
                          </div>
                        )}
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
        <div className="relative overflow-x-auto shadow-xl mx-3 px-9 mt-5  rounded-lg md:absolute backdrop-blur-sm bg-gray-100/50">
          <div className="flex justify-center my-5 text-base md:text-2xl text-bold">
            Belum Ada Riwayat Pembayaran
          </div>
        </div>
      )}
    </div>
  );
};

export default TablePayment;
