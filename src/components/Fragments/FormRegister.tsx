"use client";
import React, { useState } from "react";
import InputForm from "../Elements/Input/page";
import Button from "../Elements/Button/page";
import SelectOption from "../Elements/Select/SelectOption";

export default function FormRegister() {
  const [response, setResponse] = useState();
  const handleRegister = async (event: any) => {
    event.preventDefault();
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        firstname: event.currentTarget.firstname.value as string,
        lastname: event.currentTarget.lastname.value as string,
        username: event.currentTarget.username.value as string,
        email: event.currentTarget.email.value as string,
        gender: Number(event.currentTarget.gender.value),
        password: event.currentTarget.password.value as string,
      }),
    });
    const data = await res.json();
    console.log(data);
  };
  const genders = [
    { label: "Laki-laki", value: "0" },
    { label: "Perempuan", value: "1" },
  ];
  return (
    <div className="mx-9">
      <form onSubmit={(e) => handleRegister(e)} className="gap-4 space-y-4">
        <div className="flex gap-4">
          <InputForm type="text" name="firstname" placeholder="Nama Depan" />
          <InputForm type="text" name="lastname" placeholder="Nama Belakang" />
        </div>
        <InputForm type="text" name="username" placeholder="Username" />
        <InputForm type="email" name="email" placeholder="Email" />
        <SelectOption name="gender" label="Jenis Kelamin" data={genders} />
        <InputForm type="password" name="password" placeholder="Kata Sandi" />
        <Button className="my-4" type="submit">
          Daftar
        </Button>
      </form>
    </div>
  );
}
