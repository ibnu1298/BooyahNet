import React from "react";

const Label = ({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: React.ReactNode;
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
    >
      {children}
    </label>
  );
};
export default Label;
