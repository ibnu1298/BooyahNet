import React from "react";

interface ButtonProps {
  href?: string;
  className?: string;
  useFrom?: string;
  onClick?: Function;
  children: React.ReactNode;
  type?: "submit" | "reset" | "button" | undefined;
}
const Button = ({
  href,
  className = "",
  useFrom,
  onClick = () => {},
  children,
  type = "button",
}: ButtonProps) => {
  if (useFrom == "navbar") {
    className = className;
  }
  return (
    <a href={href}>
      <button
        type={type}
        className={` ${className} `}
        onClick={() => onClick()}
      >
        {children}
      </button>
    </a>
  );
};
export default Button;
