"use client";
import { useSession } from "next-auth/react";
import React, { Children, useEffect, useState } from "react";
import { Tab, Tabs } from "@nextui-org/react";
import FormUpdatePassword from "../Fragments/Form/FormUpdatePassword";
import FormUpdateBiodata from "../Fragments/Form/FormUpdateBiodata";
import FormUpdateCredential from "../Fragments/Form/FormUpdateCredential";
import Notifications from "../Elements/Notif.tsx/Notifications";
import FormUpdateWIFI from "../Fragments/Form/FormUpdateWIFI";
import { Span } from "next/dist/trace";
import Button from "../Elements/Button/page";
import SpinCircle from "../Elements/Loading/spinCircle";
import ModalVerifikasiEmail from "../Fragments/Modal/User/ModalVerifikasiEmail";
import ModalSuccess from "../Fragments/Modal/ModalSuccess";
import { time } from "console";

let className = `w-full text-sm px-3 py-2  border border-gray-300 rounded-md focus:outline-none  focus:border-indigo-300 dark:bg-gray-700/50 dark:text-white dark:placeholder-gray-400  dark:focus:ring-gray-500 dark:border-gray-500 dark:focus:border-gray-500`;
const UpdateDataUser = ({
  hideNotif = () => {},
  showNotif = () => {},
  show,
  message,
  success,
}: {
  show?: string;
  hideNotif?: any;
  showNotif?: any;
  message: string;
  success?: boolean;
}) => {
  const { data: session, update }: { data: any; update: any } = useSession();
  let isDisabled = false;

  isDisabled =
    session?.user.passwordExist != true || session?.user.emailConfirmed != true
      ? true
      : false;

  const [isLoading, setIsloading] = useState(false);
  const [user, setUser] = useState();
  const [messageSuccess, setMessageSuccess] = useState("");
  const [verifikasiModal, setVerifikasiModal] = useState("hidden");
  const [modalSuccess, setModalSuccess] = useState("hidden");
  const [cursor, setCursor] = useState("");
  const [timer, setTimer] = useState(0);

  const handleUpdateUsernameEmail = async (event: any) => {
    setIsloading(true);
    event.preventDefault();

    const email = event.currentTarget.email.value;
    const username = event.currentTarget.username.value;
    const password = event.currentTarget.password.value;
    if (email == "") {
      setIsloading(false);
      showNotif("opacity-100", "Email Belum Diisi", false);
    }
    if (username == "") {
      setIsloading(false);
      showNotif("opacity-100", "Username Belum Diisi", false);
    }
    if (password == "") {
      setIsloading(false);
      showNotif("opacity-100", "Password Belum Diisi", false);
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

      setIsloading(false);
      if (data.isSucceeded) {
        showNotif("opacity-100", data.message, true);
        let emailConfirmed = true;
        if (email != session?.user.email) {
          emailConfirmed = false;
        }
        await update({
          ...session,
          user: {
            ...session?.user,
            email,
            username,
            emailConfirmed,
            passwordExist: true,
          },
        });
      } else {
        if (data.message == null) {
          showNotif("opacity-100", "Ganti Data Gagal", false);
        } else if (res.status == 401) {
          showNotif("opacity-100", "Password Salah", false);
        } else {
          showNotif("opacity-100", data.message, false);
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
    console.log(email, oldPassword, newPassword, confirmPassword);

    if (newPassword != confirmPassword) {
      setIsloading(false);
      showNotif("opacity-100", "Password Konfirmasi Berbeda", false);
    }
    if (newPassword.length < 8) {
      setIsloading(false);
      showNotif("opacity-100", "Password Minimal 8 Karakter", false);
    }
    if (email == "") {
      setIsloading(false);
      showNotif("opacity-100", "Email Belum Diisi", false);
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

      setIsloading(false);
      if (data.isSucceeded) {
        showNotif("opacity-100", "Ganti Password Berhasil", true);
      } else {
        if (data.message == null) {
          showNotif("opacity-100", "Ganti Password Gagal", false);
        } else if (res.status == 401) {
          showNotif("opacity-100", "Password Salah", false);
        } else {
          showNotif("opacity-100", data.message, false);
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
  console.log(session?.user.email);
  const verifikasiEmailModal = () => {
    if (verifikasiModal == "hidden") {
      setVerifikasiModal("");
    } else {
      setVerifikasiModal("hidden");
    }
  };
  const showModalSuccess = (message: string) => {
    if (modalSuccess == "hidden") {
      setModalSuccess("");
      setMessageSuccess(message);
    } else {
      setModalSuccess("hidden");
    }
  };
  const handleSendOTP = async () => {
    if (timer <= 0 && session?.user.email != "" && session?.user != undefined) {
      try {
        const res = await fetch("/api/user/sendOTP", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: session?.user.email,
          }),
        });
        const data = await res.json();
        console.log(data);

        console.log(data);
      } catch (err) {
        console.log(err);
      }
    }
  };
  function countdown(seconds: number) {
    if (timer > 0) {
      return;
    }
    const now = Date.now();
    const then = now + seconds * 1000;

    setInterval(() => {
      const secondsLeft = Math.round((then - Date.now()) / 1000) + 1;
      if (secondsLeft < 0) {
        return;
      }
      setTimer(secondsLeft);
    }, 1000);
  }
  return (
    <>
      <ModalVerifikasiEmail
        show={verifikasiModal}
        showModal={verifikasiEmailModal}
        showModalSuccess={showModalSuccess}
        handleSendOTP={handleSendOTP}
        timer={timer}
        countdown={countdown}
      />
      <ModalSuccess
        show={modalSuccess}
        message={messageSuccess}
        showModal={showModalSuccess}
      />
      <div className="bg-gray-700/80 p-5 rounded-lg mx-2 px-6 w-[365px] sm:w-[500px] flex flex-col gap-3">
        <div className="text-right text-bold  mx-1">
          {session?.user.emailConfirmed ? (
            <div>
              <span className="text-green-400">Sudah </span>
              <span>Verifikasi Email</span>
            </div>
          ) : (
            <div>
              <span className="text-red-500">Belum </span>
              <span
                onClick={() => {
                  countdown(30);
                  verifikasiEmailModal();
                  handleSendOTP();
                }}
                className="py-1 px-2  bg-teal-800 rounded-md focus:bg-teal-950 focus:ring-3 hover:bg-teal-600 transition duration-500 delay-100 cursor-pointer"
              >
                Verifikasi Email
              </span>
            </div>
          )}
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
          <Tab
            key="biodata"
            title={
              <span onClick={() => hideNotif("-left-full opacity-0")}>
                Biodata
              </span>
            }
          >
            <FormUpdateBiodata showNotif={showNotif} user={user} />
          </Tab>
          <Tab
            key="credential"
            title={
              <span onClick={() => hideNotif("-left-full opacity-0")}>
                Credential
              </span>
            }
          >
            <FormUpdateCredential
              className={className}
              user={user}
              cursor={cursor}
              isLoading={isLoading}
              handleUpdateCredential={handleUpdateUsernameEmail}
            />
          </Tab>
          <Tab
            key="password"
            isDisabled={isDisabled}
            title={
              <span onClick={() => hideNotif("-left-full opacity-0")}>
                Password
              </span>
            }
          >
            <FormUpdatePassword
              user={user}
              cursor={cursor}
              isLoading={isLoading}
              handleUpdateCredential={handleUpdatePassword}
              isDisabled={isDisabled}
            />
          </Tab>
          <Tab
            key="WIFI"
            title={
              <span onClick={() => hideNotif("-left-full opacity-0")}>
                WIFI
              </span>
            }
          >
            <FormUpdateWIFI showNotif={showNotif} user={user} />
          </Tab>
        </Tabs>
        <div className="flex w-full justify-center items-center flex-col -mt-7  rounded-md">
          <Notifications show={show} hideNotif={hideNotif} success={success}>
            {message}
          </Notifications>
        </div>
      </div>
    </>
  );
};

export default UpdateDataUser;
