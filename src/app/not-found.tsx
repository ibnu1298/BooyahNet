"use client";
import Button from "@/components/Elements/Button/page";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <title>404</title>

      <body>
        <div
          id="notfound"
          className="flex justify-center items-center min-h-screen bg-white dark:bg-gray-900 "
        >
          <div className="text-center">
            <div className="notfound-404">
              <div className="mb-4 text-bold text-gray-300 text-9xl">Oops!</div>
            </div>
            <br />
            <div className="text-gray-400 text-center">
              <div className="text-4xl">404 - Halaman Tidak Ditemukan</div>
              <div className="my-3 w-3/4 m-auto">
                Halaman yang Anda cari mungkin telah dihapus karena namanya
                diubah atau untuk sementara tidak tersedia.
              </div>
              <button className="mt-2 px-14 py-4 text-white bg-teal-800 rounded-md focus:bg-teal-950 focus:outline-none hover:bg-teal-600 transition duration-500 delay-100">
                <Link href="/">Go To Homepage</Link>
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
