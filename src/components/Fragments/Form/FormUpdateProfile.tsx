"use client";
import InputForm from "@/components/Elements/Input/page";
import SpinCircle from "@/components/Elements/Loading/spinCircle";
import SelectOption from "@/components/Elements/Select/SelectOption";
import { genders } from "@/interface/user";
import { Button } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const FormUpdateProfile = () => {
  let className = `w-full text-sm px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400  dark:focus:ring-gray-900 dark:border-gray-600 dark:focus:border-gray-200`;

  const { data: session }: { data: any } = useSession();

  const [isLoading, setIsloading] = useState(false);
  const [cursor, setCursor] = useState("");
  const handleUpdateUser = async (event: any) => {
    event.preventDefault();
    const res = await fetch("/api/user/updateUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user.token as string}`,
      },
      body: JSON.stringify({
        id: event.currentTarget.id.value as string,
        firstname: event.currentTarget.firstname.value as string,
        lastname: event.currentTarget.lastname.value as string,
        address: event.currentTarget.address.value as string,
        gender: Number(event.currentTarget.gender.value),
        phoneNumber: event.currentTarget.phoneNumber.value as string,
      }),
    });
    const data = await res.json();
  };

  useEffect(() => {
    if (isLoading == true) {
      setCursor("cursor-wait");
    } else {
      setCursor("");
    }
  }, [isLoading]);
  return (
    <>
      <div className="bg-slate-500/50 p-24 rounded-lg backdrop-blur-md">
        <form onSubmit={(event) => handleUpdateUser(event)}>
          <InputForm
            className={className}
            type="text"
            name="firstname"
            placeholder="Nama Depan"
          />
          <InputForm
            className={className}
            type="text"
            name="lastname"
            placeholder="Nama Belakang"
          />
          <InputForm
            className={className}
            type="text"
            name="address"
            placeholder="Alamat"
          />
          <SelectOption
            className={className}
            name="gender"
            label="Jenis Kelamin"
            data={genders}
          />
          <InputForm
            className={className}
            type="number"
            name="phoneNumber"
            placeholder="No Hanphone"
          />
          <Button className={`${cursor} mt-3`} type="submit">
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
      </div>
    </>
  );
};

export default FormUpdateProfile;
