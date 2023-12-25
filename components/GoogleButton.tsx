"use client";
import GoogleButton from "react-google-button";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";

export default function GoogleComponent() {
  return (
    <>
      <GoogleButton
        onClick={() => signIn("google", { redirect: false })}
        className="w-full mt-16"
      />
    </>
  );
}
