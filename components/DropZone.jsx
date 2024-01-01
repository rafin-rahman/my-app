"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";

function Dropzone() {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    // Do something with the files
    if (acceptedFiles?.length) {
      console.log("We found accepted files");
      setFiles((previousFiles) => [
        ...previousFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ]);
    }
    if (rejectedFiles?.length) {
      console.log("We found rejected files");
      // console.log(rejectedFiles.error.code) for each file
      rejectedFiles.map((file) => toast.error(file.errors[0].code));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
    // 1000000 = 1MB
    maxSize: 1000000 * 8,
  });
  const removeFile = (fileName) => {
    setFiles((previousFiles) =>
      previousFiles.filter((file) => file.name !== fileName)
    );
  };

  return (
    <>
      <div
        {...getRootProps()}
        className={`p-6 border-2 border-dashed border-blue-600 rounded-md cursor-pointer ${
          isDragActive ? "bg-blue-100" : "bg-white"
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-blue-700">Drop the documents here...</p>
        ) : (
          <div>
            <p className="text-gray-700 ">Upload or drag your document here</p>
            <p className="text-blue-200 font-light">
              Only images are allowed, up to 8MB{" "}
            </p>
          </div>
        )}
      </div>
      <ul className="list-none mt-4">
        {files.map((file, index) => (
          <li key={index} className="text-sm text-gray-600 py-1">
            {file.path} - {Math.round(file.size / 1024 / 1024)} MB
            <div className={"w-full relative"}>
              <Button
                variant={"ghost"}
                className={
                  "mx-2 float-right absolute -right-5 -top-4 bg-red-100  rounded-3xl hover:bg-red-300 scale-75 hover:scale-125 transition-all"
                }
                onClick={() => {
                  removeFile(file.name);
                }}
              >
                X
              </Button>
              <Image
                src={file.preview}
                alt={file.name}
                layout={"responsive"}
                width={100}
                height={100}
                // uncomment below line if you want to revoke the object url in order to free up memory after preview
                // onLoad={() => URL.revokeObjectURL(file.preview)}
              />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Dropzone;
