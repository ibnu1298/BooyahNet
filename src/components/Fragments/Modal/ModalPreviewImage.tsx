import React from "react";
import Image from "next/image";

const ModalPreviewImage = ({
  src,
  show,
  showModal,
  payment,
}: {
  showModal: any;
  payment: any;
  show: string;
  src: string;
}) => {
  console.log(src);
  console.log(payment);

  return (
    <div
      id="popup-modal"
      className={`${show} bg-gray-800/70 p-4 gap-5 flex item-center justify-center flex-col items-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-10 w-full md:w-full md:inset-0 h-[calc(100%-1rem)] max-h-full backdrop-blur-sm`}
    >
      <div className="bg-gray-900/20 p-5 rounded-lg backdrop-blur-md">
        <table className="text-left text-[15px] font-medium">
          <tbody>
            <tr>
              <td>Payment Date</td>
              <td>: {payment != null && payment.paymentDateDesc}</td>
            </tr>
            <tr>
              <td>Billing Date</td>
              <td>: {payment != null && payment.billingDateDesc}</td>
            </tr>
            <tr>
              <td>Customer</td>
              <td>
                :{" "}
                {payment != null && payment.user.asName == null
                  ? `${payment.user.firstName} ${payment.user.lastName}`
                  : payment?.user.asName}
              </td>
            </tr>
          </tbody>
        </table>
        <div>
          <a href={src}>
            <Image
              alt="Preview Image"
              width={500}
              height={500}
              src={src}
              className="rounded-xl h-100 w-fit"
            />
          </a>
        </div>
      </div>
      <div>
        <button
          type="button"
          onClick={showModal}
          className=" text-gray-100 border-2 rounded-full bg-transparent hover:bg-gray-200 hover:text-gray-400 text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-400/50 dark:hover:text-white"
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
      </div>
    </div>
  );
};

export default ModalPreviewImage;
