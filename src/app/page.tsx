"use client";
import Navbar from "@/components/Fragments/Navbar";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export default function Home() {
  return (
    <>
      <Navbar />
      <div>Anjay</div>
      <div></div>
    </>
  );
}
