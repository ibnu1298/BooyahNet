"use client";
import FormLogin from "@/components/Fragments/FormLogin";
import AuthLayouts from "@/components/Layouts/AuthLayouts";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function LoginPage() {
  const router = useRouter();
  const { status }: { status: string } = useSession();
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [router, status]);
  return (
    <AuthLayouts
      title="Sign In"
      description="Silakan masukan Email dan Kata Sandi"
      type="login"
    >
      <title>BooyahNet - Sign In</title>
      <FormLogin />
    </AuthLayouts>
  );
}
