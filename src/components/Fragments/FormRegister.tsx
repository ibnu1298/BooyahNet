"use client";
import React from "react";
import InputForm from "../Elements/Input/page";
import Button from "../Elements/Button/page";

export default function FormRegister() {
  const handleRegister = () => {
    console.log("Register di Klik");
  };
  return (
    <div className="m-9">
      <form action="">
        <div className="flex space-x-4 " style={{ marginBottom: "-20px" }}>
          <InputForm
            label=""
            type="name"
            name="firstname"
            placeholder="Nama Depan"
          />
          <InputForm
            label=""
            type="name"
            name="lastname"
            placeholder="Nama Belakang"
          />
        </div>
        <InputForm label="" type="email" name="email" placeholder="Email" />
        <InputForm
          label=""
          type="password"
          name="password"
          placeholder="Kata Sandi"
        />
        <div className="mb-5"></div>
        <Button onClick={handleRegister}>Daftar</Button>
      </form>
    </div>
  );
}
