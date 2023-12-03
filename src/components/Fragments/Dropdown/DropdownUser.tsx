import { signOut, useSession } from "next-auth/react";
import React from "react";

export default function DropdownUser({ show }: { show: string }) {
  const { data: session }: { data: any } = useSession();
  return (
    <div
      id="dropdown"
      className={`z-90 ${show} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
    >
      <div className="px-4 py-3">
        <span className="block text-sm text-gray-900 dark:text-white">
          {session?.user.name}
        </span>
        <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
          {session?.user.email}
        </span>
      </div>
      <ul
        className="py-2 text-sm text-gray-700 dark:text-gray-200"
        aria-labelledby="dropdownDefaultButton"
      >
        <li>
          <a
            href="#"
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Profile
          </a>
        </li>
        <li>
          <a
            href="#"
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Payment
          </a>
        </li>
        <li>
          <a
            href="#"
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Role : {session?.user.role}
          </a>
        </li>
        <li>
          <a className="block px-4 py-2 bg-gradient-to-b from-gray-800 to-gray-700  hover:from-gray-900 hover:to-gray-900 hover:text-white">
            <button onClick={() => signOut()}>Sign out</button>
          </a>
        </li>
      </ul>
    </div>
  );
}
