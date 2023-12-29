import { Textarea } from "@nextui-org/react";
import React from "react";

const TextArea = ({ className }: { className?: string }) => {
  return (
    <>
      <Textarea
        className="w-full"
        variant="flat"
        placeholder="Enter your description"
        disableAnimation
        disableAutosize
        classNames={{
          base: `w-full ${className}`,
          input: ` resize-y min-h-[40px] border-none bg-transparant`,
        }}
      />
    </>
  );
};

export default TextArea;
