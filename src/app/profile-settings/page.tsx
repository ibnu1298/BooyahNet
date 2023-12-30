"use client";
import UploadImage from "@/components/Elements/UploadFile/UploadImage";
import FormUpdateCredential from "@/components/Layouts/UpdateDataUser";
import ModalNotificationError from "@/components/Fragments/Modal/ModalNotificationError";
import ModalNotificationSuccess from "@/components/Fragments/Modal/ModalNotificationSuccess";
import React, { useState } from "react";

const MyProfilePage = () => {
  const [show, setShow] = useState("opacity-0");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const showNotif = (show: string, messageNotif: string, success: boolean) => {
    // 👇️ take the parameter passed from the Child component
    setShow("opacity-0");
    setSuccess(success);
    setTimeout(function () {
      setShow(show);
    }, 300);

    setMessage(messageNotif);
  };
  const hideNotif = (hide: string) => {
    setShow(hide);
  };
  return (
    <>
      <div className="flex" onClick={() => hideNotif("-left-full opacity-0")}>
        <div className="flex flex-col m-auto md:ml-20 gap-1 mb-20">
          <UploadImage />
          <FormUpdateCredential
            showNotif={showNotif}
            hideNotif={hideNotif}
            show={show}
            message={message}
            success={success}
          />
        </div>
      </div>
    </>
  );
};

export default MyProfilePage;
