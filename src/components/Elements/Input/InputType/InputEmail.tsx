import React, { useState } from "react";

export default function InputEmail({
  type,
  name,
  id,
  placeholder,
  classname,
}: {
  classname: string;
  type: string;
  name: string;
  id: string;
  placeholder: string;
}) {
  const [data, setData] = useState("");

  return (
    <input
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      onChange={(e) => setData(e.target.value)}
      className={classname}
    />
  );
}
