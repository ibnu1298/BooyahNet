"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DropdownUser from "./Dropdown/DropdownUser";

export default function Footer() {
  const pathName = usePathname();
  const [dropdown, setDropdown] = useState("hidden");
  const showDropdown = () => {
    if (dropdown == "hidden") {
      setDropdown("");
    } else {
      setDropdown("hidden");
    }
  };

  return (
    <nav className="fixed bottom-0 bg-gray-900 text-white w-screen ">
      <div className="px-5 xl:px-12 py-3 md:py-4 flex w-full h-14 items-center md:hidden"></div>
    </nav>
  );
}
