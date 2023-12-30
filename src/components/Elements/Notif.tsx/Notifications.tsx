import React from "react";

const Notifications = ({
  show = "opacity-0",
  children,
  hideNotif = () => {},
  success = false,
}: {
  show?: string;
  children: string;
  hideNotif?: any;
  success?: boolean;
}) => {
  return (
    <>
      {success ? (
        <NotificationSuccess show={show} hideNotif={hideNotif}>
          {children}
        </NotificationSuccess>
      ) : (
        <NotificationError show={show} hideNotif={hideNotif}>
          {children}
        </NotificationError>
      )}
    </>
  );
};

export default Notifications;

export const NotificationSuccess = ({
  children,
  hideNotif = () => {},
  show = "opacity-0",
}: {
  children: string;
  hideNotif?: any;
  show?: string;
}) => {
  return (
    <div
      className={`${show} transition-all duration-1000 px-5 py-1 border-solid border-1 border-green-400 text-sm rounded-md  text-green-300 bg-green-500/40 flex items-center gap-3 w-fit`}
    >
      {children}
      <div>
        <button
          type="button"
          onClick={() => hideNotif("-left-full opacity-0")}
          className="ms-auto -mx-1.5 -my-1.5  text-green-500 rounded-lg  p-1 hover:bg-green-200 inline-flex items-center justify-center h-6 w-6  dark:text-green-400 dark:hover:bg-gray-200/20 duration-1000"
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
    </div>
  );
};
export const NotificationError = ({
  children,
  hideNotif = () => {},
  show = "opacity-0",
}: {
  children: string;
  hideNotif?: any;
  show?: string;
}) => {
  return (
    <div
      className={` ${show} transition-all duration-1000 px-5 py-1 border-solid border-1 border-red-400 text-sm rounded-md  text-red-300 bg-red-500/40 flex items-center gap-3 w-fit`}
    >
      {children}
      <div>
        <button
          type="button"
          onClick={() => hideNotif("-left-full opacity-0")}
          className={` ${show} ms-auto -mx-1.5 -my-1.5  text-red-500 rounded-lg  p-1 hover:bg-red-200 inline-flex items-center justify-center h-6 w-6  dark:text-red-400 dark:hover:bg-gray-200/20 duration-1000`}
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
    </div>
  );
};
