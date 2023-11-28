import Link from "next/link";
import React from "react";

export default function AskHaveAccount({
  type,
  direct,
}: {
  type: string;
  direct?: React.ReactNode;
}) {
  if (type == "login") {
    direct = (
      <Link
        href="/register"
        className="font-bold text-white underline"
        style={{ cursor: "pointer" }}
      >
        Daftar
      </Link>
    );
  } else {
    direct = (
      <Link
        href="/login"
        className="font-bold text-white underline"
        style={{ cursor: "pointer" }}
      >
        Masuk
      </Link>
    );
  }
  return (
    <p
      className="text-sm text-center text-gray-400"
      style={{ marginTop: "-20px" }}
    >
      {type === "login" ? "Belum Punya Akun? " : "Sudah Punya Akun? "}
      {direct}
    </p>
  );
}
