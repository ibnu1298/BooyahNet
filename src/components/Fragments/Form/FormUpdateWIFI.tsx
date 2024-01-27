"use client";
import SelectOption from "@/components/Elements/Input/Select/SelectOption";
import InputForm from "@/components/Elements/Input/page";
import SpinCircle from "@/components/Elements/Loading/spinCircle";
import { userSessionCustom } from "@/interface/user";
import { Button, Chip } from "@nextui-org/react";
import { stat } from "fs";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const FormUpdateWIFI = ({
  showNotif = () => {},
  user,
}: {
  showNotif?: any;
  user?: any;
}) => {
  let className = `w-full text-sm px-3 py-2  border border-gray-200 rounded-md focus:outline-none  focus:border-indigo-300 dark:bg-gray-700/50 dark:text-white dark:placeholder-gray-400  dark:focus:ring-gray-300 dark:border-gray-500 dark:focus:border-gray-300`;

  const { data: session, update }: { data: any; update: any } = useSession();
  console.log(session?.user);

  const [isLoading, setIsloading] = useState(false);
  const [cursor, setCursor] = useState("");
  const [status, setStatus] = useState("Active");
  const [colorStatus, setColorStatus] = useState("bg-green-500");

  const handleUpdateWIFI = async (event: any) => {
    setIsloading(true);
    event.preventDefault();
    const userName = event.currentTarget.userName.value as string;
    const password = event.currentTarget.password.value as string;
    const type = "WIFI";
    if (password == "") {
      showNotif("left-0", "Password Belum Diisi", false);
      setIsloading(false);
    }
    if (userName == "") {
      showNotif("left-0", "Username Belum Diisi", false);
      setIsloading(false);
    }
    if (userName != "" && password != "") {
      const res = await fetch("/api/user/updateUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.token as string}`,
        },
        body: JSON.stringify({
          id: session?.user.id as string,
          userName,
          password,
          type,
        }),
      });
      const data = await res.json();

      setIsloading(false);
      if (data.isSucceeded) {
        await update({
          ...session,
          user: {
            ...session?.user,

            status: 1,
          },
        });
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
    switch (session?.user.status) {
      case 2:
        setColorStatus("bg-red-500");
        setStatus("Tidak Aktif");
        break;
      case 1:
        setColorStatus("bg-yellow-500");
        setStatus("Pending");
        break;

      default:
        setColorStatus("bg-green-500");
        setStatus("Aktif");
        break;
    }
  }, [isLoading, session?.user.gender, session?.user.status]);

  if (
    session?.user.phoneNumber != undefined &&
    session?.user.phoneNumber != ""
  ) {
    phoneNumber = Number(session?.user.phoneNumber);
  }

  return (
    <form
      onSubmit={(event) => handleUpdateWIFI(event)}
      className="flex flex-col gap-2 my-6"
    >
      <InputForm
        className={className}
        styleLabel="text-white text-sm"
        type="text"
        name="userName"
        label="Username WIFI"
        placeholder="Tuliskan Username WIFI baru"
      />
      <InputForm
        className={className}
        styleLabel="text-white text-sm"
        type="password"
        name="password"
        label="Password WIFI"
        placeholder="Tuliskan Password WIFI baru"
      />
      <div className="flex justify-end gap-2 text-white items-center">
        Status WIFI :{" "}
        <span className={`font-semibold ${colorStatus}  px-3 rounded-full`}>
          {status}
        </span>
      </div>
      {status == "Pending" && (
        <span className="flex justify-end text-white items-center text-xs">
          <span className="text-red-400 items-start">*</span>Silakan gunakan
          Username & Password yang lama dulu
        </span>
      )}

      <Button
        className={`w-full px-3 text-white py-4 bg-teal-800 rounded-md focus:bg-teal-950 focus:outline-none hover:bg-teal-600 transition duration-500 delay-100 mt-3`}
        type="submit"
      >
        {isLoading ? (
          <div className="flex justify-center gap-2">
            <SpinCircle size={6} />
            Loading...{" "}
          </div>
        ) : (
          <>Ganti Data</>
        )}
      </Button>
    </form>
  );
};

export default FormUpdateWIFI;
