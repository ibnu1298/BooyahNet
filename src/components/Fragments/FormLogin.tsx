"use client";
import React, { useState } from "react";
import InputForm from "../Elements/Input/page";
import Button from "../Elements/Button/page";
import ModalLoginError from "./Modal/ModalLoginError";
import ModalForgotPass from "./Modal/ModalForgotPass";
import { signIn } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

export default function FormLogin({ searchParams }: any) {
  const [forgotPass, setForgotPass] = useState("hidden");
  const [errLogin, setErrLogin] = useState("hidden");
  const [isLoading, setIsloading] = useState(false);
  const [emailField, setEmailField] = useState("invisible");
  const [passField, setPassField] = useState("invisible");
  const { push } = useRouter();
  const pathName = usePathname();
  const callbackUrl = searchParams?.callbackUrl || "/";
  const handleLogin = async (event: any) => {
    event.preventDefault();

    if (event.currentTarget.text.value == "") {
      setEmailField("");
    } else {
      setEmailField("invisible");
    }
    if (event.currentTarget.password.value == "") {
      setPassField("");
    } else {
      setPassField("invisible");
    }
    if (
      event.currentTarget.password.value !== "" &&
      event.currentTarget.text.value !== ""
    ) {
      setIsloading(true);
      try {
        const response = await signIn("credentials", {
          redirect: false,
          email: event.currentTarget.text.value,
          password: event.currentTarget.password.value,
          callbackUrl,
        });

        if (!response?.error) {
          if (pathName == "/" || errLogin == "") {
            setIsloading(false);
          }
          setErrLogin("hidden");
          push(callbackUrl);
        } else {
          if (pathName == "/" || errLogin == "") {
            setIsloading(false);
          }
          setErrLogin("");
          // console.log(response.error);
        }
      } catch (err) {
        setIsloading(false);
        // console.log(err);
      }
    }
  };
  const errLoginModal = () => {
    if (errLogin == "") {
      setErrLogin("hidden");
      setIsloading(false);
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
        <p className={`text-red-500 text-xs italic -mt-3 mb-2 ${emailField}`}>
          Email atau Username belum diisi
        </p>
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
        <p className={`text-red-500 text-xs italic -mt-3 mb-2 ${passField}`}>
          Password harus diisi
        </p>

        <Button type="submit">
          {isLoading ? "Tunggu Sebentar yaa..." : "Masuk"}
        </Button>
      </form>
    </div>
  );
}
