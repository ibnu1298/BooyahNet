import ErrorInput from "@/components/Elements/Input/ErrorInput";
import InputForm from "@/components/Elements/Input/page";
import SpinCircle from "@/components/Elements/Loading/spinCircle";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

export default function ModalVerifikasiEmail({
  show,
  timer,
  showModal,
  countdown,
  handleSendOTP,
  showModalSuccess,
}: {
  show?: string;
  showModal?: any;
  showModalSuccess?: any;
  handleSendOTP: any;
  timer: number;
  countdown: any;
}) {
  const { data: session, update }: { data: any; update: any } = useSession();
  const [isLoading, setIsloading] = useState(false);
  const [hideError, setHideError] = useState(true);
  const [disableButton, setDisableButton] = useState(false);

  const [errMessage, setErrMessage] = useState("");
  const className = `w-full text-sm px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none   dark:bg-gray-700 dark:text-white dark:placeholder-gray-400  dark:focus:ring-gray-900 dark:border-gray-600 dark:focus:border-gray-200`;
  function resetModal() {
    setHideError(true);
  }

  const handleVerifikasiEmail = async (event: any) => {
    event.preventDefault();
    setIsloading(true);
    setHideError(true);

    const otp = event.currentTarget.otp.value;

    if (otp !== "") {
      try {
        const res = await fetch("/api/user/verifikasiEmail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + session?.user.token,
          },
          body: JSON.stringify({
            email: session?.user.email,
            otp,
          }),
        });
        const data = await res.json();
        console.log(data);

        if (!data.isSucceeded) {
          setHideError(false);
          setErrMessage(data.message);
          setIsloading(false);
        } else {
          setHideError(true);
          setIsloading(false);
          showModalSuccess(data.message);
          showModal();
          await update({
            ...session,
            user: {
              ...session?.user,
              emailConfirmed: true,
            },
          });
        }
      } catch (err) {
        setIsloading(false);
        console.log(err);
      }
    } else {
      setHideError(false);
      setErrMessage("Silahkan Masukan OTP yang benar");
      setIsloading(false);
    }
  };
  useEffect(() => {
    if (timer > 0) {
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
  }, [timer]);

  return (
    <>
      <div
        id="popup-modal"
        className={`${show} flex item-center justify-center items-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50  w-full md:inset-0 h-[calc(100%-1rem)] max-h-full backdrop-blur-sm`}
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
              <form onSubmit={(event) => handleVerifikasiEmail(event)}>
                <h2 className="mb-2 font-bold text-[25px] text-white ">
                  Silakan isi code OTP
                </h2>
                <p className="text-xs mb-2">
                  Silakan buka inbox atau spam pada email
                </p>
                <div className="flex flex-col gap-3 w-full">
                  <InputForm
                    className={`${className} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                    type="number"
                    placeholder="Masukan code OTP dari Email"
                    name="otp"
                  />
                  <ErrorInput hidden={hideError}>{errMessage}</ErrorInput>
                </div>
                <div className="mt-4 flex flex-col gap-2 items-center">
                  <button
                    type="submit"
                    className="text-white bg-teal-800 focus:bg-teal-950 focus:outline-none hover:bg-teal-600 transition duration-500 delay-100 focus:ring-4 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
                  >
                    {isLoading ? (
                      <div className="flex justify-center gap-2">
                        <SpinCircle size={6} />
                        Loading...{" "}
                      </div>
                    ) : (
                      <>Submit</>
                    )}
                  </button>
                  <p className="text-xs">Tidak Menerima Code?</p>
                  <button
                    disabled={disableButton}
                    onClick={() => {
                      countdown(30);
                      handleSendOTP();
                    }}
                    type="button"
                    className={`${
                      disableButton
                        ? `text-white/40`
                        : `text-white dark:hover:text-white dark:hover:bg-gray-600 hover:text-gray-900 hover:bg-gray-100`
                    }   focus:ring-3 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5  focus:z-10 dark:bg-gray-700  dark:border-gray-500  dark:focus:ring-gray-300`}
                  >
                    Kirim Ulang OTP
                    {timer != 0 && <span>{` (${timer}s)`}</span>}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
