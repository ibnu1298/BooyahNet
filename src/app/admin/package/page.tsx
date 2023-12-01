"use client";
import Button from "@/components/Elements/Button/page";
import React, { useState } from "react";

export default function AdminPackagePage() {
  const [status, setStatus] = useState("");
  const revalidate = async () => {
    const res = await fetch(
      "/api/revalidate?tag=paket&secret=ibnuaqil1298Password",
      {
        method: "POST",
      }
    );
    const response = await res.json();
    if (!res.ok) {
      setStatus("Revalidate Failed");
    } else {
      if (response.isSucceeded) {
        setStatus(response.message);
      } else {
        setStatus(response.message);
      }
    }
  };
  return (
    <>
      <Button onClick={() => revalidate()}>Revalidate</Button>
      <div>{status}</div>
    </>
  );
}
