"use client";
import React, { useState } from "react";
import { TbEye, TbEyeClosed } from "react-icons/tb";

const Input = ({
  type,
  placeholder,
  name,
  id,
  eyeIcon,
}: {
  type: string;
  placeholder: string;
  name: string;
  id: string;
  eyeIcon?: React.ReactNode;
}) => {
  const hide = <TbEyeClosed className="absolute mr-14" size="28px" />;
  const show = <TbEye className="absolute mr-14" size="28px" />;
  const [password, setPassword] = useState("");
  const [tipe, setTipe] = useState(type);
  const [icon, setIcon] = useState(show);

  const handleToggle = () => {
    if (tipe === "password") {
      setIcon(hide);
      setTipe("text");
    } else {
      setIcon(show);
      setTipe("password");
    }
  };
  if (name == "password") {
    eyeIcon = (
      <span
        className="flex justify-around items-center"
        onClick={handleToggle}
        style={{ color: "#fff", cursor: "pointer" }}
      >
        {icon}
      </span>
    );
  }
  return (
    <>
      <div className="mb-4 flex">
        <input
          type={tipe}
          name={name}
          id={id}
          placeholder={placeholder}
          className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
        />
        {eyeIcon}
      </div>
    </>
  );
};
export default Input;
