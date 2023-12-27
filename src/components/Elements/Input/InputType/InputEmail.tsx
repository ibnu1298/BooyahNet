import React, { useState } from "react";

export default function InputData({
  type,
  name,
  id,
  placeholder,
  classname,
  onclick,
}: {
  classname: string;
  type: string;
  name: string;
  id: string;
  placeholder: string;
  onclick?: any;
}) {
  const [data, setData] = useState("");

  return (
    <input
      onClick={() => onclick()}
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      onChange={(e) => setData(e.target.value)}
      className={classname}
    />
  );
}
