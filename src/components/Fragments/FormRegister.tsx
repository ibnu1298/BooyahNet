import React from "react";
import InputForm from "../Elements/Input/page";
import Button from "../Elements/Button/page";

export default function FormRegister() {
  return (
    <div className="m-9">
      <form action="">
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
        <Button>Daftar</Button>
      </form>
    </div>
  );
}
