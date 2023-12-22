import React from "react";

const Label = ({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: React.ReactNode;
}) => {
  const margin = children != null ? "my-3" : "";
  return (
    <label
      htmlFor={htmlFor}
      className={` text-sm text-gray-600 dark:text-gray-400`}
    >
      {children}
    </label>
  );
};
export default Label;
