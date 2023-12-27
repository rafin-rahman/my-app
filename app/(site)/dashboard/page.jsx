"use client";
import { useSession, signOut } from "next-auth/react";

export default function Dashboard() {
  const { data: session, status, update } = useSession();
  console.log("useSession Hook session object", session);
  console.log("useSession Hook session status", status);
  // console.log("useSession Hook session update", update);

  return (
    <>
      {/*  Dashboard page with user information from session and modern styling from tailwind*/}
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
          <h1 className="text-6xl font-bold">Dashboard</h1>
          <p className="mt-3 text-2xl">
            This is the dashboard page. <br />
            You are <strong>{status}</strong>{" "}
            {session
              ? `and you are logged in as ${session?.user?.email}`
              : "and you are not logged in"}
          </p>

          <button
            className="p-3 m-10 text-white bg-gray-500 rounded-md hover:bg-gray-700"
            onClick={() => {
              signOut();
            }}
          >
            Sign out
          </button>
        </main>
      </div>
    </>
  );
}
