"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import DropdownNext from "./Dropdown/DropdownNext";

import { useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session }: { data: any } = useSession();
  const [dropdown, setDropdown] = useState("hidden");
  const [hideNav, setHideNav] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    if (pathName == "/register" || pathName == "/login") {
      setHideNav(true);
    } else {
      setHideNav(false);
    }
  }, [pathName]);

  const showDropdown = () => {
    if (dropdown == "hidden") {
      setDropdown("");
    } else {
      setDropdown("hidden");
    }
  };

  return (
    <>
      <nav className="mt-0 bg-gray-900 text-white w-screen " hidden={hideNav}>
        <div className="px-5 md:px-12 py-3 md:py-4 flex justify-between w-full items-center">
          <a
            className="text-xl sm:text-3xl font-bold font-heading hover:underline"
            href="/"
          >
            Booyah.Net
          </a>
          <div className=" flex xl:flex items-center space-x-1">
            <DropdownNext />
          </div>
        </div>
      </nav>
    </>
  );
}
