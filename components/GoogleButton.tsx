"use client";
import GoogleButton from "react-google-button";
import { signIn } from "next-auth/react";

export default function GoogleComponent() {
  return (
    <>
      <GoogleButton
        onClick={() => signIn("google")}
        className="mx-auto mt-16"
      />
    </>
  );
}
