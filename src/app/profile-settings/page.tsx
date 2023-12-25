import UploadImage from "@/components/Elements/UploadFile/UploadImage";
import React from "react";

const MyProfilePage = () => {
  return (
    <div className=" h-screen flex items-start">
      <div className="flex items-center">
        <UploadImage />
        <div className="text-3xl text-bold gap-4 flex flex-col">
          <div>Nama Depan</div>
          <div>Nama Belakang</div>
        </div>
      </div>
    </div>
  );
};

export default MyProfilePage;
