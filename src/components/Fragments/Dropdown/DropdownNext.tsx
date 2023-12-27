import React, { useEffect, useRef } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
  Avatar,
} from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function DropdownNext() {
  const { data: session }: { data: any } = useSession();

  let image = "/images/people/default.jpg";
  if (session?.user.image != undefined) {
    image = session?.user.image as string;
  }
  const email = `${session?.user.email.split("@")[0]}@...`;
  const firstname =
    session?.user.firstName.charAt(0).toUpperCase() +
    session?.user.firstName.slice(1);
  const lastname =
    session?.user.lastName.charAt(0).toUpperCase() +
    session?.user.lastName.slice(1);
  const nameLength = session?.user.name.length;

  return (
    <div className="flex items-center justify-center">
      <Dropdown
        placement="bottom-end"
        className="dark:bg-gray-700/70 backdrop-blur-md"
      >
        <DropdownTrigger>
          <div className="flex items-center justify-center cursor-pointer">
            <div className="text-right">
              <div className="text-md text-bold ">
                {`${firstname} ${nameLength < 15 ? lastname : ""}`}
              </div>
              {session?.user.name == "" ? (
                <div className="text-md text-bold ">
                  {session?.user.email == "" ? session?.user.userName : email}
                </div>
              ) : (
                <div className="text-xs text-slate-400 -mt-1">
                  {session?.user.email == "" ? session?.user.userName : email}
                </div>
              )}
            </div>
            <div className="ml-2 hover:text-gray-200 hover:outline outline-offset-2 outline-4 rounded-full outline-slate-600">
              <Image
                className="rounded-full w-8 h-8 md:w-10 md:h-10 object-cover"
                src={image}
                width={500}
                height={500}
                alt={`${session?.user.name}`}
              />
            </div>
          </div>
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions">
          <DropdownItem href="/profile-settings">Settings</DropdownItem>
          <DropdownItem key="logout" color="danger" onClick={() => signOut()}>
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
