"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface DataProps {
  name: string;
  email: string;
  token: string;
}
export default function Navbar() {
  const pathName = usePathname();
  return (
    <nav className="flex justify-between bg-gray-900 text-white w-screen">
      <div className="px-5 xl:px-12 py-6 flex w-full items-center">
        <a className="text-3xl font-bold font-heading" href="/">
          {/* <!-- <img className="h-9" src="logo.png" alt="logo"> --> */}
          Booyah.Net
        </a>
        {/* <!-- Nav Links --> */}
        <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-4">
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
        </ul>
        {/* <!-- Header Icons --> */}
        <div className="hidden xl:flex items-center space-x-1 items-center">
          {/* <!-- Sign In / Register      --> */}
          {/* <div className="mr-2">{name}</div> */}
          <a
            className="flex items-center hover:text-gray-200 hover:outline outline-offset-2 outline-4 rounded-full outline-slate-600"
            href="#"
          >
            <img
              className="h-8 w-8 rounded-full"
              src="/images/people/cat.jpg"
              alt=""
            />
          </a>
        </div>
      </div>
      {/* <!-- Responsive navbar --> */}
    </nav>
  );
}
