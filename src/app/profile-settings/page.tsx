import UploadImage from "@/components/Elements/UploadFile/UploadImage";
import FormUpdateProfile from "@/components/Fragments/Form/FormUpdateProfile";
import React from "react";

const MyProfilePage = () => {
  return (
    <div className=" h-screen flex items-start">
      <div className="flex flex-col items-center">
        <UploadImage />
        <FormUpdateProfile />
      </div>
    </div>
  );
};

export default MyProfilePage;
