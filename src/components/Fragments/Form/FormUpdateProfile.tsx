"use client";
import Button from "@/components/Elements/Button/page";
import InputForm from "@/components/Elements/Input/page";
import SpinCircle from "@/components/Elements/Loading/spinCircle";
import SelectOption from "@/components/Elements/Input/Select/SelectOption";
import { genders } from "@/interface/user";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const FormUpdateProfile = () => {
  let className = `w-full text-sm px-3 py-2  border border-gray-300 rounded-md focus:outline-none  focus:border-indigo-300 dark:bg-gray-700/50 dark:text-white dark:placeholder-gray-400  dark:focus:ring-gray-500 dark:border-gray-500 dark:focus:border-gray-500`;

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
        id: session?.user.id as string,
        firstName: event.currentTarget.firstName.value as string,
        lastName: event.currentTarget.lastName.value as string,
        address: event.currentTarget.address.value as string,
        gender: Number(event.currentTarget.gender.value),
        phoneNumber: event.currentTarget.phoneNumber.value as string,
      }),
    });
    const data = await res.json();
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
    <>
      <div className="bg-gray-600/50 p-5 rounded-lg mx-2 w-[365px] sm:w-[500px] ">
        <form
          onSubmit={(event) => handleUpdateUser(event)}
          className="flex flex-col gap-2 mx-2 my-6"
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
            data={genders}
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
      </div>
    </>
  );
};

export default FormUpdateProfile;
