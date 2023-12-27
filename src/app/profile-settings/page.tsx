import UploadImage from "@/components/Elements/UploadFile/UploadImage";
import FormUpdateProfile from "@/components/Fragments/Form/FormUpdateProfile";
import React from "react";

const MyProfilePage = () => {
  return (
    <div className="flex ">
      <div className="flex flex-col m-auto md:ml-20">
        <UploadImage />
        <FormUpdateProfile />
      </div>
    </div>
  );
};

export default MyProfilePage;
