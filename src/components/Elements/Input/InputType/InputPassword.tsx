import React, { useState } from "react";

export default function InputPassword({
  type,
  name,
  id,
  classname,
  placeholder,
}: {
  classname: string;
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
      className={classname}
    />
  );
}
