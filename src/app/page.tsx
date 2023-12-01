"use client";
import Navbar from "@/components/Fragments/Navbar";

export default function Home() {
  const name = localStorage.getItem("name");
  return (
    <>
      <Navbar />
      <div>{name}</div>
      <div></div>
    </>
  );
}
