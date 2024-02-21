"use client";
import SpinCircle from "@/components/Elements/Loading/spinCircle";
import { Snippet } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const ModalUser = ({
  user,
  show,
  showModal,
  userId,
  showModalNotif,
}: {
  user: any;
  show?: string;
  showModal: any;
  userId: any;
  showModalNotif: any;
}) => {
  const { data: session }: { data: any } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [cursor, setCursor] = useState("");
  console.log(user);
  const userACC = async (id: string, acc: boolean) => {
    const res = await fetch("/api/user/updateUserStatus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user.token as string}`,
      },
      body: JSON.stringify({
        id,
        acc,
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
  };
  console.log(user);

  return (
    <>
      <div
        id="popup-modal"
        className={`${show}  flex item-center justify-center flex-col items-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-10 w-full md:w-full md:inset-0 h-[calc(100%-1rem)] max-h-full backdrop-blur-sm`}
      >
        <div className="relative p-4 w-full md:w-full max-w-fit max-h-full">
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
            <div className="p-4 md:p-5  text-center flex  justify-center flex-col gap-2">
              <h3 className=" text-2xl font-bold text-white py-2">
                Customer Detail
              </h3>
              <div className="flex justify-center items-center gap-5 flex-col md:flex-row">
                <a
                  href={
                    user != null && user.urlImage != null
                      ? user.urlImage
                      : "/images/people/default.jpg"
                  }
                >
                  <Image
                    className="w-28 h-28  object-cover rounded-md"
                    width={500}
                    height={500}
                    src={
                      user != null && user.urlImage != null
                        ? user.urlImage
                        : "/images/people/default.jpg"
                    }
                    alt="profile user"
                  />
                </a>
                <table className="text-left text-[12px] font-medium">
                  <tbody>
                    <tr>
                      <td>Nama Lengkap</td>
                      <td>
                        : {user != null && user.firstName}{" "}
                        {user != null && user.lastName}
                      </td>
                    </tr>
                    <tr>
                      <td>UserName WIFI</td>
                      <td>: {user != null && user.userNameWifi}</td>
                    </tr>
                    <tr>
                      <td>Password WIFI</td>
                      <td>: {user != null && user.passwordWifi}</td>
                    </tr>
                    <tr>
                      <td>No HP</td>
                      <td>
                        :{" "}
                        {user != null &&
                        user.phoneNumber == "" &&
                        user.phoneNumber == null ? (
                          <span></span>
                        ) : (
                          <Snippet
                            className="py-0 gap-0 h-0 px-0 font-sans"
                            hideSymbol={true}
                          >{`${user != null && user.phoneNumber}`}</Snippet>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>Email</td>
                      <td>
                        :{" "}
                        {user != null && user.email == "" ? (
                          <span></span>
                        ) : (
                          <Snippet
                            className="py-0 gap-0 h-0 px-0"
                            hideSymbol={true}
                          >
                            {user != null && user.email}
                          </Snippet>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>Status</td>
                      <td>
                        :{" "}
                        {user != null && user.status == "Active" && (
                          <span className="bg-green-600 px-2 py-0.5 rounded-xl">
                            {user != null && user.status}
                          </span>
                        )}
                        {user != null && user.status == "Inactive" && (
                          <span className="bg-red-600/80 px-2 py-0.5 rounded-xl">
                            {user != null && user.status}
                          </span>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <hr />
              <div>
                {user != null && user.status == "Pending" && (
                  <span className="text-[12px] text-yellow-300">
                    Silahkan Accept jika data sudah benar
                  </span>
                )}
              </div>
              <div className="flex justify-center items-center mt-2 gap-2">
                {user != null && user.status != "Pending" && (
                  <button
                    onClick={showModal}
                    type="button"
                    className="w-fit text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-3 py-2 hover:text-gray-900 focus:z-10 dark:bg-gray-700/50 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  >
                    Kembali
                  </button>
                )}
                {user != null && user.status != "Inactive" && (
                  <button
                    type="submit"
                    className={`w-fit text-white bg-red-600 focus:bg-red-950 focus:outline-none hover:bg-red-800 transition duration-500 delay-100 focus:ring-4 font-medium rounded-lg text-sm flex justify-center items-center px-3 py-2 text-center ${cursor} `}
                    onClick={() => userACC(user.id, false)}
                  >
                    {isLoading ? (
                      <SpinCircle
                        size={6}
                        className="mx-3 flex justify-center"
                      />
                    ) : user != null && user.status == "Pending" ? (
                      <>Reject</>
                    ) : (
                      <>Disable</>
                    )}
                  </button>
                )}
                {user != null && user.status != "Active" && (
                  <button
                    type="submit"
                    className={`w-fit text-white bg-teal-600 focus:bg-teal-950 focus:outline-none hover:bg-teal-800 transition duration-500 delay-100 focus:ring-4 font-medium rounded-lg text-sm flex justify-center items-center px-3 py-2 text-center ${cursor} `}
                    onClick={() => userACC(user.id, true)}
                  >
                    {isLoading ? (
                      <SpinCircle
                        size={6}
                        className="mx-3 flex justify-center"
                      />
                    ) : user != null && user.status == "Pending" ? (
                      <>Accept</>
                    ) : (
                      <>Activate</>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalUser;
