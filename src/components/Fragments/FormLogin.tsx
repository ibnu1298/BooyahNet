"use client";
import React from "react";
import InputForm from "../Elements/Input/page";
import Button from "../Elements/Button/page";

export default function FormLogin() {
  const handleLogin = (event: any) => {
    event.preventDefault();
    localStorage.setItem("Email", event.target.email.value);
    localStorage.setItem("Password", event.target.password.value);
    window.location.href = "/";
  };
  return (
    <div className="m-9">
      <form onSubmit={handleLogin}>
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
        <Button type="submit">Sign In</Button>
      </form>
    </div>
  );
}
