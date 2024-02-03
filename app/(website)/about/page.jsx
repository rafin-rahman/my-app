"use client";
// get session from browser storage using next-auth, this is a client component
import { useSession } from "next-auth/react";

export default function About() {
  const { data: session, status } = useSession();

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        about
        {/*<main className="flex flex-col items-center justify-center flex-1 px-20 text-center">*/}
        {/*  <h1 className="text-6xl font-bold">About</h1>*/}
        {/*  <p className="mt-3 text-2xl">This is the about page.</p>*/}
        {/*  <p>{session.user.id}</p>*/}
        {/*  <p>{session.user.firstName}</p>*/}
        {/*</main>*/}
      </div>
    </>
  );
}
