import React from "react";

const Label = ({
  htmlFor,
  children,
  className,
}: {
  className?: string;
  htmlFor: string;
  children: React.ReactNode;
}) => {
  const margin = children != null ? "my-3" : "";
  return (
    <label htmlFor={htmlFor} className={`${className}`}>
      {children}
    </label>
  );
};
export default Label;
