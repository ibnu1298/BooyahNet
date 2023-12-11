import React from "react";
import Image from "next/image";

const Background = () => {
  return (
    <Image
      alt="Desk"
      src="/images/bg/desk.jpg"
      width={2000}
      height={2000}
      priority
      style={{
        objectFit: "cover",
        zIndex: "-1",
        position: "fixed",
        width: "100vw",
        height: "100vh",
      }}
    />
  );
};
export const BackgroundLogin = () => {
  return (
    <Image
      alt="Desk"
      src="/images/bg/desk.jpg"
      width={2000}
      height={2000}
      style={{
        objectFit: "cover",
        zIndex: "-1",
        position: "fixed",
        width: "100vw",
        height: "100vh",
      }}
    />
  );
};

export default Background;
