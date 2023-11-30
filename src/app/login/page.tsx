import FormLogin from "@/components/Fragments/FormLogin";
import AuthLayouts from "@/components/Layouts/AuthLayouts";
import React from "react";

export default function LoginPage() {
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
