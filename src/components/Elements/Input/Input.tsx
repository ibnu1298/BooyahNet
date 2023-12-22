"use client";
import React, { useState } from "react";
import { TbEye, TbEyeClosed } from "react-icons/tb";
import InputEmail from "./InputType/InputEmail";
import InputPassword from "./InputType/InputPassword";

const Input = ({
  type,
  placeholder,
  name,
  id,
  eyeIcon,
  input,
  classname = "w-full text-sm px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500",
}: {
  classname?: string;
  type: string;
  placeholder: string;
  name: string;
  id: string;
  eyeIcon?: React.ReactNode;
  input?: React.ReactNode;
}) => {
  const hide = <TbEyeClosed className="absolute mr-14" size="28px" />;
  const show = <TbEye className="absolute mr-14" size="28px" />;

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
    input = (
      <InputPassword
        classname={classname}
        type={tipe}
        name={name}
        id={id}
        placeholder={placeholder}
      />
    );
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
  if (name != "password") {
    input = (
      <InputEmail
        classname={classname}
        type={tipe}
        name={name}
        id={id}
        placeholder={placeholder}
      />
    );
  }

  return (
    <>
      <div className="flex">
        {input}
        {eyeIcon}
      </div>
    </>
  );
};
export default Input;
