import React, { useState } from "react";

export default function InputPassword({
  onclick,
  type,
  name,
  id,
  classname,
  placeholder,
  defaultValue,
  isDisabled,
}: {
  isDisabled?: boolean;
  onclick?: any;
  classname: string;
  type: string;
  name: string;
  id: string;
  placeholder?: string;
  defaultValue?: any;
}) {
  const [password, setPassword] = useState("");

  return (
    <input
      disabled={isDisabled}
      defaultValue={defaultValue}
      onClick={() => onclick()}
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      onChange={(e) => setPassword(e.target.value)}
      className={classname}
    />
  );
}
