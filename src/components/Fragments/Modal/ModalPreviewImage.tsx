import React from "react";
import Image from "next/image";

const ModalPreviewImage = ({ src }: { src: string }) => {
  console.log(src);

  return (
    <div className="rounded-full">
      <Image
        alt="Preview Image"
        width={500}
        height={500}
        src={src}
        className="rounded-xl"
      />
    </div>
  );
};

export default ModalPreviewImage;
