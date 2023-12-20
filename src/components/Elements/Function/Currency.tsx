import React from "react";

const Currency = ({
  classname,
  value,
  mataUang = "Rp",
}: {
  classname?: string;
  value: number;
  mataUang?: string;
}) => {
  const result = (data: number) => {
    return data.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".");
  };
  return (
    <span className={`${classname}`}>
      {mataUang} {result(value)}
    </span>
  );
};

export default Currency;
