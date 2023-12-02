import { signOut } from "next-auth/react";
import React from "react";

export default function DropdownUser({ show }: { show: string }) {
  return (
    <div
      id="dropdown"
      className={`z-10 ${show} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
    >
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
            Earnings
          </a>
        </li>
        <li>
          <a className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
            <button onClick={() => signOut()}>Sign out</button>
          </a>
        </li>
      </ul>
    </div>
  );
}
