import React from "react";
import Label from "./Label";
import Input from "./Input";

export default function InputForm({
  label,
  type,
  name,
  placeholder,
  additional,
}: {
  label: React.ReactNode;
  additional?: React.ReactNode;
  type: string;
  name: string;
  placeholder: string;
}) {
  return (
    <div className="mb-7">
      <div className="flex justify-between">
        <Label htmlFor={name}>{label}</Label>
        {additional}
      </div>
      <Input type={type} placeholder={placeholder} name={name} id={name} />
    </div>
  );
}
