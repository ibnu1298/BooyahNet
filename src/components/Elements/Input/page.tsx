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
  defaultValue,
  styleLabel,
  isDisabled,
}: {
  onclick?: any;
  className?: string;
  label?: React.ReactNode;
  additional?: React.ReactNode;
  type: string;
  name: string;
  placeholder?: string;
  defaultValue?: any;
  styleLabel?: string;
  isDisabled?: boolean;
}) {
  const margin = label != null ? "my-1 flex justify-between" : "";
  const hidden = label != null ? false : true;

  return (
    <div>
      <Label htmlFor={name}>
        <div className={`${margin} ${styleLabel}`} hidden={hidden}>
          <span>{label}</span>
          <span>{additional}</span>
        </div>
      </Label>
      <Input
        isDisabled={isDisabled}
        onclick={onclick}
        classname={className}
        type={type}
        placeholder={placeholder}
        name={name}
        id={name}
        defaultValue={defaultValue}
      />
    </div>
  );
}
