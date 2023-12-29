"use client";
import UploadImage from "@/components/Elements/UploadFile/UploadImage";
import FormUpdateCredential from "@/components/Layouts/UpdateDataUser";
import ModalNotificationError from "@/components/Fragments/Modal/ModalNotificationError";
import ModalNotificationSuccess from "@/components/Fragments/Modal/ModalNotificationSuccess";
import React, { useState } from "react";

const MyProfilePage = () => {
  const [show, setShow] = useState("-left-full");
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("");
  const [success, setSuccess] = useState(false);

  const showNotif = (show: string, messageNotif: string, success: boolean) => {
    // 👇️ take the parameter passed from the Child component
    setShow("-left-full");
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
      {success ? (
        <ModalNotificationSuccess
          show={show}
          hideNotif={hideNotif}
          messageNotif={message}
          position="-top-9"
        />
      ) : (
        <ModalNotificationError
          show={show}
          hideNotif={hideNotif}
          messageNotif={message}
        />
      )}
      <div className="flex" onClick={() => hideNotif("-left-full")}>
        <div className="flex flex-col  my-9 m-auto md:ml-20 gap-5">
          <UploadImage />
          <FormUpdateCredential showNotif={showNotif} />
        </div>
      </div>
    </>
  );
};

export default MyProfilePage;
