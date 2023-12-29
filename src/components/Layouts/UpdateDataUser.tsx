"use client";
import Button from "@/components/Elements/Button/page";
import InputForm from "@/components/Elements/Input/page";
import SpinCircle from "@/components/Elements/Loading/spinCircle";
import SelectOption from "@/components/Elements/Input/Select/SelectOption";
import { genders, userSessionCustom } from "@/interface/user";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Card, CardBody, Tab, Tabs, Tooltip } from "@nextui-org/react";
import FormUpdatePassword from "../Fragments/Form/FormUpdatePassword";
import FormUpdateBiodata from "../Fragments/Form/FormUpdateBiodata";
import FormUpdateCredential from "../Fragments/Form/FormUpdateCredential";

let className = `w-full text-sm px-3 py-2  border border-gray-300 rounded-md focus:outline-none  focus:border-indigo-300 dark:bg-gray-700/50 dark:text-white dark:placeholder-gray-400  dark:focus:ring-gray-500 dark:border-gray-500 dark:focus:border-gray-500`;
const UpdateDataUser = ({ showNotif = () => {} }: { showNotif?: any }) => {
  const { data: session }: { data: any } = useSession();
  let isDisabled = false;

  isDisabled =
    session?.user.passwordExist != true || session?.user.emailConfirmed != true
      ? true
      : false;

  const [isLoading, setIsloading] = useState(false);
  const [user, setUser] = useState();
  const [cursor, setCursor] = useState("");

  const handleUpdateUsernameEmail = async (event: any) => {
    setIsloading(true);
    event.preventDefault();

    const email = event.currentTarget.email.value;
    const username = event.currentTarget.username.value;
    const password = event.currentTarget.password.value;
    if (email == "") {
      showNotif("left-0", "Email Belum Diisi", false);
      setIsloading(false);
    }
    if (username == "") {
      showNotif("left-0", "Username Belum Diisi", false);
      setIsloading(false);
    }
    if (password == "") {
      showNotif("left-0", "Password Belum Diisi", false);
      setIsloading(false);
    }
    if (email != "" && username != "" && password != "") {
      const res = await fetch("/api/user/updateCredential", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.token as string}`,
        },
        body: JSON.stringify({
          id: session?.user.id as string,
          email: email,
          userName: username,
          oldPassword: password,
          changePassword: false,
        }),
      });
      const data = await res.json();
      console.log(data);

      setIsloading(false);
      if (data.isSucceeded) {
        showNotif("left-0", "Update Data Berhasil", true);
      } else {
        if (data.message == null) {
          showNotif("left-0", data.errors.Id[0], false);
        } else {
          showNotif("left-0", data.message, false);
        }
      }
    }
  };
  const handleUpdatePassword = async (event: any) => {
    setIsloading(true);
    event.preventDefault();

    const email = event.currentTarget.email.value as string;
    const oldPassword = event.currentTarget.oldPassword.value as string;
    const newPassword = event.currentTarget.newPassword.value as string;
    const confirmPassword = event.currentTarget.confirmPassword.value as string;
    if (newPassword != confirmPassword) {
      showNotif(
        "left-0",
        "Password baru dan Password Konfirmasi Tidak sama",
        false
      );
      setIsloading(false);
    }
    if (newPassword.length < 6) {
      showNotif("left-0", "Password Minimal 6 Karakter", false);
      setIsloading(false);
    }
    if (
      email != "" &&
      oldPassword != "" &&
      newPassword != "" &&
      newPassword == confirmPassword &&
      newPassword.length >= 6
    ) {
      const res = await fetch("/api/user/updateCredential", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.token as string}`,
        },
        body: JSON.stringify({
          id: session?.user.id as string,
          email: email,
          oldPassword: oldPassword,
          newPassword: newPassword,
          changePassword: true,
        }),
      });
      const data = await res.json();
      console.log(data);

      setIsloading(false);
      if (data.isSucceeded) {
        showNotif("left-0", "Update Data Berhasil", true);
      } else {
        if (data.message == null) {
          showNotif("left-0", data.errors.Id[0], false);
        } else {
          showNotif("left-0", data.message, false);
        }
      }
    }
  };
  let phoneNumber;
  useEffect(() => {
    if (isLoading == true) {
      setCursor("cursor-wait");
    } else {
      setCursor("");
    }

    if (session?.user != undefined) {
      setUser(session?.user);
    }
  }, [isLoading, session?.user]);

  if (
    session?.user.phoneNumber != undefined &&
    session?.user.phoneNumber != ""
  ) {
    phoneNumber = Number(session?.user.phoneNumber);
  }

  return (
    <>
      <div className="bg-gray-600/50 p-5 rounded-lg mx-2 px-6 w-[365px] sm:w-[500px] flex flex-col">
        <div className="text-right text-bold mb-4 mx-1">
          {session?.user.emailConfirmed ? (
            <span className="text-green-400">Sudah </span>
          ) : (
            <span className="text-red-500">Belum </span>
          )}
          Verifikasi Email
        </div>
        <Tabs
          aria-label="Options"
          color="primary"
          classNames={{
            tabList: "w-full relative p-1 bg-gray-700/50  rounded-lg mx-1",
            cursor: "w-full bg-teal-700",
            tab: "px-0 h-8",
            tabContent:
              "rounded-full px-4 text-white data-focus-visible:border-red-500",
          }}
        >
          <Tab key="biodata" title="Biodata" isDisabled={false}>
            <FormUpdateBiodata showNotif={showNotif} />
          </Tab>
          <Tab key="credential" title="Credential">
            <FormUpdateCredential
              className={className}
              user={user}
              cursor={cursor}
              isLoading={isLoading}
              handleUpdateCredential={handleUpdateUsernameEmail}
            />
          </Tab>
          <Tab key="password" isDisabled={isDisabled} title="Password">
            <FormUpdatePassword
              user={user}
              cursor={cursor}
              isLoading={isLoading}
              handleUpdateCredential={handleUpdatePassword}
            />
          </Tab>
        </Tabs>
      </div>
    </>
  );
};

export default UpdateDataUser;
