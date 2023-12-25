"use client";
import { AiOutlineEdit } from "react-icons/ai";
import { UploadButton } from "@/utils/uploadthing";
import Spinner from "@/components/Elements/Spinner/Spinner";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const UploadImage = () => {
  const { data: session, update: update }: { data: any; update: any } =
    useSession();
  const [imageUrl, setImageUrl] = useState<string>("");
  console.log(session?.user);
  async function updateImage(id: string, imageURL: string, token: string) {
    const res = await fetch(`/api/user/updateImage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id,
        imageURL,
      }),
    });
    const response = await res.json();
    console.log(response);
    console.log(res);
  }
  useEffect(() => {
    setImageUrl(session?.user.image as string);
  }, [session?.user.image]);

  return (
    <>
      <div className="flex flex-col justify-center items-center p-9 ">
        <div className="rounded-full">
          <Image
            className="rounded-full md:w-36 md:h-36 w-24 h-24"
            alt="UserProfile"
            width={300}
            height={300}
            src={imageUrl}
          />
        </div>
        <UploadButton
          className="z-10 absolute  md:hover:bg-black/50  rounded-full duration-1000 md:duration-500 md:w-36 md:h-36 w-24 h-24"
          content={{
            button({ ready, isUploading }) {
              if (isUploading)
                return (
                  <Spinner className=" flex justify-center items-center md:w-36 md:h-36 w-20 h-20 mt-1 rounded-full" />
                );
              if (ready)
                return (
                  <AiOutlineEdit className="md:w-36 md:h-36 w-24 h-24 py-6 md:py-11  opacity-0 hover:opacity-100 duration-500" />
                );

              return "Getting ready...";
            },
            allowedContent({ ready, fileTypes, isUploading }) {
              if (!ready) return "";
              if (isUploading) return "";
              return ``;
            },
          }}
          appearance={{
            button: {
              color: "#fff",
              width: "144px",
              height: "144px",
            },
          }}
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            console.log("Files: ", res);
            setImageUrl(res[0].url);
            update({ image: res[0].url });
            updateImage(session?.user.id, res[0].url, session?.user.token);
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
          }}
        />
      </div>
    </>
  );
};

export default UploadImage;
