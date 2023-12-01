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
  className = "text-white py-4 bg-teal-800 rounded-md focus:bg-teal-950 focus:outline-none hover:bg-teal-600 transition duration-500 delay-100",
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
        className={`w-full mt-2 px-3  ${className} `}
        onClick={() => onClick()}
      >
        {children}
      </button>
    </a>
  );
};
export default Button;
