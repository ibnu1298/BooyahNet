import React from "react";
import AskHaveAccount from "../Fragments/AskHaveAccount";
import ModalNotificationError from "../Fragments/Modal/ModalNotificationError";

export default function AuthLayouts({
  messageNotif,
  hideNotif = () => {},
  showNotif,
  title,
  description,
  type,
  children,
  askHaveAccount,
}: {
  messageNotif?: string;
  hideNotif?: any;
  showNotif?: string;
  type: string;
  title: React.ReactNode;
  description: React.ReactNode;
  children: React.ReactNode;
  askHaveAccount?: React.ReactNode;
}) {
  if (type == "login") {
    askHaveAccount = <AskHaveAccount type={type} />;
  } else {
    askHaveAccount = <AskHaveAccount type={type} />;
  }

  return (
    <>
      <ModalNotificationError
        show={showNotif}
        hideNotif={hideNotif}
        messageNotif={messageNotif}
      />
      <div
        onClick={() => hideNotif("-left-full", "")}
        className="flex items-center min-h-screen bg-gray-900/90 backdrop-blur-md"
      >
        <div className="container mx-auto">
          <div className="max-w-md mx-auto md:ml-0 md:w-[500px] my-10 rounded-3xl px-4 py-5">
            <div className="text-center">
              <div className="my-3 text-5xl font-semibold text-gray-100 dark:text-gray-100">
                {title}
              </div>
              <p className="text-gray-500 dark:text-gray-300">{description}</p>
            </div>
            <div className="mb-9 mt-5">{children}</div>
            {askHaveAccount}
          </div>
        </div>
      </div>
    </>
  );
}
