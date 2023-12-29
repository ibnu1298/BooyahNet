import React from "react";

const ModalNotificationSuccess = ({
  messageNotif,
  hideNotif,
  show = "-left-full ",
  count = 0,
  position = "-top-20",
}: {
  messageNotif?: string;
  hideNotif?: any;
  show?: string;
  count?: number;
  position?: string;
}) => {
  return (
    <div
      id="Notification"
      className={`z-10 ${show} ${position} md:top-0 transition-all duration-1000 absolute w-80 md:w-96 flex items-center p-4 mt-28 border-t-4 border-teal-300  dark:text-teal-400 backdrop-blur-md dark:border-teal-500  rounded-tr-3xl rounded-br-lg`}
    >
      <div className="ml-9 text-teal-500 text-sm font-medium">
        {messageNotif}
      </div>
      <button
        type="button"
        onClick={() => hideNotif("-left-full")}
        className="ms-auto -mx-1.5 -my-1.5  text-teal-500 rounded-lg focus:ring-2 focus:ring-teal-400 p-1.5 hover:bg-teal-200 inline-flex items-center justify-center h-8 w-8  dark:text-teal-400 dark:hover:bg-gray-700 duration-1000"
        data-dismiss-target="#alert-border-3"
        aria-label="Close"
      >
        <span className="sr-only">Dismiss</span>
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
  );
};

export default ModalNotificationSuccess;
