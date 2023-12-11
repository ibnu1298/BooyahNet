import Link from "next/link";
import React from "react";

const NavigasiTabel = ({
  totalData,
  take,
  currentPage,
  totalPages,
}: {
  totalData: number;
  take: number;
  currentPage: number;
  totalPages: number;
}) => {
  return (
    <>
      <nav
        className="flex justify-center items-center flex-column flex-wrap md:flex-row md:justify-between p-5 "
        aria-label="Table navigation"
      >
        <div className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 flex justify-center w-full md:w-auto">
          Showing
          <span className="font-semibold mx-2 text-gray-900 dark:text-gray-500">
            {currentPage !== 1 ? take * (currentPage - 1) + 1 : 1} -
            {totalData < take * currentPage ? totalData : take * currentPage}
          </span>
          of
          <span className="font-semibold mx-2 text-gray-900 dark:text-gray-500">
            {totalData}
          </span>
        </div>
        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
          {currentPage == 1 && (
            <>
              <li>
                <Link
                  href="#"
                  aria-current="page"
                  className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-s-lg"
                >
                  {currentPage}
                </Link>
              </li>
              <li>
                <Link
                  href={`payment?page=${(currentPage + 1).toString()}`}
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  {currentPage + 1}
                </Link>
              </li>
              <li>
                <Link
                  href={`payment?page=${(currentPage + 2).toString()}`}
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  {currentPage + 2}
                </Link>
              </li>
              <li>
                <Link
                  href={`payment?page=${(currentPage + 1).toString()}`}
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Next
                </Link>
              </li>
            </>
          )}
          {currentPage == currentPage + 1 && (
            <>
              <li>
                <Link
                  href={`payment?page=${(currentPage - 1).toString()}`}
                  className="flex items-center justify-center cursor-pointer px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Previous
                </Link>
              </li>
              <li>
                <Link
                  href={`payment?page=${(currentPage - 1).toString()}`}
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  {currentPage - 1}
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                >
                  {currentPage}
                </Link>
              </li>
              <li>
                <Link
                  href={`payment?page=${(currentPage + 1).toString()}`}
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  {currentPage + 1}
                </Link>
              </li>
              <li>
                <Link
                  href={`payment?page=${(currentPage + 2).toString()}`}
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  {currentPage + 2}
                </Link>
              </li>
              <li>
                <Link
                  href={`payment?page=${(currentPage + 1).toString()}`}
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Next
                </Link>
              </li>
            </>
          )}
          {currentPage > 2 && currentPage < totalPages - 1 && (
            <>
              <li>
                <Link
                  href={`payment?page=${(currentPage - 1).toString()}`}
                  className="flex items-center justify-center cursor-pointer px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Previous
                </Link>
              </li>
              <li>
                <Link
                  href={`payment?page=${(currentPage - 2).toString()}`}
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  {currentPage - 2}
                </Link>
              </li>
              <li>
                <Link
                  href={`payment?page=${(currentPage - 1).toString()}`}
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  {currentPage - 1}
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                >
                  {currentPage}
                </Link>
              </li>
              <li>
                <Link
                  href={`payment?page=${(currentPage + 1).toString()}`}
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  {currentPage + 1}
                </Link>
              </li>
              <li>
                <Link
                  href={`payment?page=${(currentPage + 2).toString()}`}
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  {currentPage + 2}
                </Link>
              </li>
              <li>
                <Link
                  href={`payment?page=${(currentPage + 1).toString()}`}
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Next
                </Link>
              </li>
            </>
          )}
          {currentPage == totalPages - 1 && (
            <>
              <li>
                <Link
                  href={`payment?page=${(currentPage - 1).toString()}`}
                  aria-current="page"
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white rounded-s-lg"
                >
                  Previous
                </Link>
              </li>
              {currentPage - currentPage == 0 ? (
                <></>
              ) : (
                <li>
                  <Link
                    href={`payment?page=${(currentPage - 2).toString()}`}
                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    {currentPage - 2}
                  </Link>
                </li>
              )}
              <li>
                <Link
                  href={`payment?page=${(currentPage - 1).toString()}`}
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  {currentPage - 1}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                >
                  {currentPage}
                </Link>
              </li>
              <li>
                <Link
                  href={`payment?page=${(currentPage + 1).toString()}`}
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  {currentPage + 1}
                </Link>
              </li>
              <li>
                <Link
                  href={`payment?page=${(currentPage + 1).toString()}`}
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Next
                </Link>
              </li>
            </>
          )}
          {currentPage == totalPages && (
            <>
              <li>
                <Link
                  href={`payment?page=${(currentPage - 1).toString()}`}
                  aria-current="page"
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white rounded-s-lg"
                >
                  Previous
                </Link>
              </li>
              <li>
                <Link
                  href={`payment?page=${(currentPage - 2).toString()}`}
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  {currentPage - 2}
                </Link>
              </li>
              <li>
                <Link
                  href={`payment?page=${(currentPage - 1).toString()}`}
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  {currentPage - 1}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="flex items-center justify-center rounded-e-lg px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                >
                  {currentPage}
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
};

export default NavigasiTabel;
