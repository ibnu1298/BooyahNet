import { Select, SelectItem } from "@nextui-org/react";

interface dataProps {
  value: string;
  label: string;
}
const gender = [
  { value: "0", label: "Laki-laki" },
  { value: "1", label: "Perempuan" },
];

export default function SelectOption({
  name,
  data = gender,
  label,
}: {
  name: string;
  label?: string;
  data?: dataProps[];
}) {
  return (
    <Select
      items={data}
      name={name}
      aria-label={label}
      placeholder={label}
      className="w-full"
      variant="flat"
      scrollShadowProps={{
        isEnabled: true,
      }}
      classNames={{
        label: "group-data-[filled=true]:-translate-y-2 ",
        trigger:
          "w-full h-fit py-2 px-3 border  border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500",
        listboxWrapper: "max-h-[800px] bg-gray-500 rounded-lg ",
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
  );
}
