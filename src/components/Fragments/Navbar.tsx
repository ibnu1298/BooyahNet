"use client";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DropdownUser from "./Dropdown/DropdownUser";

interface DataProps {
  name: string;
  email: string;
  token: string;
}
export default function Navbar() {
  const pathName = usePathname();
  const router = useRouter();
  const { data: session, status }: { data: any; status: string } = useSession();
  console.log(status);
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [router, status]);
  const [show, setShow] = useState("hidden");
  const showDropdown = () => {
    if (show == "hidden") {
      setShow("");
    } else {
      setShow("hidden");
    }
  };

  return (
    <nav className="flex justify-between bg-gray-900 text-white w-screen ">
      <div className="px-5 xl:px-12 py-6 flex w-full items-center">
        <a className="text-3xl font-bold font-heading" href="/">
          Booyah.Net
        </a>
        {/* <!-- Nav Links --> */}
        <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-4 ">
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
        <div className="hidden xl:flex items-center space-x-1 items-center ">
          {/* <!-- Sign In / Register      --> */}
          <a onClick={showDropdown}>
            <div className="mr-1 cursor-pointer px-2">
              aaasssssss
              {/* {session?.user.name} */}
            </div>
          </a>
          <a
            className="flex items-center hover:text-gray-200 hover:outline outline-offset-2 outline-4 rounded-full outline-slate-600"
            onClick={showDropdown}
          >
            <Image
              className="rounded-full cursor-pointer"
              width={32}
              height={32}
              src="/images/people/cat.jpg"
              alt=""
            />
          </a>
          <div className="absolute top-16 right-12">
            <DropdownUser show={show} />
          </div>
        </div>
      </div>
      {/* <!-- Responsive navbar --> */}
    </nav>
  );
}
