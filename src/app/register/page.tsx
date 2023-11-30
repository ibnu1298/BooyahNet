import FormLogin from "@/components/Fragments/FormLogin";
import FormRegister from "@/components/Fragments/FormRegister";
import AuthLayouts from "@/components/Layouts/AuthLayouts";
import React from "react";

export default function RegisterPage() {
  return (
    <AuthLayouts
      title="Registrasi"
      description="Silakan isi formulir data diri dengan Jelas"
      type="register"
    >
      <FormRegister />
      <title>BooyahNet - Register</title>
    </AuthLayouts>
  );
}
