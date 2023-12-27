"use client";
import React, { useEffect, useState } from "react";
import InputForm from "../../Elements/Input/page";
import Button from "../../Elements/Button/page";
import SelectOption from "../../Elements/Select/SelectOption";
import { genders } from "@/interface/user";
import ModalRegistrasiSuccess from "../Modal/ModalRegistrasiSuccess";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import SpinCircle from "@/components/Elements/Loading/spinCircle";

export default function FormRegister({
  show,
  showNotifFunc,
}: {
  show: string;
  showNotifFunc: any;
}) {
  let bordergray = "dark:border-gray-600";
  let borderRed = "dark:border-red-500 bg-red-700";
  let className = `w-full text-sm px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400  dark:focus:ring-gray-900 dark:focus:border-gray-200`;

  const [isLoading, setIsloading] = useState(false);
  const [classname, setClassame] = useState(`${className} `);
  const [firstnameField, setFirstnameField] = useState(bordergray);
  const [emailField, setEmailField] = useState(bordergray);
  const [usernameField, setUsernameField] = useState(bordergray);
  const [passField, setPassField] = useState(bordergray);
  const [successRegist, setSuccessRegist] = useState("hidden");
  const [cursor, setCursor] = useState("");
  const handleRegister = async (event: any) => {
    event.preventDefault();
    const firstname = event.currentTarget.firstname.value as string;
    const lastname = event.currentTarget.lastname.value as string;
    const username = event.currentTarget.username.value as string;
    const email = event.currentTarget.email.value as string;
    const gender = Number(event.currentTarget.gender.value);
    const password = event.currentTarget.password.value as string;

    if (password == "") {
      showNotifFunc("left-0", "Password belum diisi");
      setPassField(borderRed);
    }
    if (email == "") {
      showNotifFunc("left-0", "Email belum diisi");
      setEmailField(borderRed);
    }
    if (username == "") {
      showNotifFunc("left-0", "Username belum diisi");
      setUsernameField(borderRed);
    }
    if (firstname == "") {
      showNotifFunc("left-0", "Nama Depan belum diisi");
      setFirstnameField(borderRed);
    }

    if (firstname != "" && username != "" && email != "" && password != "") {
      setIsloading(true);
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          firstname,
          lastname,
          username,
          email,
          gender,
          password,
        }),
      });
      const data = await res.json();

      if (data.isSucceeded) {
        setSuccessRegist("");
        showNotifFunc("-left-full", data.message);
      } else {
        if (data.message.includes("Username Already Taken")) {
          setUsernameField(borderRed);
          showNotifFunc("left-0", "Username Sudah Terdaftar");
        } else if (data.message.includes("Email Already Taken")) {
          showNotifFunc("left-0", "Email Sudah Terdaftar");
          setEmailField(borderRed);
        } else if (data.message.includes("Password")) {
          showNotifFunc("left-0", "Password Minimal 6 Karakter");
          setPassField(borderRed);
        } else {
          showNotifFunc("left-0", data.message);
        }
      }
      setIsloading(false);
    }
  };
  const successRegistModal = () => {
    if (successRegist == "") {
      setSuccessRegist("hidden");
      setIsloading(false);
    }
  };
  function firstnameInput() {
    setFirstnameField(bordergray);
  }
  function usernameInput() {
    setUsernameField(bordergray);
  }
  function emailInput() {
    setEmailField(bordergray);
  }
  function passwordInput() {
    setPassField(bordergray);
  }
  useEffect(() => {
    if (isLoading == true) {
      setCursor("cursor-wait");
    } else {
      setCursor("");
    }
  }, [isLoading]);
  return (
    <>
      <ModalRegistrasiSuccess
        show={successRegist}
        showModal={successRegistModal}
      />
      <div className="mx-9">
        <form onSubmit={(e) => handleRegister(e)} className="gap-4 space-y-4">
          <div className="flex gap-4">
            <InputForm
              className={`${classname}${firstnameField}`}
              onclick={firstnameInput}
              type="text"
              name="firstname"
              placeholder="Nama Depan"
            />
            <InputForm
              className={`${classname}${bordergray}`}
              type="text"
              name="lastname"
              placeholder="Nama Belakang"
            />
          </div>
          <InputForm
            className={`${classname}${usernameField}`}
            onclick={usernameInput}
            type="text"
            name="username"
            placeholder="Username"
          />
          <InputForm
            className={`${classname}${emailField}`}
            onclick={emailInput}
            type="email"
            name="email"
            placeholder="Email"
          />
          <SelectOption
            className={`${classname}${bordergray}`}
            name="gender"
            label="Jenis Kelamin"
            data={genders}
          />
          <InputForm
            className={`${classname}${passField}`}
            onclick={passwordInput}
            type="password"
            name="password"
            placeholder="Kata Sandi"
          />
          <Button className={`${cursor} my-4`} type="submit">
            {isLoading ? (
              <div className="flex justify-center ">
                <SpinCircle size={6} />
                Loading...{" "}
              </div>
            ) : (
              <>Daftar</>
            )}
          </Button>
        </form>
      </div>
    </>
  );
}
