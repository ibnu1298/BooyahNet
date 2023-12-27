"use client";
import FormRegister from "@/components/Fragments/Form/FormRegister";
import AuthLayouts from "@/components/Layouts/AuthLayouts";
import React, { useState } from "react";

export default function RegisterPage() {
  const [show, setShow] = useState("-left-full");
  const [message, setMessage] = useState("");

  const showNotif = (show: string, messageNotif: string) => {
    // 👇️ take the parameter passed from the Child component
    setShow("-left-full");
    setTimeout(function () {
      setShow(show);
    }, 300);

    setMessage(messageNotif);
  };
  const hideNotif = (hide: string) => {
    // 👇️ take the parameter passed from the Child component
    setShow(hide);
  };

  return (
    <AuthLayouts
      title="Registrasi"
      description="Silakan isi formulir data diri dengan Jelas"
      type="register"
      showNotif={show}
      messageNotif={message}
      hideNotif={hideNotif}
    >
      <FormRegister showNotifFunc={showNotif} show={show} />
      <title>BooyahNet - Register</title>
    </AuthLayouts>
  );
}
