import { Select, SelectItem } from "@nextui-org/react";
import React from "react";

interface dataProps {
  value: string;
  label: string;
}
const gender = [
  { value: "0", label: "Laki-laki" },
  { value: "1", label: "Perempuan" },
];

export default function SelectOption({
  onclick = () => {},
  className,
  name,
  data = gender,
  label,
  styleLabel,
  placeholder,
  defaultValue,
}: {
  onclick?: any;
  className?: string;
  name: string;
  label?: React.ReactNode;
  data?: dataProps[];
  styleLabel?: string;
  placeholder?: string;
  defaultValue?: string;
}) {
  const margin = label != null ? "my-1 flex justify-between" : "";
  const hidden = label != null ? false : true;
  return (
    <>
      <label className={`${margin} ${styleLabel}`} hidden={hidden}>
        {label}
      </label>
      <Select
        defaultSelectedKeys={defaultValue}
        onClick={onclick}
        items={data}
        name={name}
        aria-label="Select Option"
        placeholder={placeholder}
        className="w-full"
        variant="flat"
        scrollShadowProps={{
          isEnabled: true,
        }}
        classNames={{
          label: "group-data-[filled=true]:-translate-y-2",
          trigger: `w-full h-fit py-2 px-3 border  border-gray-300 rounded-md focus:outline-none dark:bg-gray-700 dark:text-white ${className}`,
          listboxWrapper: "max-h-[800px] bg-gray-700  rounded-lg ",
        }}
        listboxProps={{
          itemClasses: {
            base: [
              "rounded-lg",
              "text-white",
              "transition-opacity",
              "data-[hover=true]:text-foreground",
              "data-[hover=true]:bg-teal-100",
              "dark:data-[hover=true]:bg-teal-600",
              "data-[selectable=true]:focus:bg-teal-500",
              "data-[pressed=true]:opacity-70",
              "data-[focus-visible=true]:ring-teal-500",
            ],
          },
        }}
        popoverProps={{
          classNames: {
            base: "before:bg-default-300",
            content: "p-0 border-small border-divider bg-background",
          },
        }}
      >
        {(data) => (
          <SelectItem key={data.value} textValue={data.label}>
            <div className="flex gap-2 items-center">
              <div className="flex flex-col">
                <span className="text-small">{data.label}</span>
              </div>
            </div>
          </SelectItem>
        )}
      </Select>
    </>
  );
}
