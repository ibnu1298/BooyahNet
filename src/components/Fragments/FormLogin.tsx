"use client";
import React, { useState } from "react";
import InputForm from "../Elements/Input/page";
import Button from "../Elements/Button/page";
import ModalLoginError from "./Modal/ModalLoginError";
import ModalForgotPass from "./Modal/ModalForgotPass";
import { NextResponse } from "next/server";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

async function LoginAuth(user: string, pass: string) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      usernameOrEmail: user,
      password: pass,
    }),
  });
  return res.json();
}
export default function FormLogin() {
  const [forgotPass, setForgotPass] = useState("hidden");
  const [errLogin, setErrLogin] = useState("hidden");
  const { push } = useRouter();
  const handleLogin = async (event: any) => {
    event.preventDefault();
    try {
      const response = await signIn("credentials", {
        redirect: false,
        email: event.currentTarget.text.value,
        password: event.currentTarget.password.value,
        callbackUrl: "/",
      });
      if (!response?.error) {
        setErrLogin("hidden");
        push("/");
      } else {
        setErrLogin("");
        console.log(response.error);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const errLoginModal = () => {
    if (errLogin == "") {
      setErrLogin("hidden");
    }
  };
  const forgotPassModal = () => {
    if (forgotPass == "hidden") {
      setForgotPass("");
    } else {
      setForgotPass("hidden");
    }
  };
  return (
    <div className="m-9">
      <ModalLoginError show={errLogin} showModal={errLoginModal} />
      <ModalForgotPass show={forgotPass} showModal={forgotPassModal} />
      <form onSubmit={(event) => handleLogin(event)}>
        <InputForm
          label="Email atau Username"
          type="text"
          name="text"
          placeholder="contoh@mail.com"
        />
        <InputForm
          label="Kata Sandi"
          type="password"
          name="password"
          placeholder="*********"
          additional={
            <a
              onClick={forgotPassModal}
              type="button"
              style={{ cursor: "pointer" }}
              className="text-sm text-gray-400 underline focus:outline-none focus:text-indigo-500 hover:text-indigo-500 dark:hover:text-indigo-300"
            >
              Lupa Kata Sandi?
            </a>
          }
        />

        <Button type="submit">Sign In</Button>
      </form>
    </div>
  );
}
