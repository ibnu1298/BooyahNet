import React from "react";
import Label from "./Label";
import Input from "./Input";

export default function InputForm({
  className,
  onclick,
  label,
  type,
  name,
  placeholder,
  additional,
}: {
  onclick?: any;
  className?: string;
  label?: React.ReactNode;
  additional?: React.ReactNode;
  type: string;
  name: string;
  placeholder: string;
}) {
  const margin = label != null ? "my-1 flex justify-between" : "";
  const hidden = label != null ? false : true;
  return (
    <div>
      <Label htmlFor={name}>
        <div className={`${margin}`} hidden={hidden}>
          <span>{label}</span>
          <span>{additional}</span>
        </div>
      </Label>
      <Input
        onclick={onclick}
        classname={className}
        type={type}
        placeholder={placeholder}
        name={name}
        id={name}
      />
    </div>
  );
}
