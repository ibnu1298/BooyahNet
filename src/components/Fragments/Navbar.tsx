"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DropdownUser from "./Dropdown/DropdownUser";
import DropdownNext from "./Dropdown/DropdownNext";

export default function Navbar() {
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

  const hideNavFunction = () => {
    setHideNav(true);
  };

  return (
    <nav
      className="fixed z-10 mt-0 bg-gray-900 text-white w-screen "
      hidden={hideNav}
    >
      <div className="px-5 md:px-12 py-3 md:py-4 flex justify-between w-full items-center">
        <a
          className="text-lg md:text-3xl font-bold font-heading hover:underline"
          href="/"
        >
          Booyah.Net
        </a>
        {/* <!-- Nav Links --> */}
        {/* <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-4 ">
          <Link
            className={`px-3 pb-0.4  ${
              pathName === "/"
                ? "rounded-md bg-yellow-500"
                : "text-gray-400 hover:text-gray-200"
            } `}
            href="/"
          >
            <li>Home</li>
          </Link>
          <Link
            className={`px-3 pb-0.4 ${
              pathName === "/payment"
                ? "rounded-md bg-yellow-500"
                : "text-gray-400 hover:text-gray-200"
            } `}
            href="/payment"
          >
            <li>Payment</li>
          </Link>
          <Link
            className={`px-3 pb-0.4 ${
              pathName === "/products"
                ? "rounded-md bg-yellow-500"
                : "text-gray-400 hover:text-gray-200"
            } `}
            href="/products"
          >
            <li>Products</li>
          </Link>
          <Link
            className={`px-3 pb-0.4 ${
              pathName === "/package"
                ? "rounded-md bg-yellow-500"
                : "text-gray-400 hover:text-gray-200"
            } `}
            href="/package"
          >
            <li>Package</li>
          </Link>
        </ul> */}
        {/* <!-- Header Icons --> */}
        <div className=" flex xl:flex items-center space-x-1">
          <DropdownNext />
          {/* <!-- Sign In / Register      --> */}

          {/* <a
            className="flex items-center hover:text-gray-200 mx-2 hover:outline outline-offset-2 outline-4 rounded-full outline-slate-600"
            onClick={showDropdown}
          >
            <Image
              className="rounded-full cursor-pointer w-7 md:w-8 "
              width={32}
              height={32}
              src="/images/people/cat.jpg"
              alt=""
            />
          </a>
          <div className="fixed top-[10px] right-16 md:right-24 z-50">
            <DropdownUser hideNavFunction={hideNavFunction} show={dropdown} />
          </div> */}
        </div>
      </div>
      {/* <!-- Responsive navbar --> */}
    </nav>
  );
}
