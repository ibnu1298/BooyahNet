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

export default function DropdownNext() {
  const { data: session }: { data: any } = useSession();

  return (
    <div className="flex items-center justify-center">
      {/* <div className="text-right">
        <div className="text-md text-bold">{session?.user.name}</div>
        <div className="text-white text-xs">
          {session?.user.email == ""
            ? session?.user.userName
            : session?.user.email}
        </div>
      </div> */}
      <div className="">
        <Dropdown
          placement="bottom-end"
          className="dark:bg-gray-700/70 backdrop-blur-md"
        >
          <DropdownTrigger>
            <div className="flex items-center justify-center cursor-pointer">
              <div className="text-right ">
                <div className="text-md text-bold -mb-1">
                  {session?.user.name}
                </div>
                <div className="text-xs text-slate-400">
                  {session?.user.email == ""
                    ? session?.user.userName
                    : session?.user.email}
                </div>
              </div>
              <div className="ml-3 hover:text-gray-200 hover:outline outline-offset-2 outline-4 rounded-full outline-slate-600">
                <Avatar
                  className="rounded-full  md:w-10 md:h-10 "
                  src="/images/people/cat.jpg"
                  alt=""
                  name="ssssaa"
                />
              </div>
            </div>
          </DropdownTrigger>
          <DropdownMenu aria-label="User Actions">
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback" color="secondary">
              Help & Feedback
            </DropdownItem>
            <DropdownItem key="logout" color="danger" onClick={() => signOut()}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
}
