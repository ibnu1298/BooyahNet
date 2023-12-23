import React from "react";
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
              <div className="text-xs text-slate-400 -mt-1">
                {session?.user.email == ""
                  ? session?.user.userName
                  : session?.user.email}
              </div>
            </div>
            <div className="ml-2 hover:text-gray-200 hover:outline outline-offset-2 outline-4 rounded-full outline-slate-600">
              <Image
                className="rounded-full w-8 h-8 md:w-10 md:h-10 "
                src={
                  session?.user.urlImage != ""
                    ? session?.user.urlImage
                    : "/images/people/cat.jpg"
                }
                alt={session?.user.name}
                width={500}
                height={500}
              />
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
