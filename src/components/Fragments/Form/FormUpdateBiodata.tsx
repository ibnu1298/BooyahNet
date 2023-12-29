"use client";
import SelectOption from "@/components/Elements/Input/Select/SelectOption";
import InputForm from "@/components/Elements/Input/page";
import SpinCircle from "@/components/Elements/Loading/spinCircle";
import { Button } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const FormUpdateBiodata = ({ showNotif = () => {} }: { showNotif?: any }) => {
  let className = `w-full text-sm px-3 py-2  border border-gray-200 rounded-md focus:outline-none  focus:border-indigo-300 dark:bg-gray-700/50 dark:text-white dark:placeholder-gray-400  dark:focus:ring-gray-300 dark:border-gray-500 dark:focus:border-gray-300`;

  const { data: session }: { data: any } = useSession();

  const [isLoading, setIsloading] = useState(false);
  const [cursor, setCursor] = useState("");

  const handleUpdateUser = async (event: any) => {
    setIsloading(true);
    event.preventDefault();
    const res = await fetch("/api/user/updateUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user.token as string}`,
      },
      body: JSON.stringify({
        id: session?.user.id as string,
        firstName: event.currentTarget.firstName.value as string,
        lastName: event.currentTarget.lastName.value as string,
        address: event.currentTarget.address.value as string,
        gender: Number(event.currentTarget.gender.value),
        phoneNumber: event.currentTarget.phoneNumber.value as string,
      }),
    });
    const data = await res.json();
    console.log();

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
  };

  let phoneNumber;
  useEffect(() => {
    if (isLoading == true) {
      setCursor("cursor-wait");
    } else {
      setCursor("");
    }
  }, [isLoading, session?.user.gender]);

  if (
    session?.user.phoneNumber != undefined &&
    session?.user.phoneNumber != ""
  ) {
    phoneNumber = Number(session?.user.phoneNumber);
  }

  return (
    <form
      onSubmit={(event) => handleUpdateUser(event)}
      className="flex flex-col gap-2 my-6"
    >
      <div className="flex gap-4">
        <InputForm
          className={className}
          styleLabel="text-white text-sm"
          label="Nama Depan"
          type="text"
          name="firstName"
          defaultValue={session?.user.firstName as string}
        />
        <InputForm
          className={className}
          styleLabel="text-white text-sm"
          type="text"
          name="lastName"
          label="Nama Belakang"
          defaultValue={session?.user.lastName as string}
        />
      </div>
      <InputForm
        className={className}
        styleLabel="text-white text-sm"
        type="text"
        name="address"
        label="Alamat"
        defaultValue={session?.user.address as string}
      />
      <SelectOption
        className={className}
        name="gender"
        label="Jenis Kelamin"
        styleLabel="text-white text-sm"
      />
      <InputForm
        className={`${className} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
        type="number"
        name="phoneNumber"
        label="No Hanphone"
        styleLabel="text-white text-sm"
        defaultValue={phoneNumber}
      />
      <Button
        className={`w-full px-3 text-white py-4 bg-teal-800 rounded-md focus:bg-teal-950 focus:outline-none hover:bg-teal-600 transition duration-500 delay-100 ${cursor} mt-3`}
        type="submit"
      >
        {isLoading ? (
          <div className="flex justify-center ">
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

export default FormUpdateBiodata;
