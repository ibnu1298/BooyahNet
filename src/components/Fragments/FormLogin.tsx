import React from "react";
import InputForm from "../Elements/Input/page";
import Button from "../Elements/Button/page";

export default function FormLogin() {
  return (
    <div className="m-9">
      <form action="">
        <InputForm
          label="Email atau Username"
          type="email"
          name="email"
          placeholder="contoh@mail.com"
        />
        <InputForm
          label="Kata Sandi"
          type="password"
          name="password"
          placeholder="*********"
          additional={
            <a
              href="#!"
              className="text-sm text-gray-400 underline focus:outline-none focus:text-indigo-500 hover:text-indigo-500 dark:hover:text-indigo-300"
            >
              Lupa Kata Sandi?
            </a>
          }
        />
        <div className="mb-5"></div>
        <Button>Sign In</Button>
      </form>
    </div>
  );
}
