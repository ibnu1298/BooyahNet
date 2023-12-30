import { UploadButton } from "@/utils/uploadthing";
import React from "react";

const UploadImagePayment = ({
  getImage = () => {},
  buttonUpload,
}: {
  getImage?: any;
  buttonUpload: React.ReactNode;
}) => {
  return (
    <UploadButton
      content={{
        button({ ready, isUploading }) {
          if (isUploading) return <div>Loading...</div>;
          if (ready) return <>{buttonUpload}</>;

          return "Getting ready...";
        },
        allowedContent({ ready, fileTypes, isUploading }) {
          if (!ready) return <div hidden></div>;
          if (isUploading) return <div hidden></div>;
          return <div hidden></div>;
        },
      }}
      appearance={{
        button: {
          color: "#fff",
          width: "auto",
          height: "auto",
          marginBottom: "-4px",
        },
      }}
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        getImage(res[0].url);
      }}
      onBeforeUploadBegin={(files) => {
        if (files[0].size > 2000000) {
          alert(`Max file 2 MB`);
        }
        return files.map(
          (f) => new File([f], "BooyahNet-" + f.name, { type: f.type })
        );
      }}
      onUploadError={(error: Error) => {
        // Do something with the error.
        console.log(error.message);
        // alert(`ERROR! ${error.message}`);
      }}
    />
  );
};

export default UploadImagePayment;
