"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
const TablePayment = () => {
  const { data: session }: { data: any } = useSession();
  const tokenSession = session?.user.token;
  const userIdSession = session?.user.id;
  const [token, setToken] = useState(tokenSession);
  const [userId, setUserId] = useState(userIdSession);
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const take = 12;
  const page = 1;

  const getUserPayment = async (userId: any, token: any, page: number) => {
    const url = "https://booyahnetapi.azurewebsites.net/api/Payment/Page";
    if (token != undefined) {
      const res = await fetch(`${url}?page=${page}&take=${take}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId,
        }),
      });
      const response = await res.json();
      if (!response.isSucceeded) {
        setIsLoading(false);
        return { response, payments: null };
      }
      setPayments(response.payments);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userIdSession !== undefined && tokenSession !== undefined) {
      setToken(tokenSession);
      setUserId(userIdSession);
    }
    getUserPayment(userId, token, page);
  }, [tokenSession, userIdSession, userId, token, page]);
  return (
    <div className="pt-9 md:pt-14 md:ml-9">
      {isLoading ? (
        <div className="relative overflow-x-auto shadow-xl mx-3 px-9 mt-5 rounded-lg md:absolute backdrop-blur-sm bg-gray-100/50">
          <div className="flex justify-center my-5 text-3xl text-bold">
            Loading...
          </div>
        </div>
      ) : payments.length > 0 ? (
        <>
          <div className="relative overflow-x-auto shadow-xl mx-3 mt-9 rounded-lg md:absolute backdrop-blur-sm bg-gray-700/70">
            <div className="flex justify-center my-5 text-3xl text-bold text-white">
              Riwayat Pembayaran
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3 hidden sm:flex">
                    Nama Paket
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Tanggal
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {payments.length > 0 &&
                  payments.map((payment: any) => (
                    <tr
                      className=" bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      key={payment.id}
                    >
                      <td className="px-6 py-4 hidden sm:flex">
                        {payment.package.packageName}
                      </td>
                      <td className="px-6 py-4">{payment.paymentDate}</td>
                      <td className="px-6 py-4 flex">
                        {payment.status == "Lunas" && (
                          <div className="text-white bg-emerald-500 rounded-full px-4 py-1">
                            {payment.status}
                          </div>
                        )}
                        {payment.status == "Pending" && (
                          <div className="text-white bg-yellow-500 rounded-full px-4 py-1">
                            {payment.status}
                          </div>
                        )}
                        {payment.status == "BelumDibayar" && (
                          <div className="text-white bg-red-500 rounded-full px-2 text-center sm:px-4 py-1 ">
                            Belum Dibayar
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="relative overflow-x-auto shadow-xl mx-3 px-9 mt-5  rounded-lg md:absolute backdrop-blur-sm bg-gray-100/50">
          <div className="flex justify-center my-5 text-3xl text-bold">
            Belum Ada Riwayat Pembayaran
          </div>
        </div>
      )}
    </div>
  );
};

export default TablePayment;
