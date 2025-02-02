"use client";
import React, { useCallback, useState } from "react";
import InputWrapper from "./InputWrapper";
import { ImageIcon } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import Image from "next/image";

const ImagePicker = () => {
  return (
    <InputWrapper name="image" label="Upload Image">
      <Dropzone />
    </InputWrapper>
  );
};

export default ImagePicker;

const Dropzone = () => {
  const [image, setImage] = useState<{ file: File; preview: string } | null>(
    null
  );

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        console.log(binaryStr);
        setImage({ file, preview: URL.createObjectURL(file) });
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div
      {...getRootProps()}
      className={cn(
        "w-full border-[0.5px] cursor-pointer border-[#EAEAEA]/30 border-dashed rounded-lg h-[178px] overflow-hidden relative",
        isDragActive && "bg-gray border-primary"
      )}
    >
      {image?.preview ? (
        <Image
          alt="Candidate image"
          src={image.preview}
          fill
          className="object-contain p-1"
        />
      ) : null}
      <div
        className={cn(
          "p-8 flex flex-col items-center gap-2 justify-center text-white/60",
          image?.preview && "opacity-0"
        )}
      >
        <input {...getInputProps()} accept="image/*" />
        <ImageIcon className="size-14" />
        {isDragActive ? (
          <p className="text-base">Drop here...</p>
        ) : (
          <>
            <p className="text-base">Drop your image here or browse</p>
            <p className="text-sm">Support JPG, PNG, SVG</p>
          </>
        )}
      </div>
    </div>
  );
};
