import React from "react";

const ErrorInput = ({
  visible,
  children,
}: {
  visible: string;
  children: React.ReactNode;
}) => {
  return (
    <p className={`text-red-500 text-xs mt-1 italic ${visible}`}>{children}</p>
  );
};

export default ErrorInput;
