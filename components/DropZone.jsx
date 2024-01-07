"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { Upload } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

function Dropzone({ userId }) {
  const [files, setFiles] = useState([]);
  const [dropzoneVisibility, setDropzoneVisibility] = useState(false);
  const { data: session, status } = useSession();
  // const [userId, setUserId] = useState(session.user.id);
  // const router = useRouter();
  // const isManageUserRoute = router.pathname.includes("manageUsers");
  // if (isManageUserRoute) {
  //   setUserId(router.query.userId);
  // }

  const [profilePictureUrl, setProfilePictureUrl] = useState(
    `https://my-app-test.s3.eu-west-2.amazonaws.com/profile-pictures/${userId}/profile-pic`
  );

  async function handleSubmit() {
    // send file to AWS S3
    const formData = new FormData();
    formData.append("file", files[0]);
    // formData.append("userId", session.user.id);
    formData.append("userId", userId);
    try {
      const res = await axios.post("/api/fileUpload/profilePicture", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status === 200) {
        setProfilePictureUrl(
          `https://my-app-test.s3.eu-west-2.amazonaws.com/profile-pictures/${session.user.id}/profile-pic`
        );
        toast.success("New profile picture saved");
        setFiles([]);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }

    console.log("File sent to cloud storage");
    setDropzoneVisibility(false);
  }

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

      // send file to AWS S3
    }
    if (rejectedFiles?.length) {
      console.log("We found rejected files");
      // console.log(rejectedFiles.error.code) for each file
      rejectedFiles.map((file) => toast.error(file.errors[0].code));
    }
  }, []);

  // Load profile picture on page load
  useEffect(() => {
    // load file from GET  api /api/fileUpload/profilePictureUrl
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
      <div className={"flex py-4"}>
        <Avatar className={"mx-2"}>
          <AvatarImage src={`${profilePictureUrl}?${new Date().getTime()}`} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Button
          variant={"outline"}
          onClick={() => {
            setDropzoneVisibility(!dropzoneVisibility);
          }}
        >
          <Upload className="mr-2 h-4 w-4" /> Upload new profile picture
        </Button>
      </div>
      {dropzoneVisibility && (
        <div>
          <div className={"flex w-full justify-around"}>
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
                  <p className="text-gray-700 ">
                    Upload or drag your document here
                  </p>
                  <p className="text-blue-200 font-light">
                    Only images are allowed, up to 8MB
                  </p>
                </div>
              )}
            </div>
            {files?.length > 0 && (
              <div className={"flex "}>
                <Button
                  className={"my-auto mx-auto"}
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  Save
                </Button>
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
                    className={"cover w-auto"}
                    width={100}
                    height={100}
                    // uncomment below line if you want to revoke the object url in order to free up memory after preview
                    // onLoad={() => URL.revokeObjectURL(file.preview)}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default Dropzone;
