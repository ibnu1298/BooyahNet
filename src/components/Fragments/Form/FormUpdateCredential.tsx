import Button from "@/components/Elements/Button/page";
import InputForm from "@/components/Elements/Input/page";
import SpinCircle from "@/components/Elements/Loading/spinCircle";
import { userSessionCustom } from "@/interface/user";
import React from "react";

const FormUpdateCredential = ({
  className,
  user,
  cursor,
  isLoading,
  handleUpdateCredential = () => {},
}: {
  className?: string;
  cursor?: string;
  isLoading?: boolean;
  user?: userSessionCustom;
  handleUpdateCredential?: any;
}) => {
  return (
    <form
      onSubmit={(event) => handleUpdateCredential(event)}
      className="flex flex-col gap-2  my-6"
    >
      <InputForm
        className={className}
        styleLabel="text-white text-sm"
        label="Email"
        type="text"
        name="email"
        defaultValue={user?.email as string}
      />
      <InputForm
        className={className}
        styleLabel="text-white text-sm"
        type="text"
        label="Username"
        name="username"
        defaultValue={user?.userName as string}
      />

      <InputForm
        className={className}
        styleLabel="text-white text-sm"
        type="password"
        name="password"
        label="Password"
      />

      <Button
        className={`w-full px-3 text-white py-2 bg-teal-800 rounded-md focus:bg-teal-950 focus:outline-none hover:bg-teal-600 transition duration-500 delay-100 ${cursor} mt-7`}
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

export default FormUpdateCredential;
