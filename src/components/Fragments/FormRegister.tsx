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
        <div className="flex">
          <InputForm
            label="Nama Depan"
            type="name"
            name="name"
            placeholder="Tuliskan Nama Depan Anda"
          />
          <InputForm
            label="Nama Belakang"
            type="name"
            name="name"
            placeholder="Tuliskan Nama Belakang Anda"
          />
        </div>
        <InputForm
          label="Email"
          type="email"
          name="email"
          placeholder="contoh@mail.com"
        />
        <InputForm
          label="Kata Sandi"
          type="password"
          name="password"
          placeholder="*********"
        />
        <div className="mb-5"></div>
        <Button onClick={handleRegister}>Daftar</Button>
      </form>
    </div>
  );
}
