import Link from "next/link";
import React from "react";
import AskHaveAccount from "../Fragments/AskHaveAccount";

export default function AuthLayouts({
  title,
  description,
  type,
  children,
  askHaveAccount,
}: {
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
    <div className="flex items-center min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto">
        <div className="max-w-md mx-auto my-10">
          <div className="text-center">
            <div className="my-3  font-semibold text-gray-700 dark:text-gray-200">
              {title}
            </div>
            <p className="text-gray-500 dark:text-gray-400">{description}</p>
          </div>
          {children}
          {askHaveAccount}
        </div>
      </div>
    </div>
  );
}
