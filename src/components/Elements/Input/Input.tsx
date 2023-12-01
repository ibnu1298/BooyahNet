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
}: {
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
      <InputEmail type={tipe} name={name} id={id} placeholder={placeholder} />
    );
  }

  return (
    <>
      <div className="mb-4 flex">
        {input}
        {eyeIcon}
      </div>
    </>
  );
};
export default Input;
