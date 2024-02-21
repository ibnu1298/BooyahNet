import React, { useEffect, useState } from "react";
import InputForm from "@/components/Elements/Input/page";
import Button from "@/components/Elements/Button/page";
import SpinCircle from "@/components/Elements/Loading/spinCircle";
import SelectOption from "@/components/Elements/Input/Select/SelectOption";
import { useSession } from "next-auth/react";

export default function ModalUpdateUser({
  user,
  show,
  showModal,
  showModalSuccess,
}: {
  user?: any;
  show?: string;
  showModal?: any;
  showModalSuccess?: any;
}) {
  const [isLoading, setIsloading] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [timer, setTimer] = useState(0);
  const [hideEmail, setHideEmail] = useState(false);
  const [saveEmail, setSaveEmail] = useState("");
  const [hideError, setHideError] = useState(true);
  const [errMessage, setErrMessage] = useState("");
  const [cursor, setCursor] = useState("");
  const className = `w-full text-sm px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none   dark:bg-gray-700 dark:text-white dark:placeholder-gray-400  dark:focus:ring-gray-900 dark:border-gray-600 dark:focus:border-gray-200`;
  function resetModal() {}
  const { data: session }: { data: any } = useSession();
  const handleUpdateUser = async (event: any) => {
    console.log("test");

    setIsloading(true);
    event.preventDefault();
    const asName = event.currentTarget.asName.value as string;
    if (asName == "") {
      setIsloading(false);
    }
    if (asName != "") {
      const res = await fetch("/api/user/updateUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.token as string}`,
        },
        body: JSON.stringify({
          id: user.id as string,
          asName,
          type: "admin",
        }),
      });
      const data = await res.json();
      console.log(data);

      setIsloading(false);
      if (data.isSucceeded) {
        window.location.reload();
      } else {
      }
    }
  };
  console.log(user);

  return (
    <>
      <div
        id="popup-modal"
        className={`${show} flex item-center justify-center items-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50  w-full md:inset-0 h-[calc(100%-1rem)] max-h-full backdrop-blur-sm bg-gray-900/70`}
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              onClick={() => {
                showModal();
                resetModal();
              }}
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
            <div className="p-4 md:px-12 text-center">
              <table className="text-left text-md font-medium">
                <tbody>
                  <tr>
                    <td>Nama Lengkap</td>
                    <td>
                      : {user != null && user.firstName}{" "}
                      {user != null && user.lastName}
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
              <form
                onSubmit={(event) => handleUpdateUser(event)}
                className="flex flex-col gap-2 my-6"
              >
                {user != undefined && (
                  <>
                    <InputForm
                      className={className}
                      styleLabel="text-white text-sm"
                      type="text"
                      name="asName"
                      label="Nama Customer"
                      placeholder={user.asName as string}
                    />

                    <Button
                      className={`w-full px-3 text-white py-4 bg-teal-800 rounded-md focus:bg-teal-950 focus:outline-none hover:bg-teal-600 transition duration-500 delay-100 ${cursor} mt-3`}
                      type="submit"
                    >
                      {isLoading ? (
                        <div className="flex justify-center ">
                          <SpinCircle size={6} />
                          Loading...{" "}
                        </div>
                      ) : (
                        <>Ganti Data</>
                      )}
                    </Button>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
