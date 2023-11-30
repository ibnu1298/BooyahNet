import React, { useState } from "react";

export default function InputPassword({
  type,
  name,
  id,
  placeholder,
}: {
  type: string;
  name: string;
  id: string;
  placeholder: string;
}) {
  const [password, setPassword] = useState("");
  return (
    <input
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      onChange={(e) => setPassword(e.target.value)}
      className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
    />
  );
}
