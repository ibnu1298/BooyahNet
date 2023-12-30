"use client";
import React, { useState } from "react";
import { TbEye, TbEyeClosed } from "react-icons/tb";
import InputPassword from "./InputType/InputPassword";
import InputData from "./InputType/InputEmail";

const Input = ({
  onclick = () => {},
  type,
  placeholder,
  name,
  id,
  eyeIcon,
  input,
  classname = "",
  defaultValue,
  isDisabled,
}: {
  onclick?: any;
  classname?: string;
  type: string;
  placeholder?: string;
  name: string;
  id: string;
  eyeIcon?: React.ReactNode;
  input?: React.ReactNode;
  defaultValue?: any;
  isDisabled?: boolean;
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
  if (type == "password") {
    input = (
      <InputPassword
        isDisabled={isDisabled}
        onclick={onclick}
        classname={classname}
        type={tipe}
        name={name}
        id={id}
        placeholder={placeholder}
        defaultValue={defaultValue}
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
  if (type != "password") {
    input = (
      <InputData
        onclick={onclick}
        classname={classname}
        type={tipe}
        name={name}
        id={id}
        placeholder={placeholder}
        defaultValue={defaultValue}
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
