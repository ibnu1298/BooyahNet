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
  console.log(session);
  let image = "";
  if (session?.user.image != undefined) {
    image = session?.user.image as string;
  }

  console.log(image);

  const name =
    session?.user.firstName.charAt(0).toUpperCase() +
    session?.user.firstName.slice(1) +
    " " +
    session?.user.lastName.charAt(0).toUpperCase() +
    session?.user.lastName.slice(1);

  return (
    <div className="flex items-center justify-center">
      <Dropdown
        placement="bottom-end"
        className="dark:bg-gray-700/70 backdrop-blur-md"
      >
        <DropdownTrigger>
          <div className="flex items-center justify-center cursor-pointer">
            <div className="text-right">
              <div className="text-md text-bold ">{name}</div>
              {name == "" ? (
                <div className="text-md text-bold ">
                  {session?.user.email == ""
                    ? session?.user.userName
                    : session?.user.email}
                </div>
              ) : (
                <div className="text-xs text-slate-400 -mt-1">
                  {session?.user.email == ""
                    ? session?.user.userName
                    : session?.user.email}
                </div>
              )}
            </div>
            <div className="ml-2 hover:text-gray-200 hover:outline outline-offset-2 outline-4 rounded-full outline-slate-600">
              {image != "" ? (
                <Image
                  className="rounded-full w-8 h-8 md:w-10 md:h-10 "
                  src={image}
                  width={500}
                  height={500}
                  alt={`${session?.user.name}`}
                />
              ) : (
                <Image
                  className="rounded-full w-8 h-8 md:w-10 md:h-10 "
                  src="/images/people/cat.jpg"
                  width={500}
                  height={500}
                  alt={`${session?.user.name as string}`}
                />
              )}
            </div>
          </div>
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions">
          <DropdownItem>My Settings</DropdownItem>
          <DropdownItem>Team Settings</DropdownItem>
          <DropdownItem>Analytics</DropdownItem>
          <DropdownItem>System</DropdownItem>
          <DropdownItem>Configurations</DropdownItem>
          <DropdownItem color="secondary">Help & Feedback</DropdownItem>
          <DropdownItem key="logout" color="danger" onClick={() => signOut()}>
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
