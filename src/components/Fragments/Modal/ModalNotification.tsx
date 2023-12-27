import React from "react";

const ModalNotification = ({
  messageNotif,
  hideNotif,
  show = "-left-full",
  count = 0,
}: {
  messageNotif?: string;
  hideNotif?: any;
  show?: string;
  count?: number;
}) => {
  return (
    <div
      id="Notification"
      className={`z-10 ${show} transition-all duration-15000 absolute w-96 flex items-center p-4 mt-28 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-900/50 backdrop-blur-md dark:border-red-800 rounded-tr-3xl`}
    >
      <div className="ml-9 text-sm font-medium">{messageNotif}</div>
      <button
        type="button"
        onClick={() => hideNotif("-left-full")}
        className="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-900 dark:text-red-400 dark:hover:bg-gray-700"
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

export default ModalNotification;
