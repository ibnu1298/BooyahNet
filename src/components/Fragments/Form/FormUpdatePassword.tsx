import Button from "@/components/Elements/Button/page";
import InputForm from "@/components/Elements/Input/page";
import SpinCircle from "@/components/Elements/Loading/spinCircle";
import { userSessionCustom } from "@/interface/user";
import React from "react";

let className = `w-full text-sm px-3 py-2  border border-gray-300 rounded-md focus:outline-none  focus:border-indigo-300 dark:bg-gray-700/50 dark:text-white dark:placeholder-gray-400  dark:focus:ring-gray-500 dark:border-gray-500 dark:focus:border-gray-500`;

const FormUpdatePassword = ({
  user,
  cursor,
  isLoading,
  handleUpdateCredential = () => {},
}: {
  cursor?: string;
  isLoading?: boolean;
  user?: userSessionCustom;
  handleUpdateCredential?: any;
}) => {
  return (
    <div>
      <form
        onSubmit={(event) => handleUpdateCredential(event)}
        className="flex flex-col gap-2  my-6"
      >
        <InputForm
          className={className}
          styleLabel="text-white text-sm"
          type="email"
          name="email"
          label="Email"
        />
        <InputForm
          className={className}
          styleLabel="text-white text-sm"
          type="password"
          name="oldPassword"
          label="Password Sekarang"
        />
        <InputForm
          className={className}
          styleLabel="text-white text-sm"
          type="password"
          name="newPassword"
          label="Password Baru"
        />
        <InputForm
          className={className}
          styleLabel="text-white text-sm"
          type="password"
          name="confirmPassword"
          label="Password Konfirmasi"
          placeholder="Tulis Ulang Password Baru"
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
  );
};

export default FormUpdatePassword;
