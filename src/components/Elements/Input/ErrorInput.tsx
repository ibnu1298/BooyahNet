import React from "react";

const ErrorInput = ({
  hidden,
  visible,
  children,
}: {
  hidden?: boolean;
  visible?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      hidden={hidden}
      className={`text-red-500 text-xs mt-1 italic ${visible}`}
    >
      {children}
    </p>
  );
};

export default ErrorInput;
