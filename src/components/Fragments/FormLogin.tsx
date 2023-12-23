"use client";
import React, { useEffect, useState } from "react";
import InputForm from "../Elements/Input/page";
import Button from "../Elements/Button/page";
import ModalLoginError from "./Modal/ModalLoginError";
import ModalForgotPass from "./Modal/ModalForgotPass";
import { signIn } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import SpinCircle from "../Elements/Loading/spinCircle";
import ErrorInput from "../Elements/Input/ErrorInput";

export default function FormLogin({ searchParams }: any) {
  const [forgotPass, setForgotPass] = useState("hidden");
  const [errLogin, setErrLogin] = useState("hidden");
  const [isLoading, setIsloading] = useState(false);
  const [emailField, setEmailField] = useState("invisible");
  const [passField, setPassField] = useState("invisible");
  const [cursor, setCursor] = useState("");
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
        console.log(cursor);

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
  useEffect(() => {
    if (isLoading == true) {
      setCursor("cursor-wait");
    } else {
      setCursor("");
    }
  }, [isLoading]);
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
    <div className="mx-9">
      <ModalLoginError show={errLogin} showModal={errLoginModal} />
      <ModalForgotPass show={forgotPass} showModal={forgotPassModal} />
      <form onSubmit={(event) => handleLogin(event)}>
        <InputForm
          label="Email atau Username"
          type="text"
          name="text"
          placeholder="contoh@mail.com"
        />
        <ErrorInput visible={emailField}>
          Email atau Username Harus Diisi
        </ErrorInput>
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
        <ErrorInput visible={passField}>Password harus diisi</ErrorInput>
        <Button className={`${cursor} mt-3`} type="submit">
          {isLoading ? (
            <div className="flex justify-center ">
              <SpinCircle size={6} />
              Loading...{" "}
            </div>
          ) : (
            <>Masuk</>
          )}
        </Button>
        <Button
          className={`${cursor} mt-3`}
          type="button"
          onClick={() => signIn("google", { callbackUrl, redirect: false })}
        >
          {isLoading ? (
            <div className="flex justify-center ">
              <SpinCircle size={6} />
              Loading...{" "}
            </div>
          ) : (
            <>Login With Google</>
          )}
        </Button>
        <Button
          className={`${cursor} mt-3`}
          type="button"
          onClick={() => signIn("facebook", { callbackUrl, redirect: false })}
        >
          {isLoading ? (
            <div className="flex justify-center ">
              <SpinCircle size={6} />
              Loading...{" "}
            </div>
          ) : (
            <>Login With Facebook</>
          )}
        </Button>
      </form>
    </div>
  );
}
